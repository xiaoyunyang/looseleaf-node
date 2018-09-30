import {
  // GET_PROJECTS,
  SET_CONTRIBUTORS,
  GET_CONTRIBUTORS_BY_ID,
  GET_PROJECT_BY_SLUG } from '../actions/project';

const initState = {
  info: {
    _id: "5b79ff0c2034dc84ee5e72fe",
    postedBy: "5ac7f2b6cc78928a6f24a101",
    createdAt: "2018-07-14T04:44:56.361Z",
    creator: {
      about: "I love the idea of services exchanged without money. The world needs more of this! For too long a lack of finances has kept people from doing the work that they love and are actually most competent at. Here&#x27;s to LooseLeaf and a great concept well executed.",
      mission: "I'm building a startup called LooseLeaf"
    },
    contributors: {},
    tags:["Logo Design"],
    submission: {"instruction":"Submission Instruction","platform":"Dropbox"},
    title: "project title",
    slug: "default",
    desc: "This project is a placeholder to support rapid app prototyping with CRA.",
    dueDate: "2018-08-31T04:00:00.000Z", // or null if not specified
    type: "Web Development",
    interests: [],
  },
  contributors: [
    // {
    //   displayName: "Andrew Fenner",
    //   username: "afenner",
    //   communities: [],
    //   bio: "hi I'm Andrew",
    //   email: "andrewfenner@numbershapes.com",
    // },
    // {
    //   displayName: "Xiaoyun Yang",
    //   username: "xiaoyunyang",
    //   communities: ["Developer"],
    //   bio: "hi I'm Xiaoyun",
    //   email: "yangx232@gmail.com",
    // },
    // {
    //   displayName: "Desi Graphica",
    //   username: "afenner",
    //   communities: ["Designer"],
    //   bio: "hi I'm Desi",
    //   email: "graphica@email.com",
    // },
    // {
    //   displayName: "Reallyreally Longname",
    //   username: "xiaoyunyang",
    //   communities: [],
    //   bio: "hi I'm Longname. Realy really really really really really really really really really really really really really really really really long bio",
    //   email: "longname@email.com"
    // },
    // {
    //   displayName: "Another Person",
    //   username: "afenner",
    //   communities: ["Marketer"],
    //   bio: "hi I'm Another Person",
    //   email: "randomPerson@email.com",
    // },
    // {
    //   displayName: "Oscar Wilde",
    //   username: "xiaoyunyang",
    //   communities: ["Writer"],
    //   bio: "I'm Oscar. I'm a writer.",
    //   email: "illustrator@email.com",
    // }
  ]
};

export default function project(state = initState, action) {
  switch (action.type) {
    case GET_PROJECT_BY_SLUG:
      return {
        ...state,
        info: action.data
      }
    case GET_CONTRIBUTORS_BY_ID:
      return {
        ...state,
        contributors: action.data
      }
    case SET_CONTRIBUTORS:
      return {
        ...state,
        contributors: action.data
      }
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}
