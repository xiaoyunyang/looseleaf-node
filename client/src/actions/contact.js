export function submitContactForm(name, email, message) {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_MESSAGES'
    });
    return fetch('/contact', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message
      })
    }).then((response) => {
      if (response.ok) {
        return response.json().then((json) => {
          dispatch({
            type: 'CONTACT_FORM_SUCCESS',
            messages: [json]
          });
        });
      }
      return response.json().then((json) => {
        dispatch({
          type: 'CONTACT_FORM_FAILURE',
          messages: Array.isArray(json) ? json : [json]
        });
      });
    });
  };
}
