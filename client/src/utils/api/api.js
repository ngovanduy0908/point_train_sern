import axios from "axios";

const baseURL = process.env.REACT_APP_DOMAIN;
const instance = axios.create({
  baseURL: baseURL,
  mode: "no-cors",
});

export const getHeader = async (customHeaders) => {
  const header = customHeaders || {};

  return { ...header };
};

async function get(url, params, customHeaders, responseType) {
  return instance.get(url, { withCredentials: true });
}

async function post(url, data, customHeaders) {
  return instance.post(url, { ...data }, { withCredentials: true });
}

async function postForm(url, data, customHeaders) {
  return instance.post(url, data, { withCredentials: true });
}

async function put(url, data, customHeaders) {
  return instance.put(url, { ...data }, { withCredentials: true });
}

async function remove(url, data, customHeaders) {
  return instance.delete(url, { data: { ...data }, withCredentials: true });
}

const ApiUtils = { get, post, put, postForm, remove };
export default ApiUtils;
