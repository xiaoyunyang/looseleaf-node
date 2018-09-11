// import createMarkdownShortcutsPlugin from 'draft-js-markdown-shortcuts-plugin';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
// import { Separator } from 'draft-js-inline-toolbar-plugin';
import {
  // convertToRaw,
  convertFromRaw,
  EditorState,
} from 'draft-js';
import {
  // ItalicButton,
  // BoldButton,
  // UnderlineButton,
  // CodeButton,
  // UnorderedListButton,
  // OrderedListButton,
  BlockquoteButton,
  CodeBlockButton
} from 'draft-js-buttons';
import createLinkPlugin from 'draft-js-anchor-plugin';
import createMarkdownPlugin from 'draft-js-markdown-plugin';

/*
NOTE:
Basic Setup: https://goo.gl/nwPu5Y
Add Link Examples from Draft-js github: https://goo.gl/3NG89J
Codepen: https://codepen.io/xiaoyunyang/pen/QBBaPq
*/

const linkPlugin = createLinkPlugin({
  placeholder: 'Enter a URL and press enter'
});

export const convertToEditorState = (editorContent) => {
  const content = convertFromRaw(JSON.parse(editorContent));
  const editorState = EditorState.createWithContent(content);
  return editorState;
};



// TODO: Is there a way to recognize "cmd + k" or "ctrl + k" to open the url input?
export const newPlugins = () => {
  const inlineToolbarPlugin = createInlineToolbarPlugin({
    structure: [
      // BoldButton,
      // ItalicButton,
      // UnderlineButton,
      // CodeButton,
      // Separator,
      // UnorderedListButton,
      // OrderedListButton,
      BlockquoteButton,
      CodeBlockButton,
      linkPlugin.LinkButton
    ]
  });
  const plugins = [
    inlineToolbarPlugin,
    linkPlugin,
    createMarkdownPlugin()
  ];
  return { plugins,  inlineToolbarPlugin };
}
