import { combineReducers } from 'redux'
import applsReducers from './applsReducers'
import tokenReducers from './tokenReducers'
import dashReducers from './dashReducers'
import showListReducers from './showListReducers'

const rootReducer  = combineReducers({
    appls: applsReducers,
    token: tokenReducers,
    dash: dashReducers,
    showlists: showListReducers,
})

export default rootReducer