import React from 'react';
import Collection from './Collection';

const data = ['Three1', 'Three2', 'Three3'];

export default () => (
  <div id="three" className="col s12">
    <h2>Achievements</h2>
    <Collection data={data} />
  </div>
);
