import * as constAction from "../consts/index";

const defaultState = {
  'paidAll':{
    'value': 0,
    'applIds': []
  }
}

const dashReducers = (state = defaultState, action) => {

  switch(action.type) {

    case constAction.INIT_DASHBOARD:

      let initPaidAppls = action.content.filter((appl) => {
        return appl.full_paid == 1
      })

      // PaidMtd
      var initPaidMtd = action.content.filter((appl) => {
        return appl.total_paid > 0.0
      })

      var paidMtdValue = initPaidMtd.reduce(function(sum, appl){
        return sum = sum+appl.total_paid;
      },0);
      

      state = {
        'paidAll': {
          'value': initPaidAppls.length,
          'applIds':  initPaidAppls.map(appl => appl.appl_id)
        }, 
        'paidMtd': {
          'case': initPaidMtd.length,
          'value': paidMtdValue,
          'applIds':  initPaidMtd.map(appl => appl.appl_id)
        }
      }

      console.log(state)
      return state;
    
    default:
        return state;
  }
};


export default dashReducers;