
import * as constAction from '../consts'

import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherSetTodo() {
  yield takeLatest(constAction.UPDATE_TODO, workerSetTodo);
}


export function* workerSetTodo(request) {
  
  try {
    let config = {
      method: 'put',
      url: `${constAction.WORKLIST_API}/appls-list/`,
      headers: { 
        'Authorization': `Bearer ${request.token.access}`
      },
      data : {
        'appl_id': request.appl_id
      }
    }
    
    const response = yield call(axios, config);
    const data = response.data;
    

    console.log(data)
    yield put({ type: constAction.API_DATA_SUCCESS, content: data });

    

  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_DATA_FAILURE, error });
  }
}
