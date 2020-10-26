import {
  View, Text, Image, ScrollView, Alert, FlatList
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import {  actChangeToDo, actChangeTodoSaga, actInitDashboard } from "../actions"
import ShowAppl from '../components/ShowAppl'
import ContractDetail from '../components/ContractDetail'
import { styles } from '../styles'



function ListAppls(props) {

  
  return (
    <View style={ styles.container }>
      <FlatList 
      data = {props.showlists}
      renderItem={appl_id => 
        <ContractDetail contractId = {appl_id}

          navigation={props.navigation}/>}
      />
    </View>
    )
  
}


const mapStateToProps = (state, ownProps) => {
  return {
    data: state.data,
    showlists: state.showlists
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initDashboard: (content) => {
      dispatch(actInitDashboard(content))
    },
  }
}

 
export default connect(mapStateToProps, mapDispatchToProps)(ListAppls);

