import React from 'react';
import UserCards from '../../components/Collection/UserCards';

const Contributors = ({ contributors }) => (
  <div id="contributors">
    <h5>{`Project Contributors (${contributors.length})`}</h5>
    <UserCards contributors={contributors} />
  </div>
);

export default Contributors;
