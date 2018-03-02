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
      if (res.status === 401) {
        dispatch(logOut());
        error(["Unauthorized"]);
      }
      else {
        res.json().then(
          (json) => {
            error(json.errors);
          },
          (err) => {
            error(err);
          }
        );
      }
    } else {
      res.json().then(
        (json) => {
          success(json);
        },
        (err) => {
          error(err);
        }
      );
    }
  }).catch(err => {
    error(err);
  });
};
export const logOut = () => {
  localStorage.removeItem('token');
  return {
    type: LOG_OUT
  };
};
