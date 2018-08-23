import React from 'react';
import TopNav from '../TopNav';
import TeamMembers from './TeamMembers';
import { image } from '../../data/assetLinks';
import { team } from '../../data/assetLinks'

const mission =
{
  0: "The major challenges of self-study for a career change include the lack of insight on what skills to build, what to work on to build these skills, and how the skill building activity will improve chance of employment in a chosen career track. LooseLeaf's mission is to help career changers build a portfolio with real projects from non-profits."
};

export default ({ route }) => (
  <div className="section-white">
    <TopNav route={route} extended={false} />
    <div id="team-pg" className="container">
      <div className="card row s12 m10 l10">
        <div className="team-section section-green">
          <h4>About LooseLeaf</h4>
        </div>
        <img alt="looseleaf team (https://unsplash.com/photos/TamMbr4okv4)" src={image.team.team} />
        <div className="row" style={{ padding: 25 }}>
          <div className="col s12 m6 l6">
            <h5 className="center">
              Our Mission
            </h5>
            <p>{mission[0]}</p>
          </div>
          <div className="col s12 m6 l6">
            <h5 className="center">
              Our Values
            </h5>
            <p className="container">Stuff Stuff</p>
          </div>
        </div>
        <div className="team-section section-green">
          <h4 style={{ marginBottom: -20 }}>Team</h4>
          <TeamMembers team={team} />
        </div>
        <div className="row" style={{ padding: 25 }}>
          <div className="col s12 m12 l12">
            <h5>Jobs and Partnership</h5>
            <p>Stuff Stuff</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
