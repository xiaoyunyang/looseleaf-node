import React from 'react';
import { renderRoutes } from 'react-router-config';
import Footer from '../components/Footer';

class Main extends React.Component {
  render() {
    const appProps = {
      user: this.props.user,
      loggedinUser: this.props.loggedinUser,
      actions: this.props.actions
    }
    return (
      <div>
        {renderRoutes(this.props.routes, appProps)}
        {
          !this.props.user.loggedinUser && <Footer />
        }
      </div>
    )
  }
}
export default Main;
