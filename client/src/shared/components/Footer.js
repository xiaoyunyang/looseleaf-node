import React from 'react';
import $ from 'jquery';

class Footer extends React.Component {
  componentDidMount(){
    $('.tooltipped').tooltip({delay: 50});
  }
  render() {
    // TODO: wrap social icons in circles
    return (
      <footer className="page-footer section-brown">
        <div className="container">
          <div className="row">
            <div className="col s12 m4 l4">
              <div className="col s6 m10 l8">
                <a href="/">
                  <img alt='looseleaf' src="http://looseleafapp.com/assets/images/logo/beta.png"/>
                </a>
              </div>
              <div className="col l12 m12 s12 light footer-text-links">
                 <p>
                   More on<strong><a className="footer-text-links" href="/about"> our mission</a></strong>
                </p>
                <div className="col s12 m12 l12">
                  <div className="row">
                      <h6 className="white-text">Connect:</h6>
                      <div className="social-icons">
                        <a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/mylooseleaf">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://twitter.com/mylooseleaf">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Email us" href="mailto:info@looseleaf.us">
                          <i className="fa fa-angellist fa-lg"></i>
                        </a>
                        <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Email us" href="mailto:info@looseleaf.us">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col s12 m8 l8">
              <div className="col s6 m4 l4">
                <h6>
                  <ul className="light footer-text-links">
                    <li><a href="#!">About</a></li>
                    <li><a href="#!">Careers</a></li>
                    <li><a href="#!">Partners</a></li>

                  </ul>
                </h6>
              </div>
              <div className="col s6 m6 l5">
                <h6>
                  <ul className="light footer-text-links">
                    <li><a href="#!">FAQs</a></li>
                    <li><a href="#!">Privacy Policy</a></li>
                    <li><a href="#!">Terms of Use</a></li>
                    <li><a href="#!">Community Guidelines</a></li>
                  </ul>
                </h6>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <div className="container">
            <p>
              &copy; 2018 LooseLeaf LLC. Made with <i className="fa fa-heart fa-lg"></i> in DC.
            </p>
          </div>
        </div>
      </footer>

    );
  }
}
export default Footer;
