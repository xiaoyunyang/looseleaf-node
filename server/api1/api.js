// routes/api1.js
// caller: server.js
// All the routes for version 1 of our api

import express from 'express';
import arrayWrap from 'arraywrap';
import fs from 'fs';
import chalk from 'chalk';
import validator from 'validator';
import path from 'path';
import User from '../models/User';
import Project from '../models/Project';
import Post from '../models/Post';
import { urlSlug } from '../modules/util';
import dataPreloading from '../../client/iso-middleware/dataPreloading';
import { getPosts } from './posts';
import {
  getProjects,
  updateProject, updateProjectAndUser,
  addNewProject } from './projects';
import { getUsers } from './users';

const api = express.Router();

// Posts ======================================================================
api.delete('/post', (req, res) => {
  Post.findByIdAndRemove(req.query._id, (err, post) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);

    // also delete postId from parent Post
    if (post) {
      if (post.context.post) {
        Post.findById(post.context.post, (err, parentPost) => {
          const updatedComments = parentPost.comments.filter(c => c.toString() !== req.query._id);
          parentPost.set({
            comments: updatedComments
          });
          parentPost.save();
        });
      }
      const response = {
        message: 'Post successfully deleted',
        id: post._id
      };
      return res.status(200).send(response);
    }
  });
});

// create new post
api.post('/post', (req, res) => {
  const { content, userId, context } = req.body;

  const newPost = new Post();
  newPost.content = content;
  newPost.postedBy = userId;
  newPost.context = context;

  if (!context.post) {
    newPost.save();
    return res.send({ status: 'success', msg: { newPost, parentPostCommentsNum: -1 } });
  }
  // This means the new post is a comment to another post
  Post.findById(context.post, (err, post) => {
    if (err) return res.send('Error');
    if (post) {
      const updatedComments = [ newPost._id, ...post.comments ];
      post.set({
        comments: updatedComments
      });
      post.save();
      newPost.save();
      return res.send({ status: 'success', msg: { newPost, parentPostCommentsNum: updatedComments.length } });
    }
  });
});

// edit post as the person who contributes to the post
api.post('/post/edit', (req, res) => {
  const { content } = req.body;
  const editedOn = new Date();
  Post.findById(req.query._id, (err, post) => {
    if (err) return res.send('Error');
    if (post) {
      post.set({
        content,
        editedOn
      });
      post.save();
      return res.send({
        status: 'success',
        msg: { content, editedOn }
      });
    }
  });
});

// react to post
api.post('/post/react', (req, res) => {
  const { updatedReaction } = req.body;
  Post.findById(req.query._id, (err, post) => {
    if (err) return res.send('Error');
    if (post) {
      post.set(updatedReaction);
      post.save();
      return res.send({
        status: 'success',
        msg: { updatedReaction }
      });
    }
  });
});


api.get('/post', (req, res) => {
  // Queries - get all
  const findCriteria = req.query;
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };
  getPosts(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});

api.get('/post/community', (req, res) => {
  // Get posts from community with the slug, e.g., developers
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };
  const findCriteria = { 'context.community': req.query.slug };
  getPosts(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});

api.get('/post/project', (req, res) => {
  // Get posts associated with a project with the id
  const findCriteria = { 'context.project': req.query.projectId };
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };

  getPosts(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});

api.get('/post/post', (req, res) => {
  // Queries
  const findCriteria = { 'context.post': req.query.postId };
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };
  getPosts(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});


/* 
http://localhost:3001/api/post/userFeed?userIds=1+3+5+6&projectIds=a+b&postedBy=12&page=1?page=1
{"userIds":["1","3","5","6"],"projectIds":["a","b"],"postedBy":"12","page":"1?page=1"}
*/
api.get('/post/userFeed', (req, res) => {

  const userIds = arrayWrap(req.query.userIds || '')[0].split(' ');
  const projectIds = arrayWrap(req.query.projectIds || '')[0].split(' ');
  const communitySlugs = arrayWrap(req.query.communitySlugs || '')[0].split(' ');

  // TODO: We may need this for something later. Don't know what yet.
  const currUser = req.query.currUser;
  
  // We provide post for the user with userId from the following sources: 
  // (1) people the user follows
  // (2) followers of the user
  // (3) posts associated with the project that the user contributes to.
  const postsByUsers = userIds.filter(id => id !== '').map(id => {
    return { postedBy: id };
  });
  const postsForProjects = projectIds.filter(id => id !== '').map(id => {
    return { 'context.project': id };
  });
  const postsForCommunities = communitySlugs.filter(slug => slug !== '').map(slug => {
    return { 'context.community': slug };
  });
  const allPosts = [...postsByUsers, ...postsForProjects, ...postsForCommunities];

  if (allPosts.length === 0) {
    return res.send([]);
  }

  const findCriteria = {
    $and: [
      { $or: allPosts },
      { postedBy: { $ne: currUser } }
    ]
  };

  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };

  getPosts(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});

api.get('/post/user', (req, res) => {
  // Queries
  const findCriteria = { postedBy: req.query.userId };
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };
  getPosts(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});

// Projects ======================================================================
api.post('/project', (req, res) => {

  const formFields = req.body.formFields;

  // Do some error checking
  if (validator.isEmpty(formFields.title)) {
    res.statusMessage = 'error';
    return res.send({ status: 'error', msg: 'Project must have a title!' });
  }
  if (req.query.slug) {
    // Update existing project in database
    const cbFailure = () => {
      req.flash('error', 'No project found');
      res.statusMessage = 'error';
      return res.send('No project found');
    };
    updateProject(formFields, req.query.slug, cbFailure);
    return res.send({ status: 'success', msg: req.query.slug });
  }
  // Add new project to database
  const slug = addNewProject(formFields, req.body.userId);
  return res.send({ status: 'success', msg: slug });
});

// TODO: Idea. Get project based on descending order ("trendiest" project at the top)
api.get('/project', (req, res) => {
  // Queries - get all
  const findCriteria = req.query;
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };
  getProjects(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});
api.get('/project/community/:slug', (req, res) => {
  // Get posts from community with the slug, e.g., developers
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };
  const findCriteria = { communities: req.params.slug };
  getProjects(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});

// TODO:
// Want projects which is created by the user with this id AND
// projects for which the user is a contributor AND
// projects for which the user is a watcher
api.get('/project/user/:id', (req, res) => {
  // Queries for followers of a community
  const findCriteria = {
    $or: [
      { postedBy: req.params.id },
      { _id: req.query._id }
    ]
  };
  const cbSuccess = result => res.send(result);
  const cbFailure = err => {
    res.status(500).end();
    return console.error(err);
  };
  getProjects(findCriteria, req.query.limit, req.query.page, cbSuccess, cbFailure);
});

// TODO: The following is probably not needed
api.get('/project/:slug', (req, res) => {
  Project.find({ slug: req.params.slug }, (err, project) => {
    if (err) {
      req.flash('error', 'No project found');
      res.statusMessage = 'error';
      return res.send('No project found');
    }
    // If there's no error, send project if project exists
    // NOTE project is an Array containing one element.
    if (project) {
      return res.send(project);
    }
  });
});

api.post('/user/project', (req, res) => {
  Project.findById(req.query.projectId, (err, project) => {
    if (err) {
      req.status = 'error';
      return res.send('No project found');
    }
    if (project) {
      User.findById(req.query.userId, (err, user) => {

        if (err) {
          req.status = 'error';
          return res.send('No user found');
        }

        if (user) {
          const { userId, projectId, action } = req.query;

          updateProjectAndUser({
            project, user, userId, projectId, action
          });
          return res.send({
            status: 'success',
            msg: { projectSlug: project.slug, userUsername: user.username }
          });
        }
      });
    }
  });
});

// Users ======================================================================
// Get all users
// TODO: List in descending order (most recently signed up user at the top).
// Also, return the users JSON with date of creation.
// NOTE: this handles finding using these queries:
// http://localhost:3001/api/user?_id=5b25d5d8bbb7ca0765de2127
// http://localhost:3001/api/username?username=xyang
// http://localhost:3001/api/user?communities=video-producers
// http://localhost:3001/api/user?communities=misc
api.get('/user', (req, res) => {
  const cbSuccess = result => res.send(result);
  const findCriteria = req.query;
  getUsers({ findCriteria, cbSuccess });
});

api.post('/user/community', (req, res) => {
  User.findById(req.query._id, (err, user) => {
    if (err) return res.send('Error');
    const formFields = req.body.formFields;
    const communities = formFields;
    user.set({
      communities
    });
    user.save(); // NOTE: changing from user.save(next) to user.save()
    // removes the cannot set header error
    return res.send({ status: 'success', msg: 'change success!' });
  });
});

// This is executed when loggedinUser "follow" or "unfollow" on userToFollow
api.post('/user/following', (req, res) => {
  // req.query._id is the id of userA
  User.findById(req.query._id, (err, loggedinUser) => {
    if (err) return res.send('Error');
    if (loggedinUser) {
      const formFields = req.body.formFields;
      const { userId, action } = formFields;
      User.findById(userId, (err, userToFollow) => {
        if (err) return res.send('Error');
        if (userToFollow) {
          let following = loggedinUser.following;
          let followers = userToFollow.followers;

          if (action === 'follow') {
            // add userToFollow's id to loggedinUser's following field
            // add loggedinUser's id to userToFollow's followers field
            following = loggedinUser.following.concat(userToFollow._id);
            followers = userToFollow.followers.concat(loggedinUser._id);
          } else if (action === 'unfollow') {
            // remove userToFollow's id to loggedinUser's following field
            // remove loggedinUser's id to userToFollow's followers field
            following = loggedinUser.following.filter(d => !d.equals(userToFollow._id));
            followers = userToFollow.followers.filter(d => !d.equals(loggedinUser._id));
          }
          loggedinUser.set({ following });
          userToFollow.set({ followers });
          loggedinUser.save();
          userToFollow.save();
          return res.send({ status: 'success', msg: { following, followers } });
        }
      });
    }
  });
});

// Update user based on id
// TODO: This is dangerous. This API lets anyone update user information
// based on user id. How do we make sure the request is coming from the
// actual user?
// TODO: Make the id come from req.query._id, as consistent from the previous api.post request handler
// for user community
api.post('/user', (req, res) => {
  User.findById(req.query._id, (err, user) => {
    if (err) return res.send('Error');

    const formFields = req.body.formFields;
    if (formFields.username === '') {
      res.statusText = 'error';
      // TODO: Below is the way we should be sending error messages. Make the same change
      // to POST /project and POST /auth/login
      return res.send({ status: 'error', msg: 'username cannot be empty!' });
    }


    if (formFields.email === '') {
      res.statusText = 'error';
      // TODO: Below is the way we should be sending error messages. Make the same change
      // to POST /project and POST /auth/login
      return res.send({ status: 'error', msg: 'email cannot be empty!' });
    }
    const username = formFields.username || user.username;
    const displayName = formFields.displayName || user.displayName;
    const email = formFields.email || user.email;
    const location = formFields.location || user.location;
    const interests = formFields.interests || user.interests;
    const bio = formFields.bio || user.bio;
    const website = formFields.website || user.website;

    // TODO: If user is making a request to change the username,
    // (1) Make sure username cannot contain any spaces or special characters.
    // (2) Make sure the desired username is not already taken
    // (3) If username change is successful, make sure to have the server
    // redirect to the settings page with username changed?

    user.set({
      username,
      displayName,
      email,
      location,
      interests,
      bio,
      website
    });
    user.save();

    return res.send({ status: 'success', msg: 'change success!' });
  });
});

api.get('/community', (req, res) => {
  const filePath = path.join(__dirname, '../../client/src/shared/data/community.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    // Error handling - return an error
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
    const community = JSON.parse(data); // object
    res.status(200).send(Object.values(community)); // send array version
  });
});


// Misc Code =======================================================
// TODO: Dead code below for testing only. Delete.
api.get('/hello', (req, res) => {
  res.send({ express: 'If you are seeing this, your frontend react app is hooked up to your backend Express app. CONGRATULATIONS!' });
});

api.get('/hello/@:who', (req, res) => {
  res.send(`Hello, ${req.params.who}.`);
  // Fun fact: this has some security issues, which we’ll get to!
});
// http://localhost:3001/api/search?q=hello+world
// http://localhost:3001/api/search?q=abc+123&q=hello+world&q=xyz
// if someone gives you more queries than you expect,
// you just take the first one and ignore the rest.
api.get('/search', (req, res) => {
  const search = arrayWrap(req.query.q || '');
  const terms = search[0].split(' ');
  res.send(terms);
});

api.get('/goodbye', (req, res) => {
  res.send({ express: 'Goodbye!' });
});
api.get('/random/:min/:max', (req, res) => {
  const min = parseInt(req.params.min, 10);
  const max = parseInt(req.params.max, 10);
  if (Number.isNaN(min) || Number.isNaN(max)) {
    res.status(400);
    res.json({ error: 'Bad request.' });
    return;
  }
  const result = Math.round((Math.random() * (max - min)) + min);
  res.json({ result });
});

api.get('/hello-recipe', dataPreloading);

api.get('/recipes', (req, res) => {
  // Read and open the recipes json file
  const filePath = path.join(__dirname, '../data/recipes.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    // Error handling - return an error
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
    const recipes = JSON.parse(data);
    res.status(200).send({ recipes });
  });
});
api.get('/featured', (req, res) => {
  // Read and open the featured recipe json file
  const filePath = path.join(__dirname, '../data/featured.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    // Error handling - return an error
    if (err) {
      res.status(500).end();
      console.error(err);
    }
    const recipe = JSON.parse(data);
    res.status(200).send({ recipe });
  });
});

api.get('/projects/todos', (req, res) => {
  // Read and open the recipes json file
  const filePath = path.join(__dirname, '../data/recipes.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    // Error handling - return an error
    if (err) {
      res.status(500).end();
      return console.error(err);
    }
    const newProjects = JSON.parse(data);
    res.status(200).send({ newProjects });
  });
});
api.get('/projects/completed', (req, res) => {
  // Read and open the featured recipe json file
  const filePath = path.join(__dirname, '../data/featured.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    // Error handling - return an error
    if (err) {
      res.status(500).end();
      console.error(err);
    }
    const completedProjects = JSON.parse(data);
    res.status(200).send({ completedProjects });
  });
});

/*
TODO: code below is for development only. Remove for production
 */

api.get('/test', (req, res) => {
  const slug = cuid.slug();

  const title = "<>/I'm a little Tea---Pot Short & Stout";
  const sanitizedTitle = validator.escape(title);
  const output = urlSlug(title, slug);
  res.send(`url: ${output} \n santizedTitle: ${sanitizedTitle}`);
});

// TODO: Don't know if following code is dead code or not...need to delete?
api.use('/assets', (req, res, next) => {
  const filePath = path.join(__dirname, '../assets', req.url);
  res.sendFile(filePath, (err) => {
    if (err) {
      next(new Error('Error sending file!'));
    }
  });
});

module.exports = api;
