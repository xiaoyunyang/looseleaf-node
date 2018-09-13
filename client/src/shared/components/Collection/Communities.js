import React from 'react';
import PropTypes from 'prop-types';
import { slug2Name } from '../../../lib/helpers';

const Communities= ({ cs, altern, hasIcon, showAltern }) => (
  <div>
    {
      showAltern &&
      <div className="row portfolio-user-info">
        {
          hasIcon &&
          <div className="col s1 m1 l1">
            <i className="material-icons">group</i>
          </div>
        }
        <div className="col s11 m11 l11">
          {
            cs && cs.length>0 ? cs.map(c => {
            return <div key={`community-chip-${c}`} className="chip">
              <a href={`/community/${c}`}>{slug2Name(c)}</a>
            </div>;
            })
            :
            <div>{altern}</div>
          }
        </div>
      </div>
    }
    {
      !showAltern && cs && cs.length > 0 &&
      <div className="row portfolio-user-info">
        {
          hasIcon &&
          <div className="col s1 m1 l1">
            <i className="material-icons">group</i>
          </div>
        }
        <div className="col s11 m11 l11">
          {
            cs.map(c => {
            return <div key={`community-chip-${c}`} className="chip">
              <a href={`/community/${c}`}>{slug2Name(c)}</a>
            </div>;
            })
          }
        </div>
      </div>
    }
  </div>
);
Communities.propTypes = {
  cs: PropTypes.array,
  altern: PropTypes.object,
  hasIcon: PropTypes.bool
};
Communities.defaultProps = {
  cs: null,
  altern: null,
  hasIcon: false
}
export default Communities;
