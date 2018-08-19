import React from 'react';
import TopNav from '../TopNav';
import { page } from '../routes';

export default class Two extends React.Component {
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} community={this.props.community} />
        <div className="container">
          <div className="row">
            <div id={page(this.props.community).two.slug} className="col s12">
              <h3>Announcements</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
