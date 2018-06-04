import React from 'react';
import Collection from './Collection';

const data = ['One1', 'One2', 'One3', 'One4', 'One5'];

export default () => (
  <div id="one" className="col l12 m12 s12">
    <h2>Achievements</h2>
    <Collection data={data}/>
  </div>
);
