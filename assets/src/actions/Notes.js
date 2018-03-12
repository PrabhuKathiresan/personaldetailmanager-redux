import api from '../request/api';
import actionType from '../constants/action-types';

function addNote(url, note) {
  return api.post(url, note).then((res) => {
    console.log(res);
    return {
      type: actionType.ADD_NOTE,
      note: res.details
    };
  }).catch(err => console.log(err));
}

function deletenote(url) {
  return api.get(url).then((res) => {
    console.log(res);
    return {
      type: actionType.DELETE_NOTE,
      id: res.details
    };
  }).catch(err => console.log(err));
}

function getNotes(url) {
  // return (dispatch => api.get(url).then((res) => {
  //   console.log(res);
  //   dispatch({
  //     type: actionType.GET_NOTE,
  //     notes: res.data.details
  //   });
  // }).catch(err => console.log(err)));
  return api.get(url).then(res => ({
    type: actionType.GET_NOTE,
    notes: res.data.details
  })).catch(err => console.log(err));
}

module.exports = {
  addNote,
  deletenote,
  getNotes
};