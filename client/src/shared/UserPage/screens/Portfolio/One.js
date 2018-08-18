import React from 'react';
import Collection from './Collection';

const data = ['One1', 'One2', 'One3', 'One4', 'One5', 'One6', 'One7', 'One8'];

export default () => (
  <div id="one" className="col l12 m12 s12">
    <h2>Completed Projects</h2>
    <p>Projects you have completed.</p>
    <Collection data={data} />
  </div>
);
