import appRoute from '../../../data/appRoute';

export const communities = require('../../../data/community.json');

export const communitiesArr = Object.values(communities);

export const getIcon = slug => {
  switch (slug) {
    case 'developers': return 'code';
    case 'designers' : return 'create';
    case 'illustrators': return 'palette';
    case 'writers': return 'create';
    case 'data-scientists': return 'scatter_plot';
    case 'video-producers': return 'theaters';
    case 'misc': return 'public';
    default: return;
  }
};

export const communityIconAndLink = slug => {
  const icon = getIcon(slug);
  const link = appRoute('communityHome', true)(slug);
  return { icon, link }
}
