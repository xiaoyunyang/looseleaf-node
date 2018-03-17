import React from 'react';

/*
 * HTML
 * caller: renderView.jsx (server side render)
 */
export default class HTML extends React.Component {
  render() {
    return (
      <html>
        <head>
          <title>Chapter 2 - Recipes</title>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
          />
        </head>
        <body>
          <div
            id="root"
            dangerouslySetInnerHTML={{ __html: this.props.html }}
          />
          <script dangerouslySetInnerHTML={{ __html: this.props.data }} />
          <script src="/recipe.bundle.js" />
        </body>
      </html>
    );
  }
}
