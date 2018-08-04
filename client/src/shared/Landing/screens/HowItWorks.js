import React from 'react';
import TopNav from '../../components/TopNavGuest';
import MdText from '../../components/MdText';

export default ({ route }) => (
  <div className="section-white">
    <TopNav route={route} extended={false} />
    <div className="container" style={{ marginTop: 40, marginBottom: 40 }}>
      <MdText filepath="http://localhost:3001/how-it-works.md" mdId="how-it-works"/>
    </div>
  </div>
);
