import appRoute from './appRoute';

const communityPage = (community) => {
  return {
    home: {name: 'Projects', slug: 'projects', link: appRoute('communityHome')(community)},
    one: {name: 'Projects', slug: 'projects', link: appRoute('communityOne')(community)},
    two: {name: 'Announcements', slug: 'announcements', link: appRoute('communityTwo')(community)},
    three: {name: 'People', slug: 'people', link: appRoute('communityThree')(community)},
    wildcard: {link: appRoute('communityWildcard')(community)},
  }
}

const userPage = (username) => {
  return {
    home: {name: 'Home', slug: 'projects', link: appRoute('userHome')},
    profile: {name: 'Profile', slug: `@${username}`, link: appRoute('userProfile')(username)},
    newProject: {name: 'New Project', slug: 'new', link: appRoute('newProject')},
    userSettings: {name: 'Settings', slug: `@${username}`, link: appRoute('userSettings')(username)},
  }
}

export {
  communityPage,
  userPage
}
