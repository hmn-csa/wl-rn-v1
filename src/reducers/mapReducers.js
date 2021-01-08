import * as constAction from "../consts/index";

const initialState = {
  uptrail: [],
  checkin: [],
  staff_id: null,
  username: null,
  fetching: null,
  error: null,
}


const cook_checkin = (checkin_data) => {
  let obj = {};
  let checkins = checkin_data.reverse()
  for ( let i=0; i <checkins.length; i++ ) {
    let item = checkins[i]
    item.value = Date.parse(item.runtime)
    const key =`${item.lat}${item.lon}`;
    if (obj[key]===undefined) obj[key] = {
      min: item.value, max: item.value, lat: item.lat, lon: item.lon, runtime: item.runtime
    }
    else if(item.value < obj[key].min) {
      obj[key].min = item.value
      obj[key].runtime =  item.runtime
    }
      
    else if(item.value > obj[key].max)
      obj[key].max = item.value
    obj[key].time = Math.floor((obj[key].max - obj[key].min)/1000/60)% 60
  }
  let result = Object.values(obj)
  result.sort(function(a,b){
    // Turn your strings into dates, and then subtract them
    // to get a value that is either negative, positive, or zero.
    return b.min - a.min;
  });
  result.reverse()
  return result
} 

const mapReducers = (state = initialState, action) => {

  switch(action.type) {

    //case constAction.API_GETCHECKIN_SUCCESS:
    case constAction.API_GETCHECKIN_REQUEST:
      return { ...state, fetching: true, error: null };

    case constAction.API_GETCHECKIN_SUCCESS:
      return { ...state, fetching: false, checkin: cook_checkin(action.content), error: null};

    case constAction.API_GETCHECKIN_FAILURE:
      return { ...state, fetching: false, error: action.content};


    case constAction.SET_MAP_STAFF:

      state = {...state, 
        uptrail: action.content.uptrail, 
        checkin:  cook_checkin(action.content.checkin), //action.content.checkin, 
        staff_id: action.content.staff_id,
        username: action.content.username,
      }
      return state;

    default:
      return state;
  }
};


export default mapReducers;