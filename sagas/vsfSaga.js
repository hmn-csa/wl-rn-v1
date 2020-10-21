
import * as constAction from '../consts'
import { AsyncStorage } from 'react-native';
import { takeLatest, call, put, take } from "redux-saga/effects";
import axios from "axios";



// watcher saga: watches for actions dispatched to the store, starts worker saga
export function* watcherGetVsf() {
  yield takeLatest(constAction.API_VSF_REQUEST, workerGetVsf);
}


export function* workerGetVsf(request) {
  
  try {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/visit-form/`,
      headers: { 
        'Authorization': `Bearer ${request.config.token_value}`
      },
      data : {
        'appl_id': request.config.appl_id,
      }
    }

    console.log(config)
    const response = yield call(axios, config);
    const data = response.data;
    
    console.log(data)
    
    yield put({ type: constAction.API_VSF_SUCCESS, content: data });

    //yield call(workerSaveStorage);
  
  } catch (error) {
    console.log(error)
    // dispatch a failure action to the store with the error
    yield put({ type: constAction.API_VSF_FAILURE, error });
  }
}


function* workerSaveStorage() {
  let UID123_object = {
    name: 'Chris',
    age: 30,
    traits: { hair: 'brown', eyes: 'brown' }
  };
  // You only need to define what will be added or updated
  let UID123_delta = {
    age: 31,
    traits: { eyes: 'blue', shoe_size: 10 }
  };
  
  AsyncStorage.setItem(
    'UID123',
    JSON.stringify(UID123_object),
    () => {
      AsyncStorage.mergeItem(
        'UID123',
        JSON.stringify(UID123_delta),
        () => {
          AsyncStorage.getItem('UID123', (err, result) => {
            console.log(result);
          });
        }
      );
    }
  );
  console.log('save store done')
}