import api from '../request/api';
import actionType from '../constants/action-types';

function addAlarm(url, note) {
  return api.post(url, note).then((res) => {
    console.log(res);
    return {
      type: actionType.ADD_ALARM,
      alarm: res.data.details
    };
  }).catch(err => console.log(err));
}

function deleteAlarm(url) {
  return api.get(url).then((res) => {
    console.log(res);
    return {
      type: actionType.DELETE_ALARM,
      id: res.details
    };
  }).catch(err => console.log(err));
}

function getAlarms(url) {
  return api.get(url).then((res) => {
    let isCompletelyLoaded = false;
    if (res.data.details.length !== 10) {
      isCompletelyLoaded = true;
    }
    const skip = res.data.details.length;
    return {
      type: actionType.GET_ALARM,
      alarms: res.data.details,
      isCompletelyLoaded,
      skip
    };
  }).catch(err => console.log(err));
}

module.exports = {
  addAlarm,
  deleteAlarm,
  getAlarms
};