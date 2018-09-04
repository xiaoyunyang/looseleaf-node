// TODO: get tags/interests via API call (?)
// TODO: Would like a way to update the database of interests if someone adds
// an interest that doesn't exist in the database.

// I'm getting these interests from Upwork (See https://www.upwork.com/i/freelancer-categories-all/)
// and Patreon (See https://www.patreon.com/explore/graphic)

// TODO: Keep track of how strong someone is in an interest area based on how many
// projects they've completed or how many contributions they've made in that interest areas
const interests = [
  {
    name: 'Advertising',
    picture: null
  },
  {
    name: 'AI',
    picture: null
  },
  {
    name: 'Animation',
    picture: null
  },
  {
    name: 'Angular',
    picture: null
  },
  {
    name: 'Art',
    picture: null
  },
  {
    name: 'AWS',
    picture: null
  },
  {
    name: 'Audio Production',
    picture: null
  },
  {
    name: 'Blogging',
    picture: null
  },
  {
    name: 'Branding',
    picture: null
  },
  {
    name: 'C++',
    picture: null
  },
  {
    name: 'CSS',
    picture: null
  },
  {
    name: 'D3.js',
    picture: null
  },
  {
    name: 'Data Science',
    picture: null
  },
  {
    name: 'Data Visualization',
    picture: null
  },
  {
    name: 'Design',
    picture: null
  },
  {
    name: 'Digital Marketing',
    picture: null
  },
  {
    name: 'Education',
    picture: null
  },
  {
    name: 'Editing',
    picture: null
  },
  {
    name: 'Email Marketing',
    picture: null
  },
  {
    name: 'Entrepreneurship',
    picture: null
  },
  {
    name: 'Game Development',
    picture: null
  },
  {
    name: 'Go',
    picture: null
  },
  {
    name: 'Graphic Design',
    picture: null
  },
  {
    name: 'Illustration',
    picture: null
  },
  {
    name: 'Infographics',
    picture: null
  },
  {
    name: 'JavaScript',
    picture: null
  },
  {
    name: 'Logo Design',
    picture: null
  },
  {
    name: 'Machine Learning',
    picture: null
  },
  {
    name: 'Mobile Development',
    picture: null
  },
  {
    name: 'Node.js',
    picture: null
  },
  {
    name: 'Photography',
    picture: null
  },
  {
    name: 'Python',
    picture: null
  },
  {
    name: 'React.js',
    picture: null
  },
  {
    name: 'Ruby',
    picture: null
  },
  {
    name: 'Ruby on Rails',
    picture: null
  },
  {
    name: 'Scripting',
    picture: null
  },
  {
    name: 'SPA',
    picture: null
  },
  {
    name: 'Swift',
    picture: null
  },
  {
    name: 'Translating',
    picture: null
  },
  {
    name: 'UI',
    picture: null
  },
  {
    name: 'User Experience',
    picture: null
  },
  {
    name: 'UX Design',
    picture: null
  },
  {
    name: 'Video Production',
    picture: null
  },
  {
    name: 'Vue.js',
    picture: null
  },
  {
    name: 'Web Development',
    picture: null
  },
  {
    name: 'Writing',
    picture: null
  }
];

const communities = [
  'Web Development',
  'Mobile Development',
  'Data Science'
]
const platforms = [
  'Google Doc',
  'Dropbox',
  'Github',
  'Codepen',
  'Cloud9',
  'Glitch',
  'Repl.it',
  'Other'
];
/*
const platforms = [
  {
    name: 'Google Doc',
    picture: null
  },
  {
    name: 'Dropbox',
    picture: null
  },
  {
    name: 'Github',
    picture: null
  },
  {
    name: 'Codepen',
    picture: null
  },
  {
    name: 'CodeSandbox',
    picture: null
  },
  {
    name: 'Cloud9',
    picture: null
  },
  {
    name: 'Glitch',
    picture: null
  },
  {
    name: 'Repl.it',
    picture: null
  },
  {
    name: 'Other',
    picture: null
  }
];
 */
export { interests, communities, platforms };
