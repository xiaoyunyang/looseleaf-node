//const root = '';
const root = 'http://localhost:3001';

export const image = {
  defaultUser: `${root}/user.png`,
  logo: `${root}/logo.png`,
  landing: {
    coverLarge: `${root}/landing/landing1-large.png`,
    coverMedium: `${root}/landing/landing1-medium.png`,
    coverSmall: `${root}/landing/landing1-small.png`,
    expertise: `${root}/landing/expertise.png`,
    cultivate: `${root}/landing/cultivate.png`,
    share: `${root}/landing/share.png`
  },
  team: {
    team: `${root}/team/team.png`,
    xiaoyunyang: `${root}/team/xiaoyunyang.png`,
    andrewfenner: `${root}/team/andrewfenner.png`,
    ollie: `${root}/team/ollie.png`,
  }
}
export const team = [
  {
    fullName: 'Xiaoyun Yang',
    role: 'Founder',
    bio: "Xiaoyun's Bio",
    img: image.team.xiaoyunyang,
    linkedin: 'https://linkedin.com/in/xiaoyun-yang'
  },
  {
    fullName: 'Andrew Fenner',
    role: 'Designer',
    bio: "Andrew's Bio",
    img: image.team.andrewfenner,
    linkedin: 'https://linkedin.com/in/andrew-fenner'
  },
  {
    fullName: 'Ollie',
    role: 'HR',
    bio: "Ollie's Bio",
    img: image.team.ollie,
    linkedin: 'https://linkedin.com/in/andrew-fenner'
  }
];

export const socialMedia = {
  twitter: 'https://twitter.com/mylooseleaf',
  angellist: 'https://angel.co/looseleafapp',
  facebook: 'https://www.facebook.com/mylooseleaf/'
}
