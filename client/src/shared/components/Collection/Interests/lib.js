export const interests = require('../../../data/interests.json');

export const interestName = slug => interests[slug] ? interests[slug].name : '';

export const interestsArr = Object.values(interests);
