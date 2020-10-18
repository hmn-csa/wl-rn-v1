import {
  View, Text, Image, Button, StyleSheet
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import Icon from 'react-native-vector-icons/FontAwesome';
import {  actChangeToDo } from "../actions"
import styles from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';

function ShowAppl(props){

  const [isTodo, setTodoContent] = useState(props.noteData.todo_flag)
  const [content, setContent] = useState(props.noteData) 
  const noteID = props.noteData.appl_id

  const handleChangeTodo = () => {
    props.changeTodo(noteID);
    setTodoContent(isTodo === 1 ? 0 : 1)
  }

  const todoColor = isTodo === 1 ? 'tomato' : 'white'
  

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
              onPress={handleChangeTodo}
            />
        </View>

        <View style={[styles.box]}>
            <Ionicons
              name='ios-search' 
              style={showstyles.logo} 
              onPress={handleChangeTodo}
            />
        </View>

        <View style={[styles.box]}>
            <Ionicons
              name='ios-add-circle' 
              style={showstyles.logo} 
              onPress={handleChangeTodo}
            />
        </View>
        <View style={[styles.box]}>
            <Ionicons
              name="ios-brush" 
              style={showstyles.logo} 
              onPress={handleChangeTodo}
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
        <View style={[styles.box]}></View>
      </View>
      
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTodo: appl_id => {
      dispatch(actChangeToDo(appl_id));
    }
  }
}
 


const mapStateToProps = (state, ownProps) => {
  return {
    appls: state.appls
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