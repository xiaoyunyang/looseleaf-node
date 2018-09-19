import React from 'react';
import Discussion from '../../../components/Discussion/Main';

const Feed = ({ user, projectId }) => (
  <div id="project-page-discussion">
    <h5>Discussion</h5>
    <div className="col s12 m12 l12 user-feed">
    {
      <Discussion
        context='project'
        projectId={projectId.toString()}
        loggedinUser={user}
        newPostPlaceholder='Post an update, question, or clarification to this project.'
        readOnly={!user}
      />
    }
    </div>
  </div>
);

export default Feed;
