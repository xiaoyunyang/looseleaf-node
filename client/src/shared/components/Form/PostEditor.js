import React from 'react';
import {
  convertToRaw,
  CompositeDecorator,
  EditorState,
  RichUtils } from 'draft-js';
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

//import linkStyles from './linkStyles.modulecss';

// const linkStyles = {

//   //.input
//   input: {
//       height: "34px",
//       width: "220px",
//       padding: "0 12px",
//       fontSize: "15px",
//       fontFamily: "inherit",
//       backgroundColor: "transparent",
//       border: "none",
//       color: "#ddd"
//       },
//   //.input:focus
//       inputFocus: {
//               outline: "none"
//       },
//   //.input::placeholder
//       inputPlaceholderClass: {
//               color: "#aaa"
//       },
//   //.inputInvalid
//       inputInvalid: {
//               color: "#e65757"
//       },
//   //.link
//       link: {
//               color: "#2996da",
//               textDecoration: "underline"
//       }
//   }

const linkPlugin = createLinkPlugin({
  //theme: linkStyles,
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

// TODO: linkPlugin validation doesn't highlight when the provided input is
// not a valid url. Either disable the validation and accept any input or find
// a way to fix this
// TODO: Is there a way to recognize "cmd + k" or "ctrl + k" to open the url input?
const plugins = [
  inlineToolbarPlugin,
  linkPlugin,
  createMarkdownPlugin()
];

export default class PostEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
    // Functions called by the render function
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);

    // TODO: Is there a way to increase the height of the input area
    // when on focus?
    this.focus = () => this.refs.editor.focus();
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
    console.log(convertToRaw(content));
    this.props.handlePost(this.state.editorState);
  }
  render() {
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
          <div id="draft-js" className="draft-js-editor">
            <Editor
              editorState={this.state.editorState}
              plugins={plugins}
              handleKeyCommand={this.handleKeyCommand}
              onChange={this.onChange}
              placeholder={this.props.placeholder}
              ref={(element) => { this.editor = element; }}
            />
          <InlineToolbar />
          </div>
        </div>
        <div className="card-action">
          <button className="btn" onClick={this.handlePost.bind(this)}>
            Post
          </button>
        </div>
      </div>
    );
  }
}