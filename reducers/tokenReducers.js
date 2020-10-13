import * as consts from "../consts/index";


// reducer with initial state
const initialState = {
  fetching: false,
  token: null,
  error: null
};


export function tokenReducers(state = initialState, action) {
  switch (action.type) {

    case "API_TOKEN_CONFIG":
      return { ...state, config: action.config};

    case consts.API_TOKEN_REQUEST:

      return { ...state, fetching: true, error: null };
    case consts.API_TOKEN_SUCCESS:

      return { ...state, fetching: false, token: action.content };
    case consts.API_TOKEN_FAILURE:

      return { ...state, fetching: false, token: action.content, error: action.error };
    default:
      return state;
  }
}

export default tokenReducers;