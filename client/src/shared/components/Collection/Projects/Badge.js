import React from 'react';
import $ from 'jquery';

export const badgeIcon = type => {
  switch (type) {
    case 'creator': return { className: 'fas fa-rocket', backgroundColor: '#ef9a9a' };
    case 'watcher': return { className: 'far fa-grin-stars', backgroundColor: '#ffca28'};
    case 'contributor': return { className: 'fas fa-hands-helping', backgroundColor: '#80cbc4' };
    default: return '';
  }
}

export class Badge extends React.Component {
  componentDidMount() {
    $('.tooltipped').tooltip();
  }
  handleClick() {
    this.props.handleClick();
    $('.tooltipped').tooltip('close');
  }
  render() {
    const { className, backgroundColor } = badgeIcon(this.props.type)
    return (
      <span className="grey-text text-darken-1">
        <a
          className="tooltipped btn-floating project-contributor-badge"
          data-position="top"
          data-delay="50"
          data-tooltip={this.props.tooltipLabel}
          style={{backgroundColor}}
        >
          <i style={this.props.customStyle} className={className}/>
        </a>
      </span>
    );
  }
}
