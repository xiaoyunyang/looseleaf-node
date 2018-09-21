import React from 'react';
import PropTypes from 'prop-types';
import {
  convertToRaw,
  EditorState,
  RichUtils
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import { convertToEditorState } from './draftjsHelpers';

export default class NewPost extends React.Component {
  static defaultProps = {
    placeholder: 'Write something...'
  }
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      clientModeOn: false
    };
    // Functions called by the render function
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.renderPlaceholder = this.renderPlaceholder.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.handleCancel = this.handleCancel.bind(this); // post edit mode only

    // TODO: Is there a way to increase the height of the input area
    // when on focus?
    this.focus = () => this.refs.editor.focus();
  }
  componentDidMount() {
    this.setState({ clientModeOn: true });
    if(this.props.editorContent) {
      const newEditorState = convertToEditorState(this.props.editorContent);
      this.setState({
        editorState: newEditorState
      });
    }
  }
  clearEditor() {
    this.setState({
      editorState: EditorState.createEmpty()
    });
  }
  // Here, we are passing a command (like bold or underline) as an argument,
  // which will get passed to the RichUtils.handleKeyCommand, which handles
  // key commands out of the box, along with the current EditorState object.
  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }
  handlePost() {
    const content = this.state.editorState.getCurrentContent();
    // content to save to the db
    const contentToSave = JSON.stringify(convertToRaw(content));

    // TODO: we only want to clearEditor if the post has been successfully created
    // or updated. If the server does not respond with OK, we do not want to clearEditor.
    // We want to retain the editor state so user can try posting again later without
    // having to re-type everything.
    this.props.handlePost(contentToSave, this.clearEditor());
  }
  // post edit mode only
  handleCancel() {
    this.props.handleToggleEditMode(false);
  }
  hasContent(editorState) {
    const contentState = editorState.getCurrentContent();
    return contentState.hasText();
  }
  hasContentAndStyle(editorState) {
    const contentState = editorState.getCurrentContent();
    return contentState.hasText() || contentState.getBlockMap().first().getType() !== 'unstyled';
  }
  renderPlaceholder(placeholder, editorState) {
    return this.hasContentAndStyle(editorState) ? '' : placeholder;
  }
  renderPostBtn(editorState) {
    return (
      this.hasContent(editorState) ?
        <button className="btn" onClick={this.handlePost}>
          Post
        </button>
        :
        <button className="btn disabled">
          Post
        </button>
    );
  }
  renderCancelBtn() {
    return (
      <button style={{marginLeft: 20}} className="btn red lighten-2" onClick={this.handleCancel}>
        Cancel
      </button>
    );
  }
  renderEditor() {
    if (!this.state.clientModeOn) {
      return null;
    }
    return (
      <div className="card feed">
        <div className="card-content">
          <div className="row feed-user">
            <div className="col">
              <img className="circle" src={this.props.userPic} alt=""/>
            </div>
            <div className="col">
              <span>
                <p style={{fontSize: 16}}>{this.props.userDisplayName}</p>
              </span>
            </div>
          </div>
          <div className="draft-js-editor">
            <Editor
              editorState={this.state.editorState}
              plugins={this.props.plugins}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder={this.renderPlaceholder(this.props.placeholder, this.state.editorState)}
              ref={(element) => { this.editor = element; }}
            />
            {this.props.InlineToolbar}
          </div>
        </div>
        <div className="card-action">
          {this.renderPostBtn(this.state.editorState)}
          {this.props.editorContent && this.renderCancelBtn()}
        </div>
      </div>
    );
  }
  render() {
    return (
      <div>{ this.renderEditor() }</div>
    );
  }
}

NewPost.propTypes = {
  editorContent: PropTypes.string, // not null if edit post mode
  handleToggleEditMode: PropTypes.func, // not null if edit post mode
  handlePost: PropTypes.func.isRequired,
  InlineToolbar: PropTypes.element,
  placeholder: PropTypes.string,
  plugins: PropTypes.array,
  userDisplayName: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
};
