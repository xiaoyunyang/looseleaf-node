import React from 'react';

export default class HTML extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Chapter 2 - Recipes</title>
          <link rel="stylesheet"
                href="https://cdn.jsdelivr.net/semantic-ui/2.2.2/semantic.min.css" />
        </head>
        <body>
          <div id="root"
               dangerouslySetInnerHTML={{__html: this.props.html}}/>
          <script dangerouslySetInnerHTML={{__html: this.props.data}}/>
          <script src="/browser.js"/>
        </body>
      </html>
    );
  }
}
