import React from 'react';
import PropTypes from 'prop-types';
import { communityName } from './lib';

const Chips = ({ cs, altern, hasIcon, showAltern }) => (
  <div>
    {
      showAltern &&
      <div className="row portfolio-user-info">
        {
          hasIcon &&
          <div className="col s1 m1 l1" style={{marginTop: 4}}>
            <i className="material-icons grey-text text-darken-2">group</i>
          </div>
        }
        <div className="col s11 m11 l11">
          {
            cs && cs.length>0 ? cs.map(c => {
            return <div key={`community-chip-${c}`} className="chip">
              <a href={`/community/${c}`}>{communityName(c)}</a>
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
          <div className="col s1 m1 l1" style={{marginTop: 4}}>
            <i className="material-icons grey-text text-darken-2">group</i>
          </div>
        }
        <div className="col s11 m11 l11">
          {
            cs.map(c => {
            return <div key={`community-chip-${c}`} className="chip">
              <a href={`/community/${c}`}>{communityName(c)}</a>
            </div>;
            })
          }
        </div>
      </div>
    }
  </div>
);
Chips.propTypes = {
  cs: PropTypes.array,
  altern: PropTypes.object,
  hasIcon: PropTypes.bool
};
Chips.defaultProps = {
  cs: null,
  altern: null,
  hasIcon: false
}
export default Chips;
