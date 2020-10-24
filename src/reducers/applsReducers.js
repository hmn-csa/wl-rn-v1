import * as constAction from "../consts/index";



const applsReducers = (state = [], action) => {

  switch(action.type) {

    case constAction.API_DATA_REQUEST:
      return { ...state, fetching: true, error: null };
    case constAction.API_DATASUCCESS:
      return { ...state, fetching: false, token: action.content };
    case constAction.API_DATA_FAILURE:
      return { ...state, fetching: false, token: action.content, error: action.error };

    // old
    case constAction.INIT_DATA:
      state = action.content

      return state;

    case constAction.CHANGE_TODO:
      const indexOfEdit= state.findIndex((note) => note.appl_id === action.appl_id)
      if (indexOfEdit !== -1) {
        let status = state[indexOfEdit].todo_flag
        if (status === 0){
          state[indexOfEdit].todo_flag = 1
        } else {
          state[indexOfEdit].todo_flag = 0
        }
      }
      return state;
      
    default:
      return state;
  }
};


export default applsReducers;