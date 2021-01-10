import {
  View, Text, Image, ScrollView, Alert, FlatList , StyleSheet, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { Button, Portal, Dialog} from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import * as constAction from '../consts'

import Timeline from 'react-native-timeline-flatlist'


import { moneyFormat } from '../functions'

const data = [ 
  {time: '09:00', title: 'Archery Training', description: 'The Beginner Archery and Beginner Crossbow course does not require you to bring any equipment, since everything you need will be provided for the course. ', circleColor: '#009688',lineColor:'#009688'},
  {time: '10:45', title: 'Play Badminton', description: 'Badminton is a racquet sport played using racquets to hit a shuttlecock across a net.'},
  {time: '12:00', title: 'Lunch'},
  {time: '14:00', title: 'Watch Soccer', description: 'Team sport played between two teams of eleven players with a spherical ball. ',lineColor:'#009688'},
  {time: '16:30', title: 'Go to Fitness center', description: 'Look out for the Best Gym & Fitness Centers around me :)', circleColor: '#009688'}
]

function ListPayment(props) {
  useEffect(() => {
    props.getPayments({
      token: props.token.token.access, 
      applids: ''.concat(props.totalCal.paidAll.applIds.map(item => item.appl_id))
    })
  }, []);


  const [timelinePayment, setTimeline] = useState([])

  const pm2timeline = (arr) => {
    let timeline = []
    for (let i = 0; i < arr.length; i++) {
      timeline.push({
        time: arr[i].rundate.substring(5, 10),
        title: arr[i].cust_name,
        description: 'Hợp đồng : '+arr[i].appl_id + '\n' + 'Tiền đóng : ' + moneyFormat(arr[i].receipt_amt),
        // circleColor: '#009688',
        // lineColor:'#009688'
      })
    }
    return timeline
  }

  useEffect(() => {
    setTimeline(pm2timeline(props.payments))
    console.log('timelinePayment: ', timelinePayment)
  }, [props.payments]);

  return(
    <View style={style.container}>
        <Timeline 
          style={style.list}
          data={timelinePayment}
          separator={true}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:52, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor:'#ff9797', color:'white', padding:5, borderRadius:13, overflow: 'hidden'}}
          descriptionStyle={{color:'green'}}
          // options={{
          //   style:{paddingTop:5}
          // }}
        />
      </View>
  )
 

};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    payments: state.payments.payments,
    totalCal: state.totalCal,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getPayments: (config) => {
      dispatch(
        {
          type: constAction.API_PAYMENT_REQUEST,
          config
        }
      )
    },
  }
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  list: {
    flex: 1,
    marginTop:5,
  },
});


 
export default connect(mapStateToProps, mapDispatchToProps)(ListPayment);

