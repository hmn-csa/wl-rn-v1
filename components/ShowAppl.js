import {
  View, Text, Image, Button
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import {  actChangeToDo } from "../actions"


// import YuaImage from '../assets/yua.jpg'
// <Image source= {YuaImage} style={{ width: 100, height:100}}/>
function ShowAppl(props){

  const [isTodo, setTodoContent] = useState(props.noteData.todo_flag) 
  const [content, setContent] = useState(props.noteData) 
  const noteID = props.noteData.appl_id

  const handleChangeTodo = () => {
    props.changeTodo(noteID);
    setTodoContent(isTodo === 1 ? 0 : 1)
  }

  return (
    <View style={{  justifyContent: 'center', alignItems: 'center' }}>
      <Text>{noteID}</Text>
      
      <Text>{content.cust_name}</Text>
      <Text>{content.todo_flag}</Text>
      <Button 
        title='todo'
        onPress={handleChangeTodo}
      />
    </View>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeTodo: appl_id => {
      dispatch(actChangeToDo(appl_id));
    }
  };
};
 

const mapStateToProps = (state, ownProps) => {
  return {
    appls: state.appls
  };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(ShowAppl);