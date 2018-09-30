import React from 'react';
import $ from 'jquery';
import appRoute from '../data/appRoute';
import { socialMedia, image } from '../data/assetLinks';

// NOTE: for optimization and eliminating unnecessary queries, we've copied the file
// from the server folder to the client folder. These files must be manually synchronized.
const community = require('../data/community.json');
const communityArr = Object.values(community);

class Footer extends React.Component {
  componentDidMount() {
    $('.tooltipped').tooltip({ delay: 50 });
  }
  renderSocialMediaLinks() {
    return (
      <div className="col s12 m12 l12">
        <div className="row">
          <h6 className="">Connect:</h6>
          <div className="social-icons">
            <a target="_blank" rel="noopener noreferrer" href={socialMedia.facebook}>
              <i className="fab fa-facebook fa-lg" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={socialMedia.twitter}>
              <i className="fab fa-twitter fa-lg" />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={socialMedia.angellist}>
              <i className="fab fa-angellist fa-lg" />
            </a>
            <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Email us" href="mailto:info@looseleaf.us">
              <i className="fa fa-envelope fa-lg" />
            </a>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <footer className="page-footer section-white">
        <div className="container">
          <div className="row left-align">
            <img style={{ paddingTop: 12, paddingLeft: 25, maxWidth: 200 }} alt='LooseLeaf' src={image.logo} />
          </div>
          <div className="row">
            <div className="col s12 m12 l10">
              <div className="col s4 m2 l2">
                <h6>Product
                  <ul style={{ marginTop: 5 }} className="light footer-text-links">
                    <li><a href={appRoute('landingHowItWorks', true)}>FAQ</a></li>
                    <li><a href={appRoute('landingHowItWorks', true)}>Pricing</a></li>
                    <li><a href={appRoute('landingHowItWorks', true)}>Guides</a></li>
                    <li><a href={appRoute('landingPrivacy', true)}>Privacy</a></li>
                    <li><a href={appRoute('landingTerms', true)}>Terms</a></li>
                  </ul>
                </h6>
              </div>
              <div className="col s4 m2 l2">
                <h6>Company
                  <ul style={{ marginTop: 5 }} className="light footer-text-links">
                    <li><a href={appRoute('landingAbout', true)}>About</a></li>
                    <li><a href="http://xiaoyunyang.github.io/">Blog</a></li>
                    <li><a href={appRoute('landingCareers', true)}>Careers</a></li>
                    <li><a href="#!">AngelList</a></li>
                  </ul>
                </h6>
              </div>
              <div className="col s4 m3 l4">
                <h6>Communities
                  <ul style={{ marginTop: 5 }} className="light footer-text-links">
                    {
                      communityArr.map(c => {
                        const link = appRoute('communityHome', true)(c.slug);
                        return <li key={`footer-community=${c.slug}`}>
                          <a href={link}>
                            {c.name}
                          </a>
                        </li>
                      })
                    }
                  </ul>
                </h6>
              </div>
              <div className="col s12 m4 l2" style={{ minWidth: 190 }}>
                {this.renderSocialMediaLinks()}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright" style={{marginTop: 25}}>
          <div className="container">
            <p>
              &copy;{` ${(new Date()).getFullYear()} LooseLeaf, LLC.`}
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
