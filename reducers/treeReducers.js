import * as constAction from "../consts/index";

const defaultState0 = {
  'tree': [
    {'columns_name':'lv2', 'columns_value': ['FOLLOWED', 'NOT_FOLLOWED']},
    {'columns_name':'lv3', 'columns_value': ['PAID', 'NOT_PAID']},
    {'columns_name':'lv4', 'columns_value': ['MEET', 'NOT_MEET']},
    {'columns_name':'lv5', 'columns_value': ['DIF_FINANCE', 'FOUND_HOUSE','NOT_FOUND_HOUSE', 'PTP']},
  ],
  'tree_view': null
}

const defaultState = [
  {'NOT_FOLLOWED': ['PAID', 'NOT_PAID']}, 
  {'FOLLOWED': ['PAID', 'NOT_PAID']}
]



const treeReducers = (state = defaultState, action) => {

  switch(action.type) {

    case constAction.INIT_TREE:

      

      let appls = action.content

      let tree0 = appls.filter((appl) => {
        return appl.todo_flag == 1
      })

      return state;
    
    default:

      return state;
  }
};


export default treeReducers;