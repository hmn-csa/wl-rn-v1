import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View , FlatList, TouchableOpacity, Button, Alert} from 'react-native';
import { connect } from "react-redux";
import { calManagerDash } from "../actions/index"

import * as constAction from '../consts'
import axios from "axios";
import { colors } from '../styles'

function ManagerApp(props) {
  

  const getStaffData = async () => {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager?type=info`,
      headers: {
        'Authorization': `Bearer ${props.token.token.access}`
      },
      data: {
        'area': props.token.token.area,
      }
    }

    try {
      const response = await axios(config);
      props.calManager(response.data)
      } catch (error) {
        console.error(error);
      }
  }

  useEffect(() => {
    getStaffData()
  }, []);

  const moneyFormat = (n) => {
    return  n.toLocaleString().split(".")[0]
  }
                  

  return (
    <View style={[styles.container,]}>

      <FlatList 
      data = {props.staffs}
      horizontal={false}
      numColumns={2}
      renderItem={({item}) => {
        return (
          <TouchableOpacity style={styles.card} onPress={() => {handleShow(item.applIds)}}>
            <View style={styles.cardHeader}>
              <Text style={[styles.name, {color:colors.primary}]}>{item.key}</Text>
            </View>
            <View style={{ padding:2,}}>
              
              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1}]}>
                  <Text>Số lượng:</Text>
                </View>
                <View style={[styles.box, {flex:1}]}>
                  <Text>{item.case}</Text>
                </View>
              </View>

              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1}]}>
                  <Text>Paid case:</Text>
                </View>
                <View style={[styles.box, {flex:1}]}>
                  <Text style={{color:colors.green}}>{item.paidcase}</Text>
                </View>
              </View>

              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1}]}>
                  <Text>Thanh toán:</Text>
                </View>
                <View style={[styles.box, {flex:1, color:colors.green}]}>
                  <Text style={{color:colors.green}}>{moneyFormat(item.paidamt)}</Text>
                </View>
              </View>

              <View style={[styles.row]}>
                <View style={[styles.box, {flex:1}]}>
                  <Text>Viếng thăm:</Text>
                </View>
                <View style={[styles.box, {flex:1}]}>
                  <Text>{item.visited}</Text>
                </View>
              </View>

              
            </View>
          </TouchableOpacity>
        )
      }}/>
    </View>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    staffs: state.manager.staffs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    calManager: (data) => {
      dispatch(calManagerDash(data))
    }
  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    margin: 2
  },
  list: {
    paddingHorizontal: 5,
    backgroundColor:"#E6E6E6",
  },
  listContainer:{
   alignItems:'center'
  },
  /******** card **************/
  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    marginVertical: 5,
    backgroundColor:"white",
    flexBasis: '46%',
    marginHorizontal: 5,
    borderColor:colors.lightGray,
    borderRadius:10
  },
  cardFooter: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    flexDirection: 'row',
    alignItems:"center", 
    justifyContent:"center"
  },
  cardContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  cardHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  userImage:{
    height: 120,
    width: 120,
    borderRadius:60,
    alignSelf:'center',
    borderColor:"#DCDCDC",
    borderWidth:3,
  },
  name:{
    fontSize:18,
    flex:1,
    alignSelf:'center',
    color:"#008080",
    fontWeight:'bold'
  },
  position:{
    fontSize:14,
    flex:1,
    alignSelf:'center',
    color:"#696969"
  },
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  followButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },
  icon:{
    height: 20,
    width: 20, 
  },
  buttons: {
    flexDirection: 'row',
    padding: 2,
  },
  button: {
    margin: 2,
  },
});    

export default connect(mapStateToProps, mapDispatchToProps)(ManagerApp);

