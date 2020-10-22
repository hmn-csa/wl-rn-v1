import React, { useState, useEffect } from 'react' 
import {
  View, Text, Image, Button, TouchableOpacity, StyleSheet, Dimensions, ScrollView
} from 'react-native' 

import { connect } from "react-redux"
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actUpdateShowlist } from "../actions"

import styles from '../styles'


function Dashboard(props){
  
  
  //const navigation = useNavigation()
  const handleShow = list => {
    props.updateShowlist(list)
    //navigation.navigate('ListAppls')
    props.navigation.navigate('Portfolio');
    props.navigation.navigate('ListAppls');
  }
  

  const moneyFormat = amount => {
    return Number(amount)
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/.0/g, '');
  }

  
  return (
    <View style={styles.container}>
      <View style={{flex: 1.618}}> 
        {/* BEGIN Todos */}
        <Text style={styles.header}>Todos</Text>
        <View style={[styles.row, {borderBottomWidth: 1, borderColor: '#fb5b5a'}]}>
          <View style={[styles.box, {borderRightWidth: 1,  borderColor: '#fb5b5a'}]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.todoCase.applIds)}>
              {props.dash.todoCase.case}
            </Text>
            <Text style={styles.indexLabel}>Plan</Text>
          </View>
          <View style={[styles.box]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.todoFollowed.applIds)}>{props.dash.todoFollowed.case}
            </Text>
            <Text style={styles.indexLabel}>Followed</Text>
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={[styles.box, {borderRightWidth: 1,  borderColor: '#fb5b5a'}]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.todoPaid.applIds)}>
              <Ionicons name='ios-checkmark-circle' style={styles.logo} />
              {props.dash.todoPaid.case}
            </Text>
            <Text style={styles.indexLabel}>Paid</Text>
          </View>

          <View style={[styles.box, {borderRightWidth: 1,  borderColor: '#fb5b5a'}]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.todoPtp.applIds)}>
              <Ionicons name='ios-heart' style={styles.logo} />
              {props.dash.todoPtp.case}
            </Text>
            <Text style={styles.indexLabel}>Ptp</Text>
          </View>

          <View style={[styles.box, {borderRightWidth: 1,  borderColor: '#fb5b5a'}]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.todoBptp.applIds)}>
              <Ionicons name='ios-close-circle' style={styles.logo} />
              {props.dash.todoBptp.case}
            </Text>
            <Text style={styles.indexLabel}>B-Ptp</Text>
          </View>

          <View style={[styles.box]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.todoRevisit.applIds)}>
              <Ionicons name='ios-cash' style={styles.logo} />
              {props.dash.todoRevisit.case}
            </Text>
            <Text style={styles.indexLabel}>Re Visit</Text>
          </View>
   
        </View>
        {/* END Todos */}

        {/* BEGIN Paid */}

        <Text style={styles.header}>Collections</Text>

        <View style={[styles.row, {borderBottomWidth: 1, borderColor: '#fb5b5a'}]}>
          
          <View style={[styles.box, {borderRightWidth: 1,  borderColor: '#fb5b5a'}]}>
            <Text 
              style={styles.indexValue} 
              onPress={() => handleShow(props.dash.totalCase.applIds)}>{props.dash.totalCase.case}
            </Text>
            <Text style={styles.indexLabel}>Total Case</Text>
          </View>
          <View style={[styles.box]}>
            <Text 
              style={styles.indexValue} 
              onPress={() => handleShow(props.dash.ptpCase.applIds)}>{props.dash.ptpCase.case}
            </Text>
            <Text style={styles.indexLabel}>PTP</Text>
          </View>
        </View>

        <View style={[styles.row, {borderBottomWidth: 1, borderColor: '#fb5b5a'}]}>
          <View style={[styles.box, {borderRightWidth: 1,  borderColor: '#fb5b5a'}]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.paidMtd.applIds)}>{props.dash.paidMtd.case}
            </Text>
            <Text style={styles.indexLabel}>Paid Mtd</Text>
          </View>
          <View style={[styles.box]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.paidMtd.applIds)}>{moneyFormat(props.dash.paidMtd.value)}
            </Text>
            <Text style={styles.indexLabel}>Collected Mtd</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.box, {borderRightWidth: 1,  borderColor: '#fb5b5a'}]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.paidToday.applIds)}>{props.dash.paidToday.case}
            </Text>
            <Text style={styles.indexLabel}>Paid Today</Text>
          </View>
          <View style={[styles.box]}>
            <Text 
              style={styles.indexValueSmall} 
              onPress={() => handleShow(props.dash.paidToday.applIds)}>{moneyFormat(props.dash.paidToday.value)}
            </Text>
            <Text style={styles.indexLabel}>Collected Today</Text>
          </View>
        </View>
        
        {/* END Paid */}

      </View>
      <View style={{flex:1}}> 
        <ScrollView>

        </ScrollView>
      </View>
    </View>

    
  )
}
const mapStateToProps = (state, ownProps) => {
  return {
    //data: state.data,
    showlists: state.showlists,
    dash: state.data.dash,
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

