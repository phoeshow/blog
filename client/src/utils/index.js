// post方法
export const poster = (url, requestData, auth = false) => {
  return commonFetcher('post', url, requestData, auth);
};
// get 方法
export const fetcher = (url, requestData, auth = false) => {
  return commonFetcher('get', url, requestData, auth);
};

function commonFetcher(method, url, requestData, auth) {
  return new Promise((resolve, reject) => {
    let fetcher;
    let timeout = false;
    let abortId = setTimeout(() => {
      timeout = true;
    }, 6000);

    if (method === 'get') {
      fetcher = fetch(url + '?' + new URLSearchParams(requestData), {
        method: 'get',
        headers: Object.assign(
          {},
          auth && localStorage.getItem('_token')
            ? {
                Authorization: `Bearer ${localStorage.getItem('_token')}`,
              }
            : null
        ),
      });
    } else if (method === 'post') {
      fetcher = fetch(url, {
        method: 'post',
        body: JSON.stringify(requestData),
        headers: Object.assign(
          {},
          {
            'Content-Type': 'application/json;charset=utf-8',
          },
          auth && localStorage.getItem('_token')
            ? {
                Authorization: `Bearer ${localStorage.getItem('_token')}`,
              }
            : null
        ),
      });
    }

    fetcher
      .then((res) => {
        if (timeout) throw new Error('timeout!');
        return res;
      })
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        clearTimeout(abortId);
        return res;
      })
      .then((res) => {
        const { message, data, success } = res;
        if (success) {
          resolve(data);
        } else {
          return Promise.reject(message);
        }
      })
      .catch((error) => {
        console.error('[fetcher err]', error);
        // toaster.danger(error.message || error);
        clearTimeout(abortId);
        reject(error);
      });
  });
}

function parseJSON(response) {
  const { status } = response;
  if (status === 204 || status === 205) {
    return null;
  }
  return response.json();
}

function checkStatus(response) {
  const { status } = response;
  if (status >= 200 && status < 300) {
    return response;
  }
  if (
    (status === 403 || status === 401) &&
    window.location.pathname !== '/login'
  ) {
    window.location = '/login';
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default {
  poster,
  fetcher,
};
