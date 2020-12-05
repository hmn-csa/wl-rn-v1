import {
  View, Text, Image, ScrollView, Alert, FlatList , StyleSheet, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { Button, Portal, Dialog} from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import { styles } from '../styles'
import axios from "axios"
import { actGetUptrails, actUpdateShowlist } from "../actions/index"

import Uptrail from '../components/Uptrail'

// function Uptrail

function ListUptrail(props) {

  useEffect(() => {
    if (props.uptrails.justFetching === false)
    props.getUptrails({token: props.token})
    else console.log('ddax tai')
  }, []);

  if (props.uptrails.uptrails.length > 0)
  return (
  <ScrollView>

    {props.uptrails.uptrails.map(item =>  
      <Uptrail  
      key={item.runtime} 
      runtime={item.runtime} 
      code={item.code}
      appl_id={item.appl_id}
      pay_amount={item.pay_amount}
      remark={item.remark}
      trust_address={item.trust_address}
      next_visit_time={item.next_visit_time}
      image1={item.image1}
      image2={item.image2}
      image3={item.image3}
      navigation={props.navigation}
      />)
    }
  </ScrollView>
  )
  return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <Text>Loading ... </Text>
      <ActivityIndicator size={100} /> 
    </View>
  )
};

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token.token.access,
    uptrails: state.uptrails,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getUptrails: (config) => {
      dispatch(actGetUptrails(config))
    }, 
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
  }
}




const stylesTrail = StyleSheet.create({
  container:{
    backgroundColor: "#DCDCDC",
  }
});
 
export default connect(mapStateToProps, mapDispatchToProps)(ListUptrail);

