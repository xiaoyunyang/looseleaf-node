import React from 'react';
import TopNav from '../TopNav';
import { markdown } from '../../data/assetLinks';
import MdText from '../../components/MdText';

export default ({ route }) => (
  <div className="section-white">
    <TopNav route={route} extended={false} />
    <div className="container" style={{ marginTop: 40, marginBottom: 40 }}>
      <MdText filepath={markdown.howItWorks} mdId="how-it-works" />
    </div>
  </div>
);
