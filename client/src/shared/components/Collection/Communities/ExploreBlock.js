import React from 'react';
import { communityMeta, communitiesArr } from './lib';

const ShortVersion = ({ collection }) => (
  <div className="row">
    <div className="col">
      {
      collection.map(c => {
        const { icon, link } = communityMeta(c.slug);
        return (
          <div key={`explore-community-${c.slug}`} className="col s10 m6 l4 offset-s1">
            <a href={link} className="">
              <div className="card-panel center hoverable" style={{ padding: 5 }}>
                <div className="row valign-wrapper" style={{ marginBottom: 0 }}>
                  <div className="col s12 m4 l3">
                    <i className="material-icons medium text-green">
                      {icon}
                    </i>
                  </div>
                  <div className="col s12 m8 l9">
                    <h6
                      className="col s12 m12 l10 offset-l1 text-brown"
                      style={{ fontWeight: 700, fontSize: 16, textTransform: 'uppercase' }}
                    >
                      {c.name}
                    </h6>
                  </div>
                </div>
              </div>
            </a>
          </div>
        );
      })
    }
    </div>
  </div>
);
const LongVersionCard = ({ collection }) => (
  <div className="row">
    <div className="col">
      {
      collection.map(c => {
        const { icon, color, link } = communityMeta(c.slug);
        return (
          <div key={`explore-community-${c.slug}`} className="col s10 m6 l4 offset-s1">
            <a href={link} className="">
              <div className="card-panel center hoverable" style={{ minHeight: 170, backgroundColor: color, padding: 10 }}>
                <h5 className="row light text-green">
                  <i style={{fontSize: 40}} className="col s12 m12 l12 material-icons text-green">
                    {icon}
                  </i>
                  {c.name}
                </h5>
                <h6 className="light text-brown" style={{paddingBottom: 0}}>{c.desc}</h6>
              </div>
            </a>
          </div>
        );
      })
    }
    </div>
  </div>
);

const LongVersion = ({ collection }) => (
  <div className="row" style={{paddingTop: 30}}>
    {
      collection.map((c, i) => {
        const { icon, link } = communityMeta(c.slug);
        return (
          <div
            key={`explore-community-${c.slug}`}
            className="col s12 m6 l4" style={{minHeight: 145, paddingTop: 11}}
          >
            <img className="materialboxed" width="650"
            src="/assets/images/landing/mobile-laptop1.png" alt="" />

            <a style={{fontSize: 30}} href={link} className="row light text-green">
              <i style={{fontSize: 40}} className="col s12 m12 l12 material-icons text-green">
                {icon}
              </i>
              {c.name}
            </a>
            <h6 className="light text-brown" style={{paddingBottom: 0}}>{c.desc}</h6>
          </div>
        );
      })
    }
  </div>
);

export default class ExploreBlock extends React.Component {
  render() {
    return (
        <div>
        {
          this.props.version === 'short' &&
          <ShortVersion collection={communitiesArr} />
        }
        {
          this.props.version === 'long' &&
          <LongVersionCard  collection={communitiesArr} />
        }
        {
          this.props.version === 'longSimple' &&
          <LongVersion  collection={communitiesArr} />
        }
      </div>
    );
  }
}
