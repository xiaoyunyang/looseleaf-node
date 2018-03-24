import React from 'react';
import $ from 'jquery';

const socialIconsStyle = {
  paddingTop: 5
}
class Footer extends React.Component {
  componentDidMount(){
    $('.tooltipped').tooltip({delay: 50});
  }
  render() {
    // TODO: wrap social icons in circles
    return (
      <footer className="page-footer section-green">
        <div className="container">
          <div className="row">
            <div className="col l5 m12 s12">
              <div className="col l6 m4 s6">
                <a href="/">
                  <img src="http://looseleafapp.com/assets/images/logo/beta.png"/>
                </a>
              </div>
              <div className="col l12 s12 light footer-text-links">
                <p>
                {
                  'Let LooseLeaf help you connect with opportunities to gain relevant work experience.'
                }
                </p>
                 <p>
                   More on<strong><a className="footer-text-links" href="/about"> our mission</a></strong>
                </p>
                <div className="row">
                  <div className='col l2 m1 s2'>
                    <h6 className="white-text">Connect:</h6>
                  </div>
                  <div className='col l6 m6 s6 offset-l1'>
                    <div style={socialIconsStyle} className="social-icons">
                      <a target="_blank" href="https://www.facebook.com/mylooseleaf">
                        <i className="fa fa-facebook fa-lg"></i>
                      </a>
                      <a target="_blank" href="https://twitter.com/mylooseleaf">
                        <i className="fa fa-twitter fa-lg"></i>
                      </a>
                      <a className="tooltipped" data-position="top" data-delay="50" data-tooltip="Email us" href="mailto:info@looseleaf.us">
                        <i className="fa fa-envelope fa-lg"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col l6 m12 s12">
              <div className="col l5 s6 m4">
                <h5 className="white-text"><strong>Become a</strong></h5>
                <h6>
                  <ul className="light footer-text-links">
                    <li><a href="#!">Designer</a></li>
                    <li><a href="#!">Illustrator</a></li>
                    <li><a href="#!">Developer</a></li>
                    <li><a href="#!">Writer</a></li>
                  </ul>
                </h6>
              </div>
              <div className="col l5 m5 s6 offset-l1 offset-m1">
                <h5 className="white-text"><strong>{'Help out'}</strong></h5>
                <h6>
                  <ul className="light footer-text-links">
                    <li><a href="#!">Teachers</a></li>
                    <li><a href="#!">Nonprofits</a></li>
                    <li><a href="#!">Freelancers</a></li>
                    <li><a href="#!">Entrepreneurs</a></li>
                    <li><a href="#!">Bloggers</a></li>
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
