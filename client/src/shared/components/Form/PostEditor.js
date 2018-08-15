import React from 'react';
import PropTypes from 'prop-types';
import {
  convertToRaw,
  EditorState,
  RichUtils
} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createMarkdownPlugin from 'draft-js-markdown-plugin';

// import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createInlineToolbarPlugin, { Separator } from 'draft-js-inline-toolbar-plugin';
import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
  CodeButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from 'draft-js-buttons';
import createLinkPlugin from 'draft-js-anchor-plugin';
/*
NOTE:
Basic Setup: https://goo.gl/nwPu5Y
Add Link Examples from Draft-js github: https://goo.gl/3NG89J
Codepen: https://codepen.io/xiaoyunyang/pen/QBBaPq
*/

const linkPlugin = createLinkPlugin({
  placeholder: 'Enter a URL and press enter'
});

const inlineToolbarPlugin = createInlineToolbarPlugin({
  structure: [
    BoldButton,
    ItalicButton,
    UnderlineButton,
    CodeButton,
    Separator,
    UnorderedListButton,
    OrderedListButton,
    BlockquoteButton,
    CodeBlockButton,
    linkPlugin.LinkButton
  ]
});

// const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

// TODO: Is there a way to recognize "cmd + k" or "ctrl + k" to open the url input?
const plugins = [
  inlineToolbarPlugin,
  linkPlugin,
  createMarkdownPlugin()
];

export default class PostEditor extends React.Component {
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

    // TODO: Is there a way to increase the height of the input area
    // when on focus?
    this.focus = () => this.refs.editor.focus();
  }
  componentDidMount() {
    this.setState({ clientModeOn: true });
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
    this.props.handlePost(contentToSave);
  }
  renderPlaceholder(placeholder, editorState) {
    const contentState = editorState.getCurrentContent();
    const shouldHide = contentState.hasText() || contentState.getBlockMap().first().getType() !== 'unstyled';
    return shouldHide ? '' : placeholder;
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
              <p>{this.props.userDisplayName}</p>
            </div>
          </div>
          <div className="draft-js-editor">
            <Editor
              editorState={this.state.editorState}
              plugins={plugins}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder={this.renderPlaceholder(this.props.placeholder, this.state.editorState)}
              ref={(element) => { this.editor = element; }}
            />
            <InlineToolbar />
          </div>
        </div>
        <div className="card-action">
          <button className="btn" onClick={this.handlePost}>
            Post
          </button>
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

PostEditor.propTypes = {
  handlePost: PropTypes.func.isRequired,
  userDisplayName: PropTypes.string.isRequired,
  userPic: PropTypes.string.isRequired,
  placeholder: PropTypes.string
};
