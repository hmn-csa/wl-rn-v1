import {
  View, Text, Image, ScrollView, Alert, FlatList
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import {  actChangeToDo, actChangeTodoSaga, actInitDashboard } from "../actions"
import ShowAppl from '../components/ShowAppl'
import ApplDetail from '../components/ApplDetail'
import { styles } from '../styles'



function ListAppls2(props) {
  if(props.data.data.length > props.showlists.length) {
    return (
      <ScrollView>
        <View style={ styles.container }>
          {
            props.data.data.filter((appl) => {
              return props.showlists.includes(appl.appl_id)
            }).map(appl => 
              { return <ShowAppl noteData = {appl} navigation={props.navigation} key={appl.appl_id}/> }
            )
          }
        </View>
      </ScrollView>
    )
  }
  else {
    return (
      <ScrollView>
        <View style={ styles.container }>
          {
            props.data.data.map(appl => 
              { return <ShowAppl noteData = {appl} navigation={props.navigation} key={appl.appl_id}/> }
            )
          }
        </View>
      </ScrollView>
    )
  }    
}


function ListAppls(props) {

  if(props.data.data.length === props.showlists.length) {
    return (
      <View style={ styles.container }>
        <FlatList 
        data = {props.data.data}
        renderItem={({item}) => 
          <ApplDetail 
            todo_flag = {item.todo_flag}
            appl_id = {item.appl_id} 
            cust_name  = {item.cust_name}
            total_pay_amount  = {item.total_pay_amount}
            reg_address  = {item.reg_address}
            navigation={props.navigation}/>}
        />
      </View>
    )
  }
  else {
    return (
      <View style={ styles.container }>
        <FlatList 
        data = {props.data.data.filter((appl) => {
              return props.showlists.includes(appl.appl_id)
            })}
        renderItem={({item}) => 
          <ApplDetail 
            todo_flag = {item.todo_flag}
            appl_id = {item.appl_id} 
            cust_name  = {item.cust_name}
            total_pay_amount  = {item.total_pay_amount}
            reg_address  = {item.reg_address}
  
            navigation={props.navigation}/>}
        />
      </View>
    )
  }
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

