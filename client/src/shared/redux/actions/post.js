import fetch from 'isomorphic-fetch';
import { apiLink } from '../../data/apiLinks';

export const GET_POST_BY_ID = 'GET_POST_BY_ID';

export function fetchPostById(postId) {
  return dispatch => {
    return fetch(apiLink.postById(postId), {
      method: 'GET'
    }).then((response) => {
      if(response.length===0) return;
      return response.json().then((data) => { // On a successful response, get the JSON from the response.
        if(data.length===0) return;
        return dispatch({  // Dispatch the action.
          type: GET_POST_BY_ID,
          data: data.pop()
        });
      });
    }).catch((e) => {
      console.log("error", e)
    });
  }
}
