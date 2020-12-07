import {
  View, Text, Image, ScrollView, Alert, FlatList , StyleSheet, TouchableOpacity, ActivityIndicator
} from 'react-native'
import { Button, Portal, Dialog} from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import { styles, colors } from '../styles'
import axios from "axios"
import { actGetUptrails, actUpdateShowlist } from "../actions/index"

function ImageShow(props) {
  const [image, setimage] = useState(props.image)
  if (image !== null)
  return (
    <View style={[styles.row, {padding: 5, height: 160, width: 160}]}> 
    <Image 
    style={[styles.row, {height: 150, width: 150}]} 
    source={{uri: image}}/>
  </View>
  ) 
  return (
    <View></View>
  )

}


function Uptrail(props) {

  const [runtime, setRuntime] = useState(props.runtime)
  const [code, setCode] = useState(props.code)
  const [appl_id, setAppl_id] = useState(props.appl_id)
  const [pay_amount, setPayamount] = useState(props.pay_amount)
  const [remark, setRemark] = useState(props.remark)
  const [trust_address, setTrust_address] = useState(props.trust_address)
  const [next_visit_time, setnext_visit_time] = useState(props.next_visit_time)

  const [image1, setimage1] = useState(props.image1  === null ? null : "data:image/png;base64," + props.image1)
  const [image2, setimage2] = useState(props.image2  === null ? null :  "data:image/png;base64," + props.image2)
  const [image3, setimage3] = useState(props.image3  === null ? null :  "data:image/png;base64," + props.image3)


  const [visible, setVisible] = useState(false);
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);


  const splitTime = (t) => t.substring(0, 10) + " "+ t.substring(11, 19)

  const payAmount = (n) => {
    if(n != null) {
      const money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      return <Text style={[stylesTrail.description, {color:colors.green}]}>Hứa trả: {money.substring(0, money.length -2)} </Text>
    }
  }

  const nextTime = (t) => {
    if(t != null) 
      return t.substring(0, 10)
  }

  const handleShow = (list) => {
    props.updateShowlist(list)
    props.navigation.navigate('Portfolio',  { screen: 'List' })
  }

  
  const reVisit = (next_visit_time) => {
    if(next_visit_time != null) 
      return  <View style={[styles.row]}>
      <View style={styles.box}>
        <Text>Ngày quay lại:</Text>
      </View>
      <View style={[styles.box, { flex: 3.5 }]}>
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Text style={{fontWeight:"bold",}}>{nextTime(next_visit_time)}</Text>
          </View>
        </View>
      </View>
    </View>
  }
  
  const images = (image1, image2, image3) => {
    if(image1 !== null || image2 !== null || image3 !== null)
    return (
      <Button
        mode="contained"
        style={buttonStyles.button} 
        onPress={showDialog}>
        Xem hình ảnh
      </Button>
    )
  }
 
  return (
    <View style={{
      padding: 5,
      borderBottomWidth: 2,
      borderRadius:10,
      borderColor: colors.primary
    }}>
        <View style={stylesTrail.eventBox}>
          <View style={stylesTrail.eventDate}>
            <Text  style={stylesTrail.eventDay}>{runtime.substring(8, 10)}</Text>
            <Text  style={stylesTrail.eventMonth}>{runtime.substring(5,7)}</Text>
            <Text  style={stylesTrail.remarkCode}>{code}</Text>
          </View>
          <View style={stylesTrail.eventContent}>
            <Text style={stylesTrail.eventTime}>{splitTime(runtime)}</Text>
            <Text style={stylesTrail.userName}>{appl_id}</Text>
            {payAmount(pay_amount)}
          </View>
        </View>

        <View style={[styles.row]}>
          <View style={styles.box}>
            <Text>ghi chú:</Text>
          </View>
          <View style={[styles.box, { flex: 3.5 }]}>
            <View style={[styles.row]}>
              <View style={[styles.box,]}>
                <Text style={{fontWeight:"bold",}}>{remark}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={[styles.row]}>
          <View style={styles.box}>
            <Text>Địa chỉ:</Text>
          </View>
          <View style={[styles.box, { flex: 3.5 }]}>
            <View style={[styles.row]}>
              <View style={[styles.box]}>
                <Text style={{fontWeight:"bold",}}>{trust_address}</Text>
              </View>
            </View>
          </View>
        </View>

        {reVisit(next_visit_time)}
        <View style={[styles.row]}>
          <View style={[styles.box]}>
            <Button 
              mode="contained"
              style={buttonStyles.button} 
              onPress={() => handleShow([props.appl_id])}>
              Xem hợp đồng
            </Button>
          </View>

          <View style={[styles.box]}>
            {images(image1, image2, image3)}
          </View>
        </View>
       
        
        
        <Portal style={[styles.container, {height: 700}]}>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Content>
              <View style={{height: 600}}> 
                <ImageShow image={image1}></ImageShow>
                <ImageShow image={image2}></ImageShow>
                <ImageShow image={image3}></ImageShow>
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button 
                style={buttonStyles.button} 
                mode="contained"
                onPress={hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
    </View>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token.token.access,
    uptrails: state.uptrails.uptrails,
  };
};


const mapDispatchToProps = (dispatch) => {
  return {
    getUptrails: (config) => {
      dispatch(actGetUptrails(config))
    }, 
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    },
  }
}



const stylesTrail = StyleSheet.create({
  container:{
    backgroundColor: "#DCDCDC",
  },
  eventList:{
    marginTop:20,
  },
  eventBox: {
    padding:10,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'row',
  },
  eventDate:{
    flexDirection: 'column',
  },
  eventDay:{
    fontSize:30,
    color: colors.green,
    fontWeight: "600",
  },
  eventMonth:{
    fontSize:14,
    color: colors.green,
    fontWeight: "600",
  },
  eventContent: {
    flex:1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft:10,
    backgroundColor: '#FFFFFF',
    padding:10,
    borderRadius:10
  },
  remarkCode:{
    fontWeight: "bold",
    fontSize:25,
    color: colors.green,
  },
  description:{
    paddingTop: 10,
    fontSize:15,
    color: "#646464",
  },
  eventTime:{
    fontSize:18,
    color:"#151515",
  },
  userName:{
    fontSize:18,
    color:"#151515",
    paddingTop: 10
  },
});

const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 2,
    
  },
  button: {
    marginLeft: 2,
    borderRadius: 10,
    fontSize: 10,
    fontWeight: 'bold', 
    backgroundColor: colors.primary,
    borderColor:colors.primary,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Uptrail);

