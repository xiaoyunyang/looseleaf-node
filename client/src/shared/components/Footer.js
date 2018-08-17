import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import { socialMedia, landingImg } from '../data/landingLinks';

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
    // TODO: wrap social icons in circles
    return (
      <footer className="page-footer section-white">
        <div className="container">
          <div className="row left-align">
            <img style={{ paddingTop: 12, paddingLeft: 25, maxWidth: 200 }} alt='LooseLeaf' src={landingImg.logo} />
          </div>
          <div className="row">
            <div className="col s12 m12 l10">
              <div className="col s4 m2 l2">
                <h6>Product
                  <ul style={{ marginTop: 5 }} className="light footer-text-links">
                    <li><a href="#!">FAQs</a></li>
                    <li><a href="#!">Support</a></li>
                    <li><a href="#!">Guides</a></li>
                  </ul>
                </h6>
              </div>
              <div className="col s4 m2 l2">
                <h6>Company
                  <ul style={{ marginTop: 5 }} className="light footer-text-links">
                    <li><a href="#!">About</a></li>
                    <li><a href="#!">Careers</a></li>
                    <li><a href="#!">Partners</a></li>
                  </ul>
                </h6>
              </div>
              <div className="col s4 m3 l3">
                <h6>Legal
                  <ul style={{ marginTop: 5 }} className="light footer-text-links">
                    <li><a href="#!">Privacy Policy</a></li>
                    <li><a href="#!">Terms of Use</a></li>
                  </ul>
                </h6>
              </div>
              <div className="col s12 m4 l2" style={{ minWidth: 190 }}>
                {this.renderSocialMediaLinks()}
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <p>
              &copy; 2018 LooseLeaf, LLC.
            </p>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;
