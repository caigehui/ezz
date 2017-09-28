import fetch from 'dva/fetch';
import { message } from 'antd';
import { ERROR_MSG_DURATION } from '../constant';

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
  return fetch(url, {
    method: options.method || 'GET',
    headers: {
			'Content-Type': 'application/json'
    },
    body: JSON.stringify(options.data || {})
  })
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(error => ({ error }));
}
