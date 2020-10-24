import * as constAction from "../consts/index";

const showListReducers = (state = ["20150111-100165-0001"], action) => {

  switch(action.type) {
    case constAction.UPDATE_SHOWLIST:
      state =  action.content
      return state;
      
    default:
      return state;
  }
};


export default showListReducers;