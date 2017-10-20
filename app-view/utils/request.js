import fetch from 'dva/fetch';
import { message } from 'antd';
import { ERROR_MSG_DURATION } from '../constant';
import Cookies from 'js-cookie';

function isMethod(method) {
	return (/^(GET|POST|OPTIONS|PUT|PATCH|DELETE|TRACE|HEAD)$/.test(method));
}

function parseJSON(response) {
	return response.json();
}

async function checkStatus(response) {
	if (response.status >= 200 && response.status < 300) {
		return response;
	}else if(response.status === 401) {
		// 未登录，可能是session过期
		window.location.replace('/login');
	}
	const { error, detail } = await response.json();
	message.error(error || response.statusText, ERROR_MSG_DURATION);
	detail && console.error(`request ${response.url} failed, detail errors:`, detail);
	throw error || response.statusText;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url
 * @param  {object} [options]
 */
export default function request(url, options) {

	let method = (() => {
		for (let key in options) {
			if (isMethod(key.toUpperCase())) {
				return key.toUpperCase();
			}
		}
	})() || 'GET';

	options = method === 'GET' ?
	{
		method: 'GET'
	}
	: 
	{
		method,
		headers: {
			'Content-Type': 'application/json',
			// csrf攻击防范
			'x-csrf-token': Cookies.get('csrfToken')
		},
		credentials: 'include',
		body: JSON.stringify(options[method.toLowerCase()] || {})
	};

	return fetch(url, options)
		.then(checkStatus)
		.then(parseJSON)
		.then(data => ({ data }))
		.catch(err => ({ err }));
}
