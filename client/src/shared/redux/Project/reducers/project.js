const initState = {
  createdAt: "2018-07-14T04:44:56.361Z",
  creator: {
    userId:"5aa5fdc30f8220abf3ec12fa",
    about: "I love the idea of services exchanged without money. The world needs more of this! For too long a lack of finances has kept people from doing the work that they love and are actually most competent at. Here&#x27;s to LooseLeaf and a great concept well executed.",
    mission: "I'm building a startup called LooseLeaf"
  },
  tags:[],
  submission: {"instruction":"","platform":"Dropbox"},
  title: "Paint My Dog&#x27;s Portrait &lt;",
  urlSlug: "paint-my-dogs-portrait-720e2ev",
  desc: "My dog, Ollie, is a Shichon Teddy Bear.",
  dueDate: null,
  description: "build an app for me",
  type: "Web Development",
  interests: ['JavaScript', 'React'],
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
