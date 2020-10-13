//https://viblo.asia/p/tim-hieu-ve-react-redux-saga-xay-dung-ung-dung-don-gian-63vKjVAkK2R
// https://viblo.asia/p/redux-saga-gAm5yqLA5db

// Imports: Dependencies
import { all, fork } from 'redux-saga/effects';

// Imports: Redux Sagas
// import { watchIncreaseCounter, watchDecreaseCounter } from './counterSaga';
import { watcherSaga } from  './loginSaga'

// Redux Saga: Root Saga
export function* rootSaga () {
  yield all([
    fork(watcherSaga),
  ]);
};
