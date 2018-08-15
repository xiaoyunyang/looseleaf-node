import React from 'react';
import TopNav from '../TopNav';
import UserListing from './UserListing';
import { tabs } from '../routes';
import PostEditor from '../../components/Form/PostEditor';
import { CompositeDecorator, convertFromRaw, Editor, EditorState } from 'draft-js';

const Reactions = () => (
  <div>
    <a href="">Interesting</a>
    <a href="">Clap</a>
    <a href="">Respond</a>
  </div>
);
// Following code based on:
// https://github.com/facebook/draft-js/blob/master/examples/draft-0-10-0/link/link.html
const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
    return (
      <a rel="nofollow noreferrer" href={url} target="_blank">
        {props.children}
      </a>
    );
};
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
      );
    },
    callback
  );
}
const decorator = new CompositeDecorator([ {
    strategy: findLinkEntities,
    component: Link
  },
]);


export default class Two extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorContent: null
    }
    this.renderFeed = this.renderFeed.bind(this);
  }
  handlePost(d) {
    // The d received here are in the format that can be saved to the DB
    console.log('TWO - handlepost - ', d)
    this.setState({
      editorContent: d
    });
  }
  renderFeed(editorContent, id) {
    if(!editorContent) return null;

    // TODO: Link is not working
    const content = convertFromRaw(JSON.parse(editorContent));
    const editorState = EditorState.createWithContent(content, decorator)
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
          <div className="draft-js-editor">
            <Editor
              editorState={editorState}
              readOnly
            />
          </div>
        </div>
        <div className="card-action">
          <Reactions />
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <TopNav route={this.props.route} user={this.props.user} community={this.props.community} />
        <div className="container">
          <div className="row">
            <div id={tabs.two} className="col s12 m12 l12">
              <h3>Announcements</h3>
              <PostEditor
                handlePost={d => this.handlePost(d)}
                userDisplayName={this.props.user.displayName}
                userPic={this.props.user.picture}
                placeholder="Post an announcement to this community."
              />
            {
              this.renderFeed(this.state.editorContent, 'hello')
            }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
