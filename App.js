import React from 'react' 
import { View, StyleSheet} from 'react-native';
//https://reactnavigation.org/docs/getting-started

import { Provider } from 'react-redux'
// Imports: Redux Store
import { store } from './src/store/store'

import MyApp from './src/screens'

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
