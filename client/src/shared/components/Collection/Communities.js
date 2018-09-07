import React from 'react';
import PropTypes from 'prop-types';

const Communities= ({icon, cs, altern}) => (
  <div className="row portfolio-user-info">
    <div className="col s1 m1 l1">
      <i className="material-icons">{icon}</i>
    </div>
    <div className="col s11 m11 l11">
      {
        cs && cs.length>0 ? cs.map(c => {
        return <div key={`community-chip-${c}`} className="chip">
          <a href={`/community/${c}`}>{c}</a>
        </div>;
        })
        :
        <div>{altern}</div>
      }
    </div>
  </div>
);
Communities.propTypes = {
  cs: PropTypes.array,
  altern: PropTypes.object
};
Communities.defaultProps = {
  cs: null,
  altern: null
}
export default Communities;
