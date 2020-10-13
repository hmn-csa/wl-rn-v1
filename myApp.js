//file: src/App.js
import React, { useState, useEffect } from "react";

//Kết nối vơi redux
import { connect } from "react-redux";
import { View, StyleSheet} from 'react-native';
//import ContainerShow from './containers/ContainerShow'

import Login from './screens/Login'
import MainApp from './screens/Main'

import { actInitData } from "./actions/index"
import * as consts from "./consts/index"


function MyApp(props) {
  
  console.log(props.token.token)
  if (props.token.token === null || props.token.token === undefined)
    return (
      <View style={styles.container}>
        <Login />
      </View>
    )
  else 
    return (
      <View style={styles.container}>
        <MainApp />
      </View>
  )
}




const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initData: (content) => {
      dispatch(actInitData(content))
    },
  };
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MyApp);