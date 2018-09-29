import React from 'react';

// TODO
// index.css comes from the client/build folder, for server side rendering
// For CRA, index.css comes from the client/asset folder.
// They should be equal.
// Make sure to minify the index.css for production

const HTML = ({meta, html, dataToSerialize, clientAppPath})  => {
  return (
    <html lang="en">
      <head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.desc} />
        <meta name="keywords" content={meta.keywords} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:image:height" content="101" />
        <meta property="og:image:width" content="192" />
        <meta property="og:title" content={meta.tile} />
        <meta property="og:description" content={meta.desc} />
        <meta property="og:url" content={meta.url} />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css"
        />
        <link rel="stylesheet" href="/index.css" />
      </head>
      <body>
        <div
          id="root"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <script dangerouslySetInnerHTML={{
            __html: `window.__PRELOADED_STATE__ =
              ${JSON.stringify(dataToSerialize)}`
          }}
        />
      <script type="application/javascript" src={clientAppPath} />
      </body>
    </html>
  );
};

export default HTML;
