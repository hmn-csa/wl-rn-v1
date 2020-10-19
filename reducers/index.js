import { combineReducers } from 'redux'
import applsReducers from './applsReducers'
import tokenReducers from './tokenReducers'
import dashReducers from './dashReducers'
import showListReducers from './showListReducers'

import dataReducers from './dataReducers'

const rootReducer  = combineReducers({
    //appls: applsReducers,
    token: tokenReducers,
    dash: dashReducers,
    showlists: showListReducers,
    data: dataReducers,
})

export default rootReducer