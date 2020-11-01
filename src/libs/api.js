const APP = {
  api: 'http://localhost:3000'
};

import axios from 'axios';

const Axios = axios.create({
  baseURL: APP.api,
	timeout: 60000,
	withCredentials: true,
	crossDomain: true,
  headers: {
		'Content-Type': 'application/json',
	}
});

export const Get = function (url, params) {
	return Axios.get(url, {
		params: params ? params : {}
	}).catch((err) => {
		throw new Error(err);
	});
}

export const Post = function (url, data = {}, params = {}) {
	return Axios.post(url, data, params).catch((err) => {
		throw new Error(err);
	});
};

export const Put = function (url, data = {}, params = {}) {
	return Axios.put(url, data, params).catch((err) => {
		throw new Error(err);
	});
}

export const Delete = function (url, data = {}, params = {}) {
	return Axios.delete(url, {
		data: data,
		params: params
	}).catch((err) => {
		throw new Error(err);
	});
}
