import * as constAction from "../consts/index";


const initialState = {
  fetching: false,
  error: null,
  active_staff: null,
  active_infos :{ fc_name: 'họ tên'},
  userFetching: false,
  justFetching: false,
  userError: null,
  uptrails: []
};

const uptrailReducers = (state = initialState, action) => {

  switch(action.type) { 
    case constAction.UPTRAIL_CLEAR:
      return initialState

    // case constAction.SET_ACTIVE_STAFF:
    //   return { ...state, 
    //     active_staff: action.content.staff_id, 
    //     active_infos: action.content.info};

    case constAction.API_UPTRAIL_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_UPTRAIL_SUCCESS:
      const initUptrails = state.uptrails.concat(action.content)
      state = {... state, 
        fetching: false, uptrails: initUptrails, 
        error: null, justFetching: true}
      return state;

    case constAction.API_UPTRAIL_FAILURE:
      state = {... state, fetching: false, error: action.error}
      return state;
    
    case constAction.USER_UPTRAIL_REQUEST:
      return { ...state, userFetching: true, userError: null };

    case constAction.USER_UPTRAIL_SUCCESS:
      // const newUptrails = action.content.concat(state.uptrails);
      const newUptrails = [ action.content, ...state.uptrails]
      state = {... state, userFetching: false, uptrails: newUptrails, userError: null}
      return state;

    case constAction.USER_UPTRAIL_FAILURE:
      state = {... state, userFetching: false, userError: action.error}
      return state;

    default:
      return state;
  }
};


export default uptrailReducers;