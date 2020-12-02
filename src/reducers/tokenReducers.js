import * as constAction from "../consts/index";


// reducer with initial state
const initialState = {
  fetching: false,
  token: null,
  error: null,
  lat: null,
  lon: null,
  device_brand: null,
  device_os: null,
  device_name: null
};

export function tokenReducers(state = initialState, action) {
  switch (action.type) {

    //case "API_TOKEN_CONFIG":
    //  return { ...state, config: action.config};

    case constAction.API_TOKEN_REQUEST:
      return { ...state, fetching: true, error: null };
    case constAction.API_TOKEN_SUCCESS:
      return { ...state, fetching: false, token: action.content, error: null };
    case constAction.API_TOKEN_FAILURE:
      return { ...state, fetching: false, token: action.content, error: action.error };
    case constAction.TOKEN_REMOVE:
        return initialState;

    case constAction.LOCATION_SET:
      return { 
        ...state, 
        lat: action.content.latitude, 
        lon: action.content.longitude,
        device_brand: action.content.device_brand,
        device_os: action.content.device_os,
        device_name: action.content.device_name
      };

    default:
      return state;
  }
}

export default tokenReducers;