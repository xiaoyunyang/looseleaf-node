import React from 'react';
import { dateFormatted } from '../../../lib/helpers';
import appRoute from '../../data/appRoute';

export const Context = ({ context, contextForUser }) => (
  <div className="row post-context">
    <span>Posted under </span>
    <span><a href={context.link}>{context.name}</a></span>
    <div>{contextForUser}</div>
  </div>
);

export const UserInfo = ({ userInfo, editedOn, postCreatedAt }) => (
  <div className="row feed-user">
    <div className="col">
      <img className="circle" src={userInfo.userPic} alt="" />
    </div>
    <div className="col" style={{marginLeft: -18}}>
      <span>
        <a href={appRoute('userProfile', true)(userInfo.username)}>
          {userInfo.userDisplayName}
        </a>
      </span>
      <p style={{paddingLeft: 15, fontSize: 14}}>
        {dateFormatted(postCreatedAt)}
      </p>
    </div>
    {
      editedOn &&
      <div className="col">
        <p className="post-edited-label">· Edited</p>
      </div>
    }
  </div>
);
