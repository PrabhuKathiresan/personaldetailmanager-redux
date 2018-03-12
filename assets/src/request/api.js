import axios from 'axios';

function post(path, data) {
  return axios.post(path, data);
}

function get(path) {
  return axios.get(path);
}

module.exports = {
  post,
  get
};