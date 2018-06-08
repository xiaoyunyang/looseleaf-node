import React from 'react';
import Collection from './Collection';

const data = ['Four1', 'Four2', 'Four3'];

export default () => (
  <div id="four" className="col s12">
    <h2>Contributions</h2>
    <p>Projects contributions or community contributions.</p>
    <Collection data={data} />
  </div>
);
