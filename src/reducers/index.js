import { combineReducers } from 'redux'

import tokenReducers from './tokenReducers'
import vsfReducers from './vsfReducers'
import showListReducers from './showListReducers'
import dataReducers from './dataReducers'

const rootReducer  = combineReducers({
    token: tokenReducers,
    showlists: showListReducers,
    data: dataReducers,
    vsf: vsfReducers,
})

export default rootReducer