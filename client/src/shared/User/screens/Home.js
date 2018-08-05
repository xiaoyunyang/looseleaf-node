import React from 'react';
import fetch from 'isomorphic-fetch';
import TopNav from '../../components/TopNavUser';
import PostEditor from '../../components/Form/PostEditor';

const updates = [
  'A project update from someone you follow.',
  'A project update from a co-contributor of a project on your todo-list.',
  'An announcement from someone who follows you.',
  'A project update from someone who follows you.',
  'A project update from someone who follows you.',
  'An announcement on the discussion board of the project on your todo-list.',
  'An announcement on the community board.',
];

const Stat = ({ num, phrase }) => (
  <div className="row">
    <div className="col s2 m2 l2">
      <h6>{num}</h6>
    </div>
    <div className="col s10 m10 l10">
      <p>{phrase}</p>
    </div>
  </div>
);
// const Reaction =({tooltip, icon}) => (
//   <a href=""
//     className="tooltipped"
//     data-position="top"
//     data-delay="50"
//     data-tooltip={tooltip}>
//     <i className="material-icons">{icon}</i>
//   </a>
// )
const Reactions = () => (
  <div>
    <a href="">Interesting</a>
    <a href="">Clap</a>
    <a href="">Respond</a>
  </div>
);

// This is a ES6 class - see https://toddmotto.com/react-create-class-versus-component/
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resHello: 'Loading...'
    };
  }
  componentDidMount() {
    // console.log("componentDidMount in Home ... ")
    // this.props.actions.getHomePageData();
    console.log(this.props.actions);
    // Get hello message
    this.callApi('http://localhost:3001/api/hello')
      .then(res => this.setState({ resHello: res.express }))
      .catch(err => console.log(err));
  }
  // TODO: put callApi in a lib and import it. There's duplicate code in
  // the User/Home.js component.
  callApi = async function (endpoint) {
    const response = await fetch(endpoint);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  }

  renderUserCard() {
    return (
      <div className="card-panel hide-on-small-only" id="user-card">
        <div className="row">
          <div className="col s4 m4 l4">
            <img className="circle" src={this.props.user.picture} alt=""/>
          </div>
          <div className="col s8 m8 l8">
            <h6>{this.props.user.displayName}</h6>
            <p style={{ marginTop: -1 }}>{`@${this.props.user.username}`}</p>
          </div>
        </div>
        <div className="or-divider"/>
        <Stat num={0} phrase={'completed projects'}/>
        <Stat num={0} phrase={'project contributions'}/>
        <Stat num={0} phrase={'projects created'}/>
        <Stat num={4} phrase={'community posts'}/>
        <Stat num={2} phrase={'following'}/>
        <Stat num={1} phrase={'followers'}/>
      </div>
    );
  }
  renderFeed(msg, id) {
    return (
      <div key={id} className="card feed">
        <div className="card-content">
          <div className="row feed-user">
            <div className="col">
              <img className="circle" src={this.props.user.picture} alt=""/>
            </div>
            <div className="col s8 m8 l8">
              <p>{this.props.user.displayName}</p>
            </div>
          </div>
          <p>{msg}</p>

        </div>
        <div className="card-action">
          <Reactions />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="section-white">
        <TopNav route={this.props.route} user={this.props.user}/>
        <div className="container" id="user-home">
          <div className="row">
            <div className="col s12 m4 l3">
              {
                this.renderUserCard()
              }
            </div>
            <div className="col s12 m8 l9 user-feed">
              <PostEditor 
                userDisplayName={this.props.user.displayName}
                userPic={this.props.user.picture}
                placeholder="Post an announcement to your community or a project update."
              />
              {
                this.renderFeed(this.state.resHello, -1)
              }
              {
                updates.map((d,i) => {
                  return this.renderFeed(d, i);
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
