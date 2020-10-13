import React, { useState } from 'react' 
import {
  View, Text, Image, Button, TouchableOpacity
} from 'react-native' 

import { connect } from "react-redux"
import { useNavigation } from '@react-navigation/native';
import { actUpdateShowlist } from "../actions"

import YuaImage from '../assets/yua.jpg'

function Dashboard(props){

  const navigation = useNavigation()
  const listApplIds = props.dash.paidAll.applIds 
  
  const handleChangeShowAppls = () => {
    props.updateShowlist(listApplIds)
    console.log(listApplIds)
    navigation.navigate('ListAppls')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Image source= {YuaImage} style={{ width: 100, height:100}}/>

      <Text  onPress={handleChangeShowAppls} >Dashboard</Text>
      <Text>{props.dash.paidAll.value}</Text>

      <Button
        title={`Go to ListAppls`}
        onPress={handleChangeShowAppls}
      />
  
    </View>
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    appls: state.appls,
    showlists: state.showlists,
    dash: state.dash,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    }
  };
};
 

 
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

