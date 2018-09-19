import appRoute from '../../../data/appRoute';

export const communities = require('../../../data/community.json');

export const communityName = slug => communities[slug] ? communities[slug].name : '';

export const communitiesArr = Object.values(communities);

export const getIconColor = slug => {
  switch (slug) {
    case 'developers': return { icon: 'code', color: '#fff' } ;
    case 'designers' : return { icon: 'create', color: '#fff'};
    case 'illustrators': return { icon: 'palette', color: '#fff'};
    case 'writers': return { icon: 'create', color: '#fff'};
    case 'data-scientists': return { icon: 'scatter_plot', color: '#fff'};
    case 'video-producers': return { icon: 'theaters', color: '#fff'};
    case 'misc': return { icon: 'public', color: '#fff'};
    default: return;
  }
};

export const communityMeta = slug => {
  const { icon, color } = getIconColor(slug);
  const link = appRoute('communityHome', true)(slug);
  return { icon, color, link }
}
