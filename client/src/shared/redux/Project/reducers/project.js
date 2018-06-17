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
    {
      displayName: "Andrew Fenner",
      username: "afenner",
      intro: "Mobile Developer",
      email: "andrewfenner@numbershapes.com",
    },
    {
      displayName: "Xiaoyun Yang",
      username: "xiaoyunyang",
      intro: "Web Developer",
      email: "yangx232@gmail.com",
    },
    {
      displayName: "Desi Graphica",
      username: "afenner",
      intro: "Graphic Designer",
      email: "graphica@email.com",
    },
    {
      displayName: "Reallyreally Longname",
      username: "xiaoyunyang",
      intro: "Copywriter",
      email: "longname@email.com"
    },
    {
      displayName: "Another Person",
      username: "afenner",
      intro: "Digital Marketer",
      email: "randomPerson@email.com",
    },
    {
      displayName: "Oscar Wilde",
      username: "xiaoyunyang",
      intro: "Illustrator",
      email: "illustrator@email.com",
    }
  ]
};

export default function user(state = initState, action) {
  switch (action.type) {
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}
