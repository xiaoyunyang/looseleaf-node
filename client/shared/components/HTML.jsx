import React from 'react';

const HTML = (props) => {
  return (
    <html lang="en">
      <head>
        <title>All Things Westies</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
        />
        <link rel="stylesheet" href="/assets/style.css" />
      </head>
      <body>
        <div
          id="root-app"
          dangerouslySetInnerHTML={{ __html: props.html }}
        />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.__SERIALIZED_STATE__ =
              JSON.stringify(${props.serverState})
          `
        }}
        />
        <script type="application/javascript" src="/browser.js" />
      </body>
    </html>
  );
};

export default HTML;
