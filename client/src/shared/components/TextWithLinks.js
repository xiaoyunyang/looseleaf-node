import React from 'react';
import { parseUrl, amendHref } from '../../lib/helpers';


const TextWithLinks = ({ content }) => (
  <p>
  {
    parseUrl(content).map((d,i) => {
      return <span key={i}>
        {
          d.strType === 'url' ?
            <a style={{paddingRight: 5}} href={amendHref(d.value)} target="_blank" rel="noopener noreferrer">{d.value}</a>
            :
            <span>{`${d.value} `}</span>
        }
      </span>
    })
  }
  </p>
);

export default TextWithLinks;
