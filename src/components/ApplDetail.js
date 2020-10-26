import {
  View, Text, Image, Button, StyleSheet, Alert
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import { 
  actGetVsfSaga, actSetActiveApplId,
  actTodoViewSuccess, actChangeTodoSaga, actInitDashboard 
} from "../actions"
import { styles, MAIN_COLOR2 } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';

function ApplDetail(props){

  const [isTodo, setTodoContent] = useState(props.todo_flag)
  const [appl_id,setApplContent] = useState(props.appl_id)
  const [cust_name, setNameContent] = useState(props.cust_name) 
  const [total_pay_amount, setPaidContent] = useState(props.total_pay_amount)
  const [reg_address, setAddressContent] = useState(props.reg_address) 

  const handleChangeTodo = () => {
    const todo_new = isTodo === 1 ? 0 : 1
   
    const config = {
      'appl_id': appl_id, 
      'todo_value': todo_new,
      'token_value': props.token.token.access
    }
    props.apiChangeTodo(config)
    setTodoContent(todo_new)
    
  }

  const handleGetVsf = () => {
    
    if (props.vsf.vsfs.map(appl => appl.appl_id).includes(appl_id)){
      props.setActiveVsf(appl_id)
      props.navigation.navigate('Vsf')
      Alert.alert(`exist VSF`)
    }
    else {
      const config = {
        'appl_id': appl_id, 
        'token_value': props.token.token.access
      }
      props.apiGetVsf(config)
      props.navigation.navigate('Vsf')
    }
    
  }

  const handleRemark = () => {
    props.navigation.navigate('Remark')
  }

  const handleSkip = () => {
    props.navigation.navigate('Skip')
  }
  
  
  const todoColor = isTodo === 1 ?  'white' : '#dee2e6'
  const todoIconColor = isTodo === 1 ? MAIN_COLOR2 : 'white' 

  return (
    <View 
      style={{
        backgroundColor: todoColor, 
        padding:5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        }}
      >
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>appl id:</Text>
        </View>
        <View style={[styles.box, {flex:3}]}>
          <Text>{appl_id}</Text>
        </View>
      </View>
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>cust name:</Text>
        </View>
        <View style={[styles.box, {flex:3}]}>
          <Text>{cust_name}</Text>
        </View>
      </View> 
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>paid:</Text>
        </View>
        <View style={[styles.box, {flex:3}]}>
          <Text>{total_pay_amount}</Text>
        </View>
      </View> 

      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>address:</Text>
        </View>
        <View style={[styles.box, {flex:3}]}>
          <Text>{reg_address}</Text>
        </View>
      </View>

  
       {/* BEGIN BUTTONS */}
      <View style={[styles.row]}>
        <View style={[styles.box]}>
            <Ionicons
              name='ios-document' 
              style={showstyles.logo} 
              onPress={handleGetVsf}
            />
        </View>

        <View style={[styles.box]}>
            <Ionicons
              name='ios-search' 
              style={showstyles.logo} 
              onPress={handleSkip}
            />
        </View>

        <View style={[styles.box]}>
            <Ionicons
              name='ios-add-circle' 
              
              style={[showstyles.logo, {color:todoIconColor}]} 
              onPress={handleChangeTodo}
            />
        </View>
        <View style={[styles.box]}>
            <Ionicons
              name="ios-brush" 
              style={showstyles.logo} 
              onPress={handleRemark}
            />
        </View>
        <View style={[styles.box]}>
            <Ionicons
              name="ios-pin"
              style={showstyles.logo} 
              onPress={handleChangeTodo}
            />
        </View>
        <View style={[styles.box]}>
            <Ionicons
              name="ios-call"
              style={showstyles.logo} 
              onPress={handleChangeTodo}
            />
        </View>
        <View style={[styles.box]}></View>
      </View>
      
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    apiChangeTodo: (config) => {
      dispatch(actChangeTodoSaga(config));
    },

    initDashboard: (content) => {
      dispatch(actInitDashboard(content))
    },
    apiGetVsf: (config) => {
      dispatch(actGetVsfSaga(config));
    },
    setActiveVsf: (appl_id) => {
      dispatch(actSetActiveApplId(appl_id));
    },
  }
}
 

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data,
    token: state.token,
    vsf: state.vsf
  }
}


const showstyles = StyleSheet.create({
  logo:{
    fontWeight:"bold",
    fontSize:25,
    paddingRight: 8,
    paddingLeft: 8,
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(ApplDetail);