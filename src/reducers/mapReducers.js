import * as constAction from "../consts/index";

const initialState = {
  uptrail: [],
  checkin: [],
  staff_id: null,
  username: null
}

const mapReducers = (state = initialState, action) => {

  switch(action.type) {

    case constAction.SET_MAP_STAFF:

      let obj = {};
      let checkins = action.content.checkin.reverse()
      for ( let i=0; i <checkins.length; i++ ) {
        let item = checkins[i]
        item.value = Date.parse(item.runtime)
        const key =`${item.lat}${item.lon}`;
        if (obj[key]===undefined) obj[key] = {min: item.value, max: item.value, lat: item.lat, lon: item.lon, runtime: item.runtime}
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

      //console.log(Object.values(obj))

      state = {...state, 
        uptrail: action.content.uptrail, 
        checkin: result, //action.content.checkin, 
        staff_id: action.content.staff_id,
        username: action.content.username,
      }
      return state;

    default:
      return state;
  }
};


export default mapReducers;