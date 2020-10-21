import * as constAction from "../consts/index";

const defaultState = {
  'todoCase':{
    'case': 0,
    'applIds': []
  },
  'todoFollowed':{
    'case': 0,
    'applIds': []
  },
  'todoPaid':{
    'case': 0,
    'applIds': []
  },
  'todoPtp':{
    'case': 0,
    'applIds': []
  },
  'todoBptp':{
    'case': 0,
    'applIds': []
  },
  'todoRevisit':{
    'case': 0,
    'applIds': []
  },
  'totalCase':{
    'case': 0,
    'applIds': []
  },
  'paidAll':{
    'value': 0,
    'applIds': []
  },
  'paidMtd': {
    'case': 0,
    'value': 0,
    'applIds': []
  },
  'ptpCase': {
    'value': 0,
    'applIds': []
  },
  'paidToday': {
    'case': 0,
    'value': 0,
    'applIds': []
  }
}

const dashReducers = (state = defaultState, action) => {

  switch(action.type) {

    case constAction.INIT_DASHBOARD:

      let appls = action.content

      // ======== todos ==========
      let todoAppls = appls.filter((appl) => {
        return appl.todo_flag == 1
      })

      let todoFollowedAppls = todoAppls.filter((appl) => {
        return appl.followed == 1 
      })
      
      let todoPaidAppls = todoAppls.filter((appl) => {
        return appl.total_pay_amount > 0
      })

      let todoPtpAppls = todoAppls.filter((appl) => {
        return appl.ptp_flag > 0
      })

      // ======== paids ==========
      let initPaidAppls = appls.filter((appl) => {
        return appl.full_paid == 1
      })

      let initPaidMtd = appls.filter((appl) => {
        return appl.total_pay_amount > 0
      })

      let paidMtdValue = initPaidMtd.map(function (appl){
        return appl.total_pay_amount
      }).reduce(function(sum, pay){
        return sum = sum+pay;
      },0);

      let initPaidTodayAppls = appls.filter((appl) => {
        return appl.paid_today == 1
      })

      let paidTodayValue = initPaidTodayAppls.map((appl) => {
        return appl.paid_today_amt 
      }).reduce(function(sum, pay){
        return sum = sum+pay;
      },0);
      
      // ptp_lag
      let initPtp = appls.filter((appl) => {
        return appl.ptp_flag > 0
      })
      
      state = {
        ...state, 
        'todoCase':{
          'case': todoAppls.length,
          'applIds': todoAppls.map(appl => appl.appl_id)
        },
        'todoFollowed': {
          'case': todoFollowedAppls.length,
          'applIds': todoFollowedAppls.map(appl => appl.appl_id)
        },
        'todoPaid': {
          'case': todoPaidAppls.length,
          'applIds': todoPaidAppls.map(appl => appl.appl_id)
        },
        'todoPtp': {
          'case': todoPtpAppls.length,
          'applIds': todoPtpAppls.map(appl => appl.appl_id)
        },
        'totalCase':{
          'case': appls.length,
          'applIds': appls.map(appl => appl.appl_id)
        },
        'paidAll': {
          'value': initPaidAppls.length,
          'applIds':  initPaidAppls.map(appl => appl.appl_id)
        }, 
        'paidMtd': {
          'case': initPaidMtd.length,
          'value': paidMtdValue,
          'applIds':  initPaidMtd.map(appl => appl.appl_id)
        },
        'ptpCase':{
          'case': initPtp.length,
          'applIds': initPtp.map(appl => appl.appl_id)
        },
        'paidToday': {
          'case': initPaidTodayAppls.length,
          'value': paidTodayValue,
          'applIds':  initPaidTodayAppls.map(appl => appl.appl_id)
        },
      }

      console.log(state)
      return state;
    
    default:
        return state;
  }
};


export default dashReducers;