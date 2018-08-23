import appRoute from './appRoute';

const communityPage = (communityName) => {
  return {
    home: {name: 'Projects', slug: 'projects', link: appRoute('communityHome')(communityName)},
    one: {name: 'Projects', slug: 'projects', link: appRoute('communityOne')(communityName)},
    two: {name: 'Announcements', slug: 'announcements', link: appRoute('communityTwo')(communityName)},
    three: {name: 'People', slug: 'people', link: appRoute('communityThree')(communityName)},
    wildcard: {link: appRoute('communityWildcard')(communityName)},
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
