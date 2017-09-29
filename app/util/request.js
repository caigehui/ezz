import fetch from 'dva/fetch';
import { message } from 'antd';
import { ERROR_MSG_DURATION } from '../constant';

const verb = 'HEAD OPTIONS GET PUT POST PATCH DELETE';

function parseJSON(response) {
  return response.json();
}

async function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const { error, detail } = await response.json();
  error && message.error(error, ERROR_MSG_DURATION);
  detail && console.error(`request ${response.url} failed, detail errors:`, detail);
  throw error || response.statusText;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {

  let method = (() => {
    for(let key in options) {
      if(verb.includes(key.toUpperCase())) {
        return key.toUpperCase();
      } 
    }
  })() || 'GET';

  return fetch(url, {
    method,
    headers: {
			'Content-Type': 'application/json'
    },
    body: JSON.stringify(options[method.toLowerCase()] || {})
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(error => ({ error }));
}
