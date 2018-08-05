import React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';

export default class PostEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        editorState: EditorState.createEmpty()
      };
      this.onChange = (editorState) => this.setState({ editorState });
      this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }
    handleKeyCommand(command, editorState) {
      const newState = RichUtils.handleKeyCommand(editorState, command);
      if (newState) {
        this.onChange(newState);
        return 'handled';
      }
      return 'not-handled';
    }
    render() {
      console.log(this.props)
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
          <Editor
            editorState={this.state.editorState}
            handleKeyCommand={this.handleKeyCommand}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />
        </div>
        <div className="card-action">
          <button className="btn">Post</button>
        </div>
      </div>
      );
    }
  }