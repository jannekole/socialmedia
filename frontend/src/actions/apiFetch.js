import fetch from 'isomorphic-fetch';
import { LOG_OUT }from './actions';

export const apiFetch = (dispatch, url, success, error, method, data) => {
  let token = localStorage.getItem('token') || null;
  fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }),
    credentials: 'same-origin'
  }).then((res) => {
    if (!res.ok) {
      console.log('response not ok!');
      if (res.status === 401) {
        dispatch(logOut());
        error("Could not access posts");
      }
      console.log('fin');
      res.json().then(
        (json) => {
          console.log('json ok');
          error(json.errors);
        },
        (err) => {
          console.log('error parsing json');
          error(err);
        }
      );
    } else {
      res.json().then(
        (json) => {
          console.log('json', json);
          success(json);
        },
        (err) => {
          console.log('error parsing json');
          error(err);
        }
      );
    }
  }).catch(err => {
    console.log('catcherr', err);
    error(err);
  });
};
export const logOut = () => {
  localStorage.removeItem('token');
  return {
    type: LOG_OUT
  };
};
