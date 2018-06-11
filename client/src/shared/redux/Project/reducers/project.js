const initState = {
  createdAt: "2018-03-12T04:10:43.893Z",
  dueDate: "2018-07-12T04:10:43.893Z",
  _id:"5aa5fdc30f8220abf3ec12fa",
  title: "Help Me Build A Landing Page",
  description: "build an app for me",
  type: "Web Development",
  interests: ['JavaScript', 'React'],
  creator: {
    username: "xiaoyunyang",
    displayName: "Xiaoyun Yang",
    bio: "I'm an entrepreneur",
    mission: "I'm building a startup called LooseLeaf"
  },
  contributors: [
    {displayName: "Xiaoyun Yang", username: "xiaoyunyang", picture: ""},
    {displayName: "Andrew Fenner", username: "afenner", picture: ""}
  ]
};

export default function user(state = initState, action) {
  switch (action.type) {
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}
