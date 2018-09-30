import React from 'react';
import TopNav from '../TopNav';
import { markdown } from '../../data/assetLinks';
import MdText from '../../components/MdText';
import Footer from '../../components/Footer';

export default ({ route }) => (
  <div className="section-white" style={{paddingBottom: 0}}>
    <TopNav route={route} extended={false} />
    <div id="markdown-pg" className="container">
      <MdText filepath={markdown.privacy} mdId="privacy" />
    </div>
    <Footer />
  </div>
);
