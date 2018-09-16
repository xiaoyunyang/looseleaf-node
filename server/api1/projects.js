import cuid from 'cuid';
import Project from '../models/Project';
import { urlSlug, addToDict, deleteFromDict, updateArr } from '../modules/util';

export const getProjects = (findCriteria, reqLimit, reqPage, cbSuccess, cbFailure) => {
  const limit = reqLimit ? parseInt(reqLimit, 10) : 5;
  const page = reqPage ? parseInt(reqPage, 10) : 1;
  const options = {
    page, limit, sort: { createdAt: -1 }
  };
  return Project.paginate(findCriteria, options, (err, projects) => {
    if (err) return cbFailure(err);
    return cbSuccess(projects.docs);
  });
};

export const addNewProject = (formFields, postedBy) => {
  const newProject = new Project();

  // Fields you cannot update:
  const slug = urlSlug(formFields.title, cuid.slug());
  newProject.postedBy = postedBy;
  newProject.slug = slug;

  // Fields you can update:
  // Below line of code combines properties from the updatedProject factory
  // function into newProject
  Object.assign(newProject, updatedProjectProps(formFields));

  newProject.save();
  return slug;
};

// Update Project =============================================================
// NOTE: updatedProjectProps is a helper function for updateProject and updateProjectAndUser
// TODO: Do not use validator.escape() on any field below...
const updatedProjectProps = formFields => {
  return {
    creator: {
      about: formFields.creatorAbout,
      mission: formFields.creatorMission
    },
    title: formFields.title,
    desc: formFields.desc,
    communities: formFields.communities,
    interestAreas: formFields.interestAreas,
    submission: {
      platform: formFields.selectedPlatform,
      instruction: formFields.submissionInst
    },
    dueDate: formFields.dueDate
  };
};

export const updateProject = (formFields, slug, cbFailure) => {
  Project.findOne({ slug }, (err, project) => {
    if (err) {
      return cbFailure();
    }
    if (project) {
      project.set(updatedProjectProps(formFields));
      project.save();
      return slug;
    }
  });
};

export const updateProjectAndUser = ({
  project, user, userId, projectId, action
}) => {
  let updatedContributors = project.contributors;
  let updatedProjects = user.projects; // array
  if (action === 'contribute' || action === 'watch') {
    // Add user as a contributor / watcher of the project
    const field = action;
    updatedContributors = addToDict(project.contributors, userId, field);
    updatedProjects = updateArr(user.projects, projectId, 'add');
  } else if (action === 'un-contribute' || action === 'un-watch') {
    // chop off the 'un' from 'uncontribute' and 'unwatch'
    const field = action.split('-')[1];
    updatedContributors = deleteFromDict(project.contributors, userId, field);
    const entry = updatedContributors[userId];
    let arrUpdateCmd = 'standby';
    if ((action === 'un-contribute' && !entry.watch) ||
        (action === 'un-watch' && !entry.contribute)) {
      arrUpdateCmd = 'remove';
    }
    updatedProjects = updateArr(user.projects, projectId, arrUpdateCmd);
  }

  project.set({
    contributors: updatedContributors
  });
  project.save();
  // Add project to user
  user.set({
    projects: updatedProjects
  });
  user.save();
};
