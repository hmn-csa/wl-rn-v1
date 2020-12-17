import * as constAction from "../consts/index";




const initialState = {
  fetching: false,
  data: null, 
  error: null,
};

const dataReducers = (state = initialState, action) => {

  switch(action.type) {
    // get data 
    case constAction.DATA_CLEAR:
      return initialState;

    case constAction.API_DATA_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_DATA_SUCCESS:
      return { ...state, fetching: false, data: action.content };

    case constAction.API_DATA_FAILURE:
      return { ...state, fetching: false, data: action.content, error: action.error };

    // todo 
    case constAction.CHANGE_TODO:
      state.data[action.content.appl_id] = {...state.data[action.content.appl_id], todo_flag: action.content.todo_flag}
      return state

    case constAction.CHANGE_FOLLOW:
      if (action.content.code != 'PTP') {
        state.data[action.content.appl_id] = {
          ...state.data[action.content.appl_id], 
          followed: 1, 
          last_action_code: action.content.code,
        } 
      } else {
        state.data[action.content.appl_id] = {
          ...state.data[action.content.appl_id], 
          followed: 1, 
          ptp_flag: 1, 
          last_action_code: action.content.code
        } 
      }
      return state

    default:
      return state;

  }
};


export default dataReducers;