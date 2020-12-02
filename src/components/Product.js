import {
  View, Text, Image, Button, StyleSheet, Alert, Linking
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import { 
  actGetVsfSaga, actSetActiveApplId,
  actTodoViewSuccess, actChangeTodoSaga, actInitDashboard 
} from "../actions"
import { styles, MAIN_COLOR2 } from '../styles'
import Ionicons from 'react-native-vector-icons/Ionicons';


function Product(props){

  const [contractId, setcontractId] = useState(props.contractId.item)
  const [content, setContent] = useState(props.data[contractId])
  return (
    <View 
      style={{
        backgroundColor: todoColor, 
        padding:5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        }}
      >
      <Text>{content.appl_id}</Text>
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
    data: state.data.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(Product);