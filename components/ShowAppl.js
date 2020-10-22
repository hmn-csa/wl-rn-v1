import {
  View, Text, Image, Button, StyleSheet
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import { useNavigation } from '@react-navigation/native';
import { 
  actGetVsfSaga, actSetActiveApplId,
  actTodoViewSuccess, actChangeTodoSaga, actInitDashboard 
} from "../actions"
import { styles, MAIN_COLOR2 } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';

function ShowAppl(props){

  const [isTodo, setTodoContent] = useState(props.noteData.todo_flag)
  const [content, setContent] = useState(props.noteData) 

  //const [token, setToken] = useState(props.token)

  //console.log(token.token.access)


  const handleChangeTodo = () => {
    const todo_new = isTodo === 1 ? 0 : 1
   
    const config = {
      'appl_id': content.appl_id, 
      'todo_value': todo_new,
      'token_value': props.token.token.access
    }
    props.apiChangeTodo(config)
    setTodoContent(todo_new)
    
  }

  const handleGetVsf = () => {
    if (props.vsf.vsfs.map(appl => appl.appl_id).includes(content.appl_id)){
      props.setActiveVsf(content.appl_id)
      props.navigation.navigate('Vsf')
    }
    else {
      const config = {
        'appl_id': content.appl_id, 
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
          <Text>appl_id:</Text>
        </View>
        <View style={[styles.box, {flex:3}]}>
          <Text>{content.appl_id}</Text>
        </View>
      </View>
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>custname:</Text>
        </View>
        <View style={[styles.box, {flex:3}]}>
          <Text>{content.cust_name}</Text>
        </View>
      </View>
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>address:</Text>
        </View>
        <View style={[styles.box, {flex:3}]}>
          <Text>{content.reg_address}</Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowAppl);