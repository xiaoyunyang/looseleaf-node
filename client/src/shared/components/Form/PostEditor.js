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
// import linkStyles from './linkStyles.css';
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


// NOTE: Markdown plugin and linkPlugin are incompatible. linkPlugin
// uses this.state.url to keep track of entity url whereas Markdown
// shortcuts uses the this.state.href. The order in which the plugins
// are declared in the array below matters. The earlier plugin in the
// array has precedence over the thing later in the array.
// TODO: We can still create a link using the markdown shortcut but the
// created link doesn't work. Either disable that capability in the markdown
// shortcuts plugin or make the two plugins both use href or url.
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
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link,
      }
    ]);
    this.state = {
      editorState: EditorState.createEmpty(decorator),
      showURLInput: false,
      url: ''
    };
    // Functions called by the render function
    this.onChange = (editorState) => this.setState({ editorState });
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.onItalicClick = this.onItalicClick.bind(this);
    this.onBoldClick = this.onBoldClick.bind(this);
    this.onUnderlineClick = this.onUnderlineClick.bind(this);

    // TODO: Is there a way to increase the height of the input area
    // when on focus?
    this.focus = () => this.refs.editor.focus();
    this.promptForLink = this.promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({url: e.target.value});
    this.confirmLink = this.confirmLink.bind(this);
    this.onLinkInputKeyDown = this.onLinkInputKeyDown.bind(this);
    this.removeLink = this.removeLink.bind(this);
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
  onItalicClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'))
  }
  onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'))
  }
  onUnderlineClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }
  promptForLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = '';
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      const callback = () => setTimeout(() => this.refs.url.focus(), 0);
      this.setState({
        showURLInput: true,
        url: url,
        callback
      });
    }
  }
  confirmLink(e) {
    e.preventDefault();
    const {editorState, url} = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      {url: url}
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    const callback = () => setTimeout(() => this.refs.editor.focus(), 0);
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        newEditorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      url: '',
      callback
    });
  }
  // This lets us confirm by pressing enter
  onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  }
  removeLink(e) {
    e.preventDefault();
    const {editorState} = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    }
  }
  renderUrlInput() {
    return (
      this.state.showURLInput ?
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.url}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <button onMouseDown={this.confirmLink}>
            Confirm
          </button>
        </div> : null
    );
  }
  // TODO: Below function for testing only. Remove for production.
  renderBtns() {
    return (
      <div>
        <button onClick={this.onItalicClick}>Italic</button>
        <button onClick={this.onBoldClick}>Bold</button>
        <button onClick={this.onUnderlineClick}>Underline</button>
        <button
          onClick={this.promptForLink}>
          Add Link
        </button>
        <button onClick={this.removeLink}>
          Remove Link
        </button>
        <input placeholder="Placeholder"type="text"/>

        {this.renderUrlInput()}
      </div>
    );
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
            {
              // this.renderBtns()
            }
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

// Strategy
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
const Link = (props) => {
  const {url} = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};

const styles = {
  root: {
    fontFamily: '\'Georgia\', serif',
    padding: 20,
    width: 600,
  },
  buttons: {
    marginBottom: 10,
  },
  urlInputContainer: {
    marginBottom: 10,
  },
  urlInput: {
    fontFamily: '\'Georgia\', serif',
    marginRight: 10,
    padding: 3,
  },
  editor: {
    border: '1px solid #ccc',
    cursor: 'text',
    minHeight: 80,
    padding: 10,
  },
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
  link: {
    color: '#3b5998',
    textDecoration: 'underline',
  },
};
