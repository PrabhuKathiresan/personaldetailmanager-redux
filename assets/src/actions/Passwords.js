import api from '../request/api';
import actionType from '../constants/action-types';

function addPassword(url, note) {
  return api.post(url, note).then(res => ({
    type: actionType.ADD_PASSWORD,
    password: res.data.details
  })).catch(err => console.log(err));
}

function deletePassword(url) {
  return api.get(url).then(res => ({
    type: actionType.DELETE_PASSWORD,
    id: res.details
  })).catch(err => console.log(err));
}

function getPasswords(url) {
  return api.get(url).then((res) => {
    let isCompletelyLoaded = false;
    if (res.data.details.length !== 10) {
      isCompletelyLoaded = true;
    }
    const skip = res.data.details.length;
    return {
      type: actionType.GET_PASSWORD,
      passwords: res.data.details,
      isCompletelyLoaded,
      skip
    };
  }).catch(err => console.log(err));
}

module.exports = {
  addPassword,
  deletePassword,
  getPasswords
};