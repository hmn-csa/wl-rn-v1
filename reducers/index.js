import { combineReducers } from 'redux'

import tokenReducers from './tokenReducers'
import dashReducers from './dashReducers'
import showListReducers from './showListReducers'
import dataReducers from './dataReducers'

const rootReducer  = combineReducers({
    token: tokenReducers,
    showlists: showListReducers,
    data: dataReducers,
})

export default rootReducer