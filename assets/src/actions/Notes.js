import api from '../request/api';
import actionType from '../constants/action-types';

function addNote(url, note) {
  return api.post(url, note).then((res) => {
    console.log(res);
    return {
      type: actionType.ADD_NOTE,
      note: res.data.details
    };
  }).catch(err => console.log(err));
}

function deleteNote(url) {
  return api.get(url).then((res) => {
    console.log(res);
    return {
      type: actionType.DELETE_NOTE,
      id: res.details
    };
  }).catch(err => console.log(err));
}

function getNotes(url) {
  return api.get(url).then((res) => {
    let isCompletelyLoaded = false;
    if (res.data.details.length !== 10) {
      isCompletelyLoaded = true;
    }
    const skip = res.data.details.length;
    return {
      type: actionType.GET_NOTE,
      notes: res.data.details,
      isCompletelyLoaded,
      skip
    };
  }).catch(err => console.log(err));
}

module.exports = {
  addNote,
  deleteNote,
  getNotes
};