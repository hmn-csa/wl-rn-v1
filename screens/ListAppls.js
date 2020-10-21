import {
  View, Text, Image, ScrollView
} from 'react-native'

import React, { useState, useEffect} from "react"
import { connect } from "react-redux"

import {  actChangeToDo, actChangeTodoSaga, actInitDashboard } from "../actions"
import ShowAppl from '../components/ShowAppl'
import styles from '../styles'



function ListAppls(props) {

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
  );
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

