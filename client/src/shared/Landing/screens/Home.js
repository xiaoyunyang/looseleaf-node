import React from 'react';
import TopNav from '../../components/TopNavGuest';
import Footer from '../../components/Footer';
const styles = {
  marginTop: '-4.5%'
}
const slogan = [
  'A degree is not enough. You need relevant work experience.',
  'Build a portfolio with projects.',
  'career building via amateur freelancing'
]
const moreInfo = [
  'Work on projects for non-profits and entrepreneurs. Build a portfolio as a developer, designer, or writer.',
  'Gain relevant work experience as a developer, designer, and writer by helping non-profits and entrepreneurs with projects.'
]

const getImgPath = (imgName) => 'http://localhost:3001/landing/' + imgName;

export default ( {route} ) => (
  <div>
    <TopNav route={route} extended={false}/>
    <div className="row hero section-white center">
      <div className="col s12 m12 l6">
        <img src={getImgPath('landing-plane.png')} alt=""/></div>
      <div className="col s12 m12 l6">
        <h4 className="text-green center">{slogan[0]}</h4>
        <h5 className="light text-brown center">
          {moreInfo[0]}
        </h5>
        <a className="waves-effect waves-light btn" href="dashboard.html">Sign me up! <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
      </div>
    </div>
    <div className="section section-green">
      <div className="row text-white">
        <div className="col s12 m4 l4">
          <div className="col s4 m4 l4">
            <img src={getImgPath('share.png')} alt=""/>
          </div>
          <h5 className="text-white">Create Project</h5>
          <p className="text-white">Curate bookmarks to online learning content with other knowledge seekers.</p>
        </div>
        <div className="col s12 m4 l4">
          <div className="col s4 m4 l4">
            <img src={getImgPath('expertise.png')} alt=""/>
          </div>
          <h5 className="text-white">Learn</h5>
          <p className="text-white">Collect bookmarks for your online Notebook. Learn on your own time and get feedback on your learning. </p>
        </div>
        <div className="col s12 m4 l4">
          <div className="col s4 m4 l4">
            <img src={getImgPath('cultivate.png')} alt=""/>
          </div>
          <h5 className="text-white">Grow</h5>
          <p className="text-white">Share what you learned with other knowledge seekers. Become a mentor and influencer.</p>
        </div>
      </div>
    </div>

    <div className="section white">
      <div className="row hero center" style={styles}>
        <div className="row container">
          <h4 className="text-brown">Your Online Notebook</h4>
          <h5 className="light text-brown center">
            Get all your bookmarks in one place. <br/>Easily discover and collect other people's bookmarks.
          </h5>
        </div>
        <div className="row">
          <div className="col s12 m12 l4">
            <img className="materialboxed" width="650" src="/assets/images/landing/mobile-laptop1.png" alt=""/>
            <h4 className="light text-green">Find</h4>
            <h6 className="light text-brown">Intuitive navigation using interactive visualizations of your bookmarks.</h6>
            <br/>
          </div>
          <div className="col s12 m12 l4">
            <img className="materialboxed" width="650" src="/assets/images/landing/mobile-laptop2.png" alt=""/>
            <h4 className="light text-green">Organize</h4>
            <h6 className="light text-brown">Personalize your learning environment.</h6>
            <br/>
          </div>
          <div className="col s12 m12 l4">
            <img className="materialboxed" width="650" src="/assets/images/landing/mobile-laptop3.png" alt=""/>
            <h4 className="light text-green">Discover</h4>
            <h6 className="light text-brown">Check out what other people are curating.</h6>
            <br/>
          </div>
        </div>
        <img className="medium-img" src="/assets/images/landing/landing-bookmark.png" alt=""/>
        <div className="row container center">
          <h4 className="text-green">Social Bookmarks</h4>
          <h6 className="light text-brown">
            Bundle various types of bookmarks on tips, walkthroughs, guides, wikis, template, recipes, tutorials, advice, ideas, examples, and inspiration
            to create useful collections
          </h6>
        </div>
      </div>
    </div>
    <div className="section section-brown">
      <div className="row container center text-link">
        <h5 className="text-white">
          Join a community of lifelong learners and people looking to enrich and upgrade their lives through knowledge.
        </h5>
        <a href="about.html">Learn more <i className="fa fa-arrow-circle-right" aria-hidden="true"></i></a>
      </div>
    </div>
    <div className="section section-white">
      <div className="row container center">
        <h4 className="text-brown center">Use it for free</h4>
        <div className="row">
          <div className="col s12 m12 l12">
            <a className="waves-effect waves-light btn btn-large modal-trigger" href="http://eepurl.com/cgdpfP">Get started</a>
          </div>
        </div>
        <h4 className="text-brown center">OR</h4>
        <h5 className="text-brown center">Check out theses notebooks</h5>
        <div className="row text-link-list">
          <div className="col s12 m4 l2">
            <a href="http://looseleafapp.com/dashboard.html#matrix" className="">Entrepreneurs</a>
          </div>
          <div className="col s12 m4 l2">
            <a href="http://looseleafapp.com/dashboard.html#matrix" className="">Teachers</a>
          </div>
          <div className="col s12 m4 l2">
            <a href="http://looseleafapp.com/dashboard.html#matrix" className="">Designers</a>
          </div>
          <div className="col s12 m4 l2">
            <a href="http://looseleafapp.com/dashboard.html#matrix" className="">Developers</a>
          </div>
          <div className="col s12 m4 l2">
            <a href="http://looseleafapp.com/dashboard.html#matrix" className="">Freelancers</a>
          </div>
          <div className="col s12 m4 l2">
            <a href="http://looseleafapp.com/dashboard.html#matrix" className="">Creators</a>
          </div>
        </div>
      </div>
    </div>
    <Footer />

  </div>
);
