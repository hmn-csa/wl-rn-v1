import * as constAction from "../consts/index";


const initialTodo = {
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
}


const defaultTree = [
  {
    id: 'not-folloed',
    name: 'not-followed',
    case: 0,
    share: 0,
    applIds: [],
    children: [
      {
        id: 'paid',
        name: 'paid',
        case: 0,
        share: 0,
        applIds: [],
      },
      {
        id: 'not-paid',
        name: 'not-paid',
        case: 0,
        share: 0,
        applIds: [],
      },
    ],
  },
  {
    id: 'followed',
    name: 'followed',
    case: 0,
    share: 0,
    applIds: [],
    children: [
      {
        id: 'paid',
        name: 'paid',
        case: 0,
        paid: 0,
        applIds: [],
      },
      {
        id: 'not-paid',
        name: 'not-paid',
        case: 0,
        share: 0,
        applIds: [],
        children: [
          {
            id: 'meet',
            name: 'meet',
            case: 0,
            share: 0,
            applIds: [],
            children: [
              {
                id: 'ptp',
                name: 'PTP',
                case: 0,
                share: 0,
                applIds: [],
              },
              {
                id: 'dif_finance',
                name: 'DIF_Finance',
                case: 0,
                share: 0,
                applIds: [],
              },
              {
                id: 'rtp',
                name: 'RTP',
                case: 0,
                share: 0,
                applIds: [],
              },
            ]
          },
          {
            id: 'not-meet',
            name: 'not-meet',
            case: 0,
            share: 0,
            applIds: [],
            children: [
              {
                id: 'found-house',
                name: 'found-house',
                case: 0,
                share: 0,
                applIds: [],
              },
              {
                id: 'not-found-house',
                name: 'not-found-house',
                case: 0,
                share: 0,
                applIds: [],
              },
            ]
          },
        ]
      },
    ],
  },
]

const todoReducers = (state = initialState, action) => {

  switch(action.type) {
    // get data 
    case constAction.CAL_TODO_DASH:
      let appls = Object.values(action.data)
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
        'todoBptp':{
          'case': 0,
          'applIds': []
        },
        'todoRevisit':{
          'case': 0,
          'applIds': []
        },
      }
      return state;

    default:
      return state;

  }
};


export default todoReducers;