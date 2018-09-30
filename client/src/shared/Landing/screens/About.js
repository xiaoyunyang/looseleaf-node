import React from 'react';
import TopNav from '../TopNav';
import TeamMembers from './TeamMembers';
import MdText from '../../components/MdText';
import Footer from '../../components/Footer';
import { image } from '../../data/assetLinks';
import {  markdown } from '../../data/assetLinks';
import team from '../../data/team';

export default ({ route }) => (
  <div className="section-white" style={{paddingBottom: 0}}>
    <TopNav route={route} extended={false} />
    <div id="team-pg" className="container">
      <div className="card row s12 m12 l12">
        <div className="team-section section-green">
          <h4>About LooseLeaf</h4>
        </div>
        <img alt="looseleaf team (https://unsplash.com/photos/TamMbr4okv4)" src={image.team.team} />
        <div className="row" style={{ padding: 25 }}>
          <div className="col s12 m6 l6">
            <h5 className="center">
              Our Mission
            </h5>
            <div className="container" style={{width: '85%'}}>
              <MdText filepath={markdown.ourMission} mdId="our-mission" />
            </div>
          </div>
          <div className="col s12 m6 l6">
            <h5 className="center">
              Our Values
            </h5>
            <div className="container" style={{width: '85%'}}>
              <MdText filepath={markdown.ourValues} mdId="our-values" />
            </div>
          </div>
        </div>
        <div className="team-section section-green">
          <h4 className="hide-on-med-and-up center-align" style={{ marginBottom: -20 }}>Team</h4>
          <h4 className="hide-on-small-only" style={{ marginBottom: -20 }}>Team</h4>
          <TeamMembers team={team} />
        </div>
        <div className="row" style={{ padding: 25 }}>
          <div className="col s12 m12 l12">
            <h5>Our Story</h5>
            <MdText filepath={markdown.ourStory} mdId="our-story" />
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);
