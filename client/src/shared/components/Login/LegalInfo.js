import React from 'react';
import appRoute from '../../data/appRoute';

const LegalInfo = () => (
  <div className="col l12 m12 s12">
    <span>
      <a
        href={appRoute('landingTerms', true)}
        className="center-align"
        style={{color: '#555', textDecoration: 'underline'}}
      >
        Terms
      </a>{`  |  `}
      <a
        href={appRoute('landingPrivacy', true)}
        className="center-align"
        style={{color: '#555', textDecoration: 'underline'}}
      >
        Privacy
      </a>
    </span>
  </div>
);

export default LegalInfo
