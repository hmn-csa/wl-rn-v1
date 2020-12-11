import * as constAction from "../consts/index";


const initialState = {
  staffs: [{key: 'user', paidamt:0, paidcase:0, case:0, visited:0}],
  status: []
}

const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    rv[x[key]] = rv[x[key]] || {paidamt:0, visited:0, case:0, paidcase:0, todayamt:0, todaycase:0} ;
    rv  [x[key]] = {...rv[x[key]], 
      paidamt:rv[x[key]].paidamt+x.total_pay_amount,
      paidcase:rv[x[key]].paidcase +x.full_paid,
      todayamt:rv[x[key]].todayamt+x.paid_today_amt,
      todaycase:rv[x[key]].todaycase +x.paid_today,
      // case:rv[x[key]].case+1,
      visited:rv[x[key]].visited +x.followed,
    };
    return rv;
  }, {});
};

// Groupby return array before Object
const groupByArray = (xs, key) => {
  const groupJson =  groupBy(xs, key)
  const groupArray = []
  for (const [key, value] of Object.entries(groupJson)) {
    groupArray.push({...value, key: key})
  }
  return groupArray;
}


const managerReducers = (state = initialState, action) => {

  switch(action.type) {

    case constAction.SET_MANAGER_DASH:

      let rootInfo =  Object.values(action.data.info);
      // let rootAppls = Object.values(action.data.data);
      // let rootStaff = groupBy(rootAppls, 'staff_id');
      // const rootStatus = []
      // for (let i = 0; i < rootInfo.length; i++) {
      //   let item = rootInfo[i]
      //   rootStatus.push({...item, content: rootStaff[item.staff_id]})
      // } 

      // state = {...state, status: rootStatus}
      state = {...state, status: rootInfo}
      return state;
    // get data 

    case constAction.CAL_MANAGER_DASH:

      let appls = Object.values(action.data.data)
 
      let staffData = groupBy(appls, 'staff_id');
      const newState = []

      for (let i = 0; i < state.status.length; i++) {
        let item = state.status[i]
        newState.push({...item, content: staffData[item.staff_id]})
      } 

      let infos = Object.values(action.data.info)
      for (let j = 0; j < infos.length; j++) {
        // let item = infos[j]
        let index = newState.findIndex(p => p.staff_id == infos[j].staff_id)
        
        newState[index] = {...newState[index], 
          checkin: infos[j].checkin, 
          uptrail: infos[j].uptrail
        }
      } 


      // for (const item of state) {
      //   newState.push({...item, data: staffData[item.staff_id]})
      // }
      // ======== todos ==========
      state = {
        ...state, 
        status: newState,
      }

      return state;

    default:
      return state;

  }
};


export default managerReducers;