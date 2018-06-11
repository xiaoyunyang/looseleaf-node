// TODO: get tags/interests via API call (?)
// TODO: Would like a way to update the database of interests if someone adds
// an interest that doesn't exist in the database.

// I'm getting these interests from Upwork (See https://www.upwork.com/i/freelancer-categories-all/)
// and Patreon (See https://www.patreon.com/explore/graphic)

// TODO: Keep track of how strong someone is in an interest area based on how many
// projects they've completed or how many contributions they've made in that interest areas
const interests = [
  'Advertising',
  'AI',
  'Animation',
  'Angular',
  'Art',
  'AWS',
  'Audio Production',
  'Blogging',
  'Branding',
  'C++',
  'CSS',
  'D3.js',
  'Data Science',
  'Data Visualization',
  'Design',
  'Digital Marketing',
  'Education',
  'Editing',
  'Email Marketing',
  'Entrepreneurship',
  'Game Development',
  'Go',
  'Graphic Design',
  'Illustration',
  'Infographics',
  'JavaScript',
  'Logo Design',
  'Machine Learning',
  'Mobile Development',
  'Node.js',
  'Photography',
  'Python',
  'React.js',
  'React Native',
  'Ruby',
  'Ruby on Rails',
  'Scripting',
  'SPA',
  'Swift',
  'Translating',
  'UI',
  'User Experience',
  'UX Design',
  'Video Production',
  'Vue.js',
  'Web Development',
  'Writing'
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
]
export { interests, communities, platforms };
