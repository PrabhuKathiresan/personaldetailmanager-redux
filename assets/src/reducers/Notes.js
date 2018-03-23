import _ from 'lodash';
import * as ActionType from '../constants/action-types';

const initialState = {
  data: [],
  limit: 10,
  skip: 0,
  isCompletelyLoaded: false,
  initiallyLoaded: false,
  isFetching: false,
  selectedDocumentCount: 0
};
let index;
let tempObj;
let tempVar;
let tempArr;
function notes(state = initialState, action) {
  switch (action.type) {
    case ActionType.ADD_NOTE:
      return Object.assign({}, state, {
        data: [
          Object.assign({}, action.note),
          ...state.data
        ]
      });
    case ActionType.UPDATE_NOTE:
      index = _.findIndex(state.data, { _id: action.note._id });
      tempObj = _.concat([], state.data);
      tempObj[index] = action.note;
      return Object.assign({}, state, {
        data: _.concat([], tempObj)
      });
    case ActionType.SELECT_NOTE:
      index = _.findIndex(state.data, { _id: action.note._id });
      tempObj = _.concat([], state.data);
      tempObj[index].selected = action.data;
      if (action.data) {
        tempVar = state.selectedDocumentCount + 1;
      } else {
        tempVar = state.selectedDocumentCount - 1;
      }
      return Object.assign({}, state, {
        data: _.concat([], tempObj)
      }, {
        selectedDocumentCount: tempVar
      });
    case ActionType.DESELECT_NOTE:
      tempArr = [];
      tempObj = _.concat([], state.data);
      _.forEach(tempObj, (obj) => {
        tempVar = Object.assign({}, obj);
        tempVar.selected = false;
        tempArr.push(tempVar);
      });
      return Object.assign({}, state, {
        data: _.concat([], tempArr)
      }, {
        selectedDocumentCount: 0
      });
    case ActionType.DELETE_NOTE:
      _.remove(state.data, {
        _id: action.id
      });
      tempObj = Object.assign({}, state, {
        data: state.data
      });
      return tempObj;
    case ActionType.GET_NOTE:
      return Object.assign(
        {}, state,
        {
          data: _.concat(...state.data, action.notes)
        }, { initiallyLoaded: true },
        { isCompletelyLoaded: action.isCompletelyLoaded },
        { skip: state.skip + action.skip },
        { isFetching: false }
      );
    case ActionType.FETCHING_NOTES:
      return Object.assign({}, state, {
        isFetching: action.data
      });
    default:
      return state;
  }
}

export default notes;