import React from 'react' 
import { View, StyleSheet} from 'react-native';
//https://reactnavigation.org/docs/getting-started

import Login from './screens/Login'
import MyApp from './myApp'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux"
import { createLogger } from 'redux-logger';
import rootReducer from "./reducers/index"
import createSagaMiddleware from 'redux-saga'


// Imports: Redux Store
import { store } from './store/store';



/*
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  applyMiddleware(
    sagaMiddleware,
    createLogger(),
  ),
)
sagaMiddleware.run(rootSaga)
*/

//const store = createStore(rootReducers)

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <MyApp />
      </View>
    </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});