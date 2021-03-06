import { AUTH_LOGIN, AUTH_ERROR, AUTH_LOGOUT, AUTH_CHECK } from 'react-admin';

export default (type, params) => {
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('token');
    return Promise.resolve();
  }

  if (type === AUTH_ERROR) {
    const status = params.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem('token');
      return Promise.reject();
    }
    return Promise.resolve();
  }

  if (type === AUTH_CHECK) {
    return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
  }

  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    const request = new Request(`${process.env.REACT_APP_API_URL}/sessions`, {
      method: 'POST',
      body: JSON.stringify({ name: username, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })
    console.log(params)
    return fetch(request)
      .then(response => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(({ token }) => {
        localStorage.setItem('token', token);
      });
  }
  return Promise.resolve();
}