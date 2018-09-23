import User from '../models/User';
import chalk from 'chalk';

// TODO: don't do user User.count. If you logged in with facebook, with username
// xiaoyunyang, then logged in with github, which created another user with
// same username, but called xiaoyunyang-1, then deleted the facebook account,
// then created the facebook account again, you won't be able to create an
// account due to duplicate key (xiaoyunyang-1).
// What we want to do is to find the largest number following the username
// and append that to the end of the new username (xiaoyunyang-2)

const updateLargest = (largest, append) => {
  if (!append) return largest;
  const candidateLargest = Number.parseInt(append, 10);
  if (Number.isNaN(candidateLargest)) return largest;
  return candidateLargest > largest ? candidateLargest : largest;
};

export const createUsername = ({ email, successCb, errCb }) => {
  const baseUsername = email.split('@')[0];

  const regex = new RegExp(`^${baseUsername}.*$`, 'i');
  User.find({ username: regex }, (err, users) => {
    if (err) {
      return errCb(err);
    }
    if (users.length === 0) {
      return successCb(baseUsername);
    }

    let largest = 0;
    for (let i = 0; i < users.length; i += 1) {
      const append = users[i].username.split('-')[1];

      largest = updateLargest(largest, append);
    }

    successCb(`${baseUsername}-${largest + 1}`);
  });
};

export const updateNewUserFields = fields => {
  return {
    username: fields.username,
    displayName: fields.displayName
  };
};
