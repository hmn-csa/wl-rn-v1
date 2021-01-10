import * as constAction from "../consts/index";


const defaultState = [
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

const treeReducers = (state = defaultState, action) => {

  switch(action.type) {

    case constAction.CAL_TREE_DASH:

      let notMeetCode = ['NFH', 'NIW', 'NLA', 'NAH', 'LEM', 'CGI', 'DIE']

      let appls = Object.values(action.data)
      let totalCase = appls.length
      let initPaidAppls = appls.filter((appl) => {
        return appl.full_paid == 1
      })
      let initNotPaidAppls = appls.filter((appl) => {
        return appl.full_paid == 0
      })

      let initNotfollow = appls.filter((appl) => {
        return appl.followed == 0
      })

      let initNotfollowPaid = initPaidAppls.filter((appl) => {
        return appl.followed == 0
      })

      let initNotfollowNotPaid = initNotPaidAppls.filter((appl) => {
        return appl.followed == 0
      })

      // follow:
      let initFollow = appls.filter((appl) => {
        return appl.followed == 1
      })

      let initFollowPaid = initFollow.filter((appl) => {
        return appl.full_paid == 1
      })
      let initFollowNotPaid = initFollow.filter((appl) => {
        return appl.full_paid == 0
      })
      let initNotPaidMeet = initFollowNotPaid.filter((appl) => {
        return !(notMeetCode.includes(appl.last_action_code) )//appl.lv4 == 'MEET'
      })
      let initMeetPtp = initNotPaidMeet.filter((appl) => {
        return appl.last_action_code === 'PTP'
      })
      let initMeetDif= initNotPaidMeet.filter((appl) => {
        return ['WAS', 'LST'].includes(appl.last_action_code) //appl.lv5 == 'DIF_FINANCE'
      })
      let initMeetRtp= initNotPaidMeet.filter((appl) => {
        return appl.last_action_code == 'RPT' // appl.lv5 == 'RPT'
      })

      let initNotPaidNotMeet = initFollowNotPaid.filter((appl) => {
        return notMeetCode.includes(appl.last_action_code) //appl.lv4 == 'NOT_MEET'
      })

      let initNotMeetFH = initNotPaidNotMeet.filter((appl) => {
        return ['WAS', 'LST', 'CGI', 'DIE'].includes(appl.last_action_code) //appl.lv5 == 'FOUND_HOUSE'
      })

      let initNotMeetNFH = initNotPaidNotMeet.filter((appl) => {
        return ['NFH', 'NIW', 'NLA'].includes(appl.last_action_code) //appl.lv5 == 'NOT_FOUND_HOUSE'
      })

      state = [
        {
          id: 'not-folloed',
          name: 'not-followed',
          case: initNotfollow.length,
          share: (initNotfollow.length/totalCase *100).toFixed(1),
          applIds: initNotfollow, //.map(appl => appl.appl_id),
          children: [
            {
              id: 'paid',
              name: 'paid',
              case: initNotfollowPaid.length,
              share: (initNotfollowPaid.length/totalCase *100).toFixed(1),
              applIds: initNotfollowPaid, //.map(appl => appl.appl_id),
            },
            {
              id: 'not-paid',
              name: 'not-paid',
              case: initNotfollowNotPaid.length,
              share: (initNotfollowNotPaid.length/totalCase *100).toFixed(1),
              applIds: initNotfollowNotPaid, //.map(appl => appl.appl_id),
            },
          ],
        },
        {
          id: 'followed',
          name: 'followed',
          case: initFollow.length,
          share: (initFollow.length/totalCase*100).toFixed(1),
          applIds: initFollow, //.map(appl => appl.appl_id),
          children: [
            {
              id: 'paid',
              name: 'paid',
              case: initFollowPaid.length,
              share: (initFollowPaid.length/totalCase*100).toFixed(1),
              applIds: initFollowPaid, //.map(appl => appl.appl_id),
            },
            {
              id: 'not-paid',
              name: 'not-paid',
              case: initFollowNotPaid.length,
              share: (initFollowNotPaid.length/totalCase*100).toFixed(1),
              applIds: initFollowNotPaid, //.map(appl => appl.appl_id),
              children: [
                {
                  id: 'meet',
                  name: 'meet',
                  case: initNotPaidMeet.length,
                  share: (initNotPaidMeet.length/totalCase*100).toFixed(1),
                  applIds: initNotPaidMeet, //.map(appl => appl.appl_id),
                  children: [
                    {
                      id: 'ptp',
                      name: 'PTP',
                      case: initMeetPtp.length,
                      share: (initMeetPtp.length/totalCase*100).toFixed(1),
                      applIds: initMeetPtp, //.map(appl => appl.appl_id),
                    },
                    {
                      id: 'dif_finance',
                      name: 'DIF_Finance',
                      case: initMeetDif.length,
                      share: (initMeetDif.length/totalCase*100).toFixed(1),
                      applIds: initMeetDif, //.map(appl => appl.appl_id),
                    },
                    {
                      id: 'rtp',
                      name: 'RTP',
                      case: initMeetRtp.length,
                      share: (initMeetRtp.length/totalCase*100).toFixed(1),
                      applIds: initMeetRtp, //.map(appl => appl.appl_id),
                    },
                  ]
                },
                {
                  id: 'not-meet',
                  name: 'not-meet',
                  case: initNotPaidNotMeet.length,
                  share: (initNotPaidNotMeet.length/totalCase*100).toFixed(1),
                  applIds: initNotPaidNotMeet, //.map(appl => appl.appl_id),
                  children: [
                    {
                      id: 'found-house',
                      name: 'found-house',
                      case: initNotMeetFH.length,
                      share: (initNotMeetFH.length/totalCase*100).toFixed(1),
                      applIds: initNotMeetFH, //.map(appl => appl.appl_id),
                    },
                    {
                      id: 'not-found-house',
                      name: 'not-found-house',
                      case: initNotMeetNFH.length,
                      share: (initNotMeetNFH.length/totalCase*100).toFixed(1),
                      applIds: initNotMeetNFH, //.map(appl => appl.appl_id),
                    },
                  ]
                },
              ]
            },
          ],
        },
      ]

      return state;
    
    default:
      return state;
  }
};


export default treeReducers;