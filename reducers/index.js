import { combineReducers } from 'redux'
import applsReducers from './applsReducers'
import tokenReducers from './tokenReducers'
import dashReducers from './dashReducers'
import showListReducers from './showListReducers'
import dataReducers from './dataReducers'

const rootReducer  = combineReducers({
    appls: applsReducers,
    data: dataReducers,
    token: tokenReducers,
    dash: dashReducers,
    showlists: showListReducers,
})

export default rootReducer