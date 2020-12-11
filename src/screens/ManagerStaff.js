import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, 
  TouchableOpacity, Button, Alert, Image, ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Moment from 'react-moment';
import { connect } from "react-redux";
import { calManagerDash, setManagerDash , apiStaffData} from "../actions"
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as constAction from '../consts'
import axios from "axios";
import { colors  } from '../styles'

import TimeAgo from 'react-native-timeago'
 
import { EMPTYAVATAR } from '../images';



function ManagerStaff(props) {

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log('This will run every second!');
  //   }, 10000);
  //   return () => clearInterval(interval);
  // }, []);

  
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

      props.setManager(response.data);
      
    } catch (error) {
      console.error(error);
    }
  }

  const getStaffDetail = async () => {
    let config = {
      method: 'post',
      url: `${constAction.WORKLIST_API}/manager?type=data`,
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
    (async () => {
      await getStaffData();
      getStaffDetail()
    })();
  }, []);

  // useEffect(() => {
  //   getStaffData()
  // }, []);

  // useEffect(() => {
  //   getStaffDetail()
  // }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('This will run every second!')
      //getStaffData()
      getStaffDetail()
    },  1 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

    



  

  const renColor = (checkinData, today) => {
    if(checkinData.length ==0 ) 
      return colors.secondary
    if (checkinData[0].runtime.substring(0,10) === today) 
        return colors.green
    return 'orange'
  }

  

  const renIcon = (checkinData, today) => {
    if(checkinData.length ==0 ) 
      return <Ionicons name='ios-close-circle' style={[ { color: colors.secondary }]} />
    if (checkinData[0].runtime.substring(0,10) === today) 
        return <Ionicons name='ios-checkmark-circle' style={[ { color: colors.green }]} />
    return  <Ionicons name='ios-remove-circle' style={[ { color: 'orange'}]} />
  }

  const renCheckin = (checkinData) => {
    const splitTime = (t) => t.substring(0, 10) + " " + t.substring(11, 19)
    if(checkinData.length ==0 ) 
      return <Text>Chưa từng</Text>
    else 
      return  <TimeAgo time={checkinData[0].runtime} /> //<Text><Moment fromNow date={checkinData[0].runtime}></Moment></Text>
  }

  const renUptrail = (uptrailData) => {
    const splitTime = (t) => t.substring(0, 10) + " " + t.substring(11, 19)
    if(uptrailData.length ==0 ) 
      return <Text>Chưa uptrail</Text>
    else 
      return  <TimeAgo time={uptrailData[0].runtime} /> //<Moment fromNow  date={uptrailData[0].runtime}></Moment>
  }

 
  const renAvatar = (avatar) => {

    if(avatar == null || avatar==="")
      return (
        // {uri:"https://bootdey.com/img/Content/avatar/avatar1.png"}
        EMPTYAVATAR
    ) 
    else return (
        //{uri:"data:image/png;base64,"+avatar}
        {uri:avatar}
    )
  }

  const renContent = (content) => {
    const moneyFormat = (n) => {
      const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      return money.substring(0, money.length - 2)
    }
    if (content !== undefined) 
      return {...content, todayamt: moneyFormat(content.todayamt), paidamt: moneyFormat(content.paidamt)}
    else return {
      visited: 0, // <ActivityIndicator size={10} color='black' /> ,
      paidamt:  0, //<ActivityIndicator size={10} color='black' /> ,
      paidcase:  0, //<ActivityIndicator size={10} color='black' /> ,
      todayamt:  0, //<ActivityIndicator size={10} color='black' /> ,
      todaycase:  0, //<ActivityIndicator size={10} color='black' /> ,
    }
  }

  if (props.status.length ==0) 
    return (
    <View style={[styles.container, {alignItems: 'center'}]}>
      <ActivityIndicator size={100} color={colors.primary}/> 
      <Text>Loading ... </Text>
    </View>
  )
  
  else return (
    <View style={styles.container} >
      <FlatList 
        data={props.status}
        horizontal={false}
        numColumns={1}
        renderItem={({ item }) => {

          const content = renContent(item.content)

          return (
            <TouchableOpacity key={item.staff_id}  
              onPress={() => {
                props.navigation.navigate('Dashboard')
                props.getStaffData({token: props.token.token.access, staff_id: item.staff_id})
              }}>
              <View style={[styles.row, {padding:10, borderBottomWidth: 1, borderRadius: 10,}]}>
                <View style={[styles.box, {flex:0.35, borderRadius: 30,}]}>
                  {/* {renAvatar(item.info.avatar)} */}
                  <ImageBackground 
                    style={[styles.pic, {resizeMode: "cover"}]} 
                    imageStyle={{ borderRadius: 30}}
                    source={renAvatar(item.info.avatar)}>
                    {renIcon(item.checkin, item.today)}
                  </ImageBackground>
                </View>
                <View style={styles.box}>
                  <View>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt} 
                        numberOfLines={1} 
                        ellipsizeMode="tail">
                        {item.info.fc_name} - {item.info.staff_id}
                      </Text>
                    </View>
                    <View style={styles.msgContainer}>
                      <Text 
                        style={[styles.msgTxt, {color: renColor(item.checkin, item.today)}]}>
                        last checkin: {renCheckin(item.checkin)} 
                      </Text>
                    </View>

                    <View style={[styles.msgContainer, {marginTop:5}]}>
                      <View style={[styles.row, {flex:1}]}>
                        <View style={[styles.box, {flex:0.8}]}>
                          <Text style={[styles.msgTxt,]}>{item.case} case</Text>
                        </View>
                        <View style={styles.box}>
                          <Text style={[styles.msgTxt,]}>{content.paidcase} paid</Text>
                        </View>
                        
                      </View>
                    </View>
                    <View style={[styles.msgContainer, {marginTop:1}]}>
                      <View style={[styles.row, {flex:1}]}>
                        <View style={[styles.box, {flex:0.8}]}>
                          <Text style={[styles.msgTxt,]}>{content.visited} đã đi</Text>
                        </View>
                        <View style={styles.box}>
                          <Text style={[styles.msgTxt,]}>{content.paidamt}</Text>
                        </View>
                       
                      </View>
                    </View>

                  </View>
                </View>

                <View style={[styles.box, {flex: 0.5, borderLeftWidth:0.1, borderLeftColor: colors.lightGray}]}>
                    <View style={styles.nameContainer}>
                      <Text style={styles.nameTxt} 
                        numberOfLines={1} 
                        ellipsizeMode="tail">
                        Uptrail Today:
                      </Text>
                    </View>
                    <View style={styles.msgContainer}>
                      <Text 
                        style={[styles.msgTxt, {color: renColor(item.checkin, item.today)}]}>
                       {renUptrail(item.uptrail)} 
                      </Text>
                    </View>
               

                  <View style={[styles.msgContainer, {marginTop:5}]}>
                    <View style={[styles.row, {flex:1}]}>
                      <View style={styles.box}>
                        <Text style={[styles.msgTxt,]}>{content.todaycase} paid</Text>
                      </View>
                    </View>
                  </View>

                  <View style={[styles.msgContainer, {marginTop:5}]}>
                    <View style={[styles.row, {flex:1}]}>
                      <View style={styles.box}>
                        <Text style={[styles.msgTxt,]}>{content.todayamt}</Text>
                      </View>
                    </View>
                  </View>

                </View>
              </View>
              
            
            </TouchableOpacity>
          )
        }} />
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
    staffs: state.manager.staffs,
    status: state.manager.status,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    calManager: (data) => {
      dispatch(calManagerDash(data))
    },
    setManager: (data) => {
      dispatch(setManagerDash(data))
    },
    getStaffData: (config) => {
      dispatch(apiStaffData(config))
    },
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#DCDCDC',
    backgroundColor: '#fff',
    
  },
  box: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },

  card: {
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
    backgroundColor: 'white',
    marginVertical: 5,
    flexBasis: '46%',
    marginHorizontal: 5,
    borderRadius: 10,
  },

  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 280,
  },
  nameTxt: {
    marginLeft: 10,
    fontWeight: '600',
    color: '#222',
    fontSize: 13,
    width:190,
  },
  mblTxt: {
    fontWeight: '200',
    color: '#777',
    fontSize: 13,
  },
  msgContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  msgTxt: {
    fontWeight: '400',
    color: colors.textcolor,
    fontSize: 11,
    marginLeft: 10,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ManagerStaff);

