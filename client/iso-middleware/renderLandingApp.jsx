import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { matchRoutes } from 'react-router-config';
import { routes } from '../src/shared/Landing/routes';
import HTML from '../src/shared/components/HTML';
import App from '../src/shared/Landing/App';

export default function renderLandingApp(req, res, next) {
  const meta = {
    title: 'LooseLeaf',
    desc: 'Get your projects done for free',
    url: req.url,
    keywords: 'LooseLeaf, CRM, ATS, applicant tracking, collaboration, project management, developers, talent sourcing, open source'
  };
  const clientAppPath='/landing.bundle.js';

  const branch = matchRoutes(routes, req.url);

  const promises = branch.map(({ route, match }) => {
    return route.loadData
      ? route.loadData(match)
      : Promise.resolve(null);
  });

  Promise.all(promises).then(data => {
     // data will be an array[] of datas returned by each promises.
     // console.log(data)

     const context = data.reduce((context, data) => {
       return Object.assign(context, data);
     }, {});

     const app = renderToString(
       <StaticRouter location={req.url} context={context} >
         <App />
       </StaticRouter>
     );
     const html = renderToString(
       <HTML
         meta={meta}
         html={app}
         clientAppPath={clientAppPath}
       />
     );
    return res.send(`<!DOCTYPE html>${html}`);
  }).catch(reason => {
    console.log(reason)
  });
}
