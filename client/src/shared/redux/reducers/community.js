const initState = {
  info: {
    slug: "developers",
    name: "Developers",
    desc: "Make web, mobile, and desktop apps.",
    members: ['xiaoyun-yang', 'afenner'],
    projects: ['create-kids-app-12345', 'rewrite-website-for-nonprofit-56789']
  }
};

export default function community(state = initState, action) {
  switch (action.type) {
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}
