import React, { useState, useEffect } from 'react' 
import {
  View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ScrollView
} from 'react-native' 

import { Button } from 'react-native-paper';

import { connect } from "react-redux"
import Ionicons from 'react-native-vector-icons/Ionicons';
import { actUpdateShowlist, actSetTodoShowlist} from "../actions"

import{ styles } from '../styles'
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';



function Dashboard(props){
  //const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const handleShowTodo = () => {

    const list_todo = Object.values(props.data).filter(appl => appl.todo_flag == 1 ).map(a => a.appl_id); 
    props.navigation.navigate('Portfolio',  { screen: 'List' });
    props.updateShowlist(list_todo)
    console.log('show list:', list_todo)
    //navigation.navigate('ListAppls')
   //props.navigation.navigate('List');
  }

  const handleShow = (list, isTodo) => {
    props.navigation.navigate('Portfolio',  { screen: 'List' })
    props.updateShowlist(list)
    props.setTodoShowlist(isTodo)
  }
  
  const moneyFormat = n => {
    //return  n.toLocaleString().split(".")[0]
    const  money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
    return money.substring(0, money.length -2)
  }

  /*
  const moneyFormat = amount => {
    return Number(amount)
      .toFixed(1)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/.0/g, '');
  }
  */

  return (
    <View style={styles.container}>
      <View style={{flex: 1.618}}> 
        {/* BEGIN Todos */}
        <Text style={styles.header}>Todos</Text>
        <View style={[styles.row, {borderBottomWidth: 1, borderColor: '#dee2e6'}]}>
          <TouchableOpacity 
          activeOpacity={0.5}
          style={[styles.box, {borderRightWidth: 1,  borderColor: '#dee2e6'}]}
          onPress={() => handleShow(props.todoCal.todoCase.applIds, true)}>
            <Text 
              style={styles.indexValueSmall} 
              >
              {props.todoCal.todoCase.case}
            </Text>
            <Text style={styles.indexLabel}>Plan</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.box]}
          onPress={() => handleShow(props.todoCal.todoFollowed.applIds , true)}>
            <Text 
              style={styles.indexValueSmall} 
              >{props.todoCal.todoFollowed.case}
            </Text>
            <Text style={styles.indexLabel}>Followed</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row]}>
          <TouchableOpacity 
          style={[styles.box, {borderRightWidth: 1,  borderColor: '#dee2e6'}]}
          onPress={() => handleShow(props.todoCal.todoPaid.applIds, true)}>
            <Text 
              style={styles.indexValueSmall} 
              >
              <Ionicons name='ios-checkmark-circle' style={styles.logo} />
              {props.todoCal.todoPaid.case}
            </Text>
            <Text style={styles.indexLabel}>Paid</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.box, {borderRightWidth: 1,  borderColor: '#dee2e6'}]}
          onPress={() => handleShow(props.todoCal.todoPtp.applIds, true)}>
            <Text 
              style={styles.indexValueSmall} 
              >
              <Ionicons name='ios-heart' style={styles.logo} />
              {props.todoCal.todoPtp.case}
            </Text>
            <Text style={styles.indexLabel}>Ptp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.box, {borderRightWidth: 1,  borderColor: '#dee2e6'}]}
          onPress={() => handleShow(props.todoCal.todoBptp.applIds, true)}>
            <Text 
              style={styles.indexValueSmall} 
              >
              <Ionicons name='ios-close-circle' style={styles.logo} />
              {props.todoCal.todoBptp.case}
            </Text>
            <Text style={styles.indexLabel}>B-Ptp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.box]} 
          onPress={() => handleShow(props.todoCal.todoRevisit.applIds, true)}>
            <Text 
              style={styles.indexValueSmall} 
              >
              <Ionicons name='ios-cash' style={styles.logo} />
              {props.todoCal.todoRevisit.case}
            </Text>
            <Text style={styles.indexLabel}>Re Visit</Text>
          </TouchableOpacity>
   
        </View>
        {/* END Todos */}

        {/* BEGIN Paid */}

        <Text style={styles.header}>Collections</Text>

        <View style={[styles.row, {borderBottomWidth: 1, borderColor: '#dee2e6'}]}>
          <TouchableOpacity 
          style={[styles.box, {borderRightWidth: 1,  borderColor: '#dee2e6'}]}
          onPress={() => handleShow(props.totalCal.totalCase.applIds, false)}>
            <Text 
              style={styles.indexValue} 
              >{props.totalCal.totalCase.case}
            </Text>
            <Text style={styles.indexLabel}>Total Case</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.box]} 
          onPress={() => handleShow(props.totalCal.ptpCase.applIds, false)}>
            <Text 
              style={styles.indexValue} 
              >{props.totalCal.ptpCase.case}
            </Text>
            <Text style={styles.indexLabel}>PTP</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.row, {borderBottomWidth: 1, borderColor: '#dee2e6'}]}>
          <TouchableOpacity 
          style={[styles.box, {borderRightWidth: 1,  borderColor: '#dee2e6'}]}
          onPress={() => handleShow(props.totalCal.paidMtd.applIds, false)}>
            <Text 
              style={styles.indexValueSmall} 
              >{props.totalCal.paidMtd.case}
            </Text>
            <Text style={styles.indexLabel}>Paid Mtd</Text>
          </TouchableOpacity>
          <TouchableOpacity 
          style={[styles.box]} 
          onPress={() => handleShow(props.totalCal.paidMtd.applIds, false)}>
            <Text 
              style={styles.indexValueSmall} 
              >{moneyFormat(props.totalCal.paidMtd.value)}
            </Text>
            <Text style={styles.indexLabel}>Collected Mtd</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity 
          style={[styles.box, {borderRightWidth: 1,  borderColor: '#dee2e6'}]}
          onPress={() => handleShow(props.totalCal.paidToday.applIds, false)}>
            <Text 
              style={styles.indexValueSmall} 
              >{props.totalCal.paidToday.case}
            </Text>
            <Text style={styles.indexLabel}>Paid Today</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.box]} 
            onPress={() => handleShow(props.totalCal.paidToday.applIds, false)}>
            <Text 
              style={styles.indexValueSmall} 
              >{moneyFormat(props.totalCal.paidToday.value)}
            </Text>
            <Text style={styles.indexLabel}>Collected Today</Text>
          </TouchableOpacity>
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
    data: state.data.data,
    showlists: state.showlists.applIds,
    todoCal: state.todoCal,
    totalCal: state.totalCal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
    setTodoShowlist: (content) => {
      dispatch(actSetTodoShowlist(content))
    },
    initDashboard: () => {
      dispatch(actInitDashboard())
    },
  };
};




export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

