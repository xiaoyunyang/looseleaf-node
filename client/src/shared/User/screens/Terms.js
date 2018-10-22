import React from 'react';
import TopNav from '../../components/TopNavUser/Main';
import { markdown } from '../../data/assetLinks';
import MdText from '../../components/MdText';

export default ({ route, user }) => (
  <div className="section-white">
    <TopNav route={route} user={user.info}/>
    <div id="markdown-pg" className="container">
      <MdText filepath={markdown.terms} mdId="terms" />
    </div>
  </div>
);
