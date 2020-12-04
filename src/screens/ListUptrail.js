import {
  View, Text, Image, ScrollView, Alert, FlatList , StyleSheet, TouchableOpacity
} from 'react-native'
import { Button, Portal, Dialog} from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import { styles } from '../styles'
import axios from "axios"
import { actGetUptrails } from "../actions/index"

function UptrailImage(props) {
  const [image1, setimage1] = useState(props.image1)
  const [image2, setimage2] = useState(props.image2)
  const [image3, setimage3] = useState(props.image3)
  
  if(image1 !== null || image2 !== null || image3 !== null) {
    return (
      <View
      style={[{
        padding: 5,
      }]}
      > 
      <Image 
        style={[styles.row, {width: 250, height: 200, }]} 
        source={{uri: image1}}/>
       <Image 
        style={[styles.row, {width: 250, height: 200, }]} 
        source={{uri: image2}}/>
       <Image 
        style={[styles.row, {width: 250, height: 200, }]} 
        source={{uri: image3}}/>
      </View>
    )
  } 
}

function Uptrail(props) {

  const [runtime, setRuntime] = useState(props.runtime)
  const [code, setCode] = useState(props.code)
  const [appl_id, setAppl_id] = useState(props.appl_id)
  const [payamount, setPayamount] = useState(props.payamount)
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
      const  money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      return <Text style={stylesTrail.description}>Hứa trả: {money.substring(0, money.length -2)} </Text>
    }
  }

  const nextTime = (t) => {
    if(t != null) 
      return t.substring(0, 10)
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
      <View>
         <Button mode="outlined" onPress={showDialog}>
          Xem hình ảnh
        </Button>
        
        <Portal style={[styles.container, ]}>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <ScrollView>
              <UptrailImage image1={image1} image2={image2} image1={image3}/>
            </ScrollView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      </View>
    )
  }
  

  return (
    <View style={{
      padding: 5,
      borderBottomWidth: 2,
      borderRadius:10,
      borderColor:"#87CEEB"
    }}>
        <View style={stylesTrail.eventBox}>
          <View style={stylesTrail.eventDate}>
            <Text  style={stylesTrail.eventDay}>{runtime.substring(8, 10)}</Text>
            <Text  style={stylesTrail.eventMonth}>Th{runtime.substring(5,7)}</Text>
            <Text  style={stylesTrail.remarkCode}>{code}</Text>
          </View>
          <View style={stylesTrail.eventContent}>
            <Text style={stylesTrail.eventTime}>{splitTime(runtime)}</Text>
            <Text style={stylesTrail.userName}>{appl_id}</Text>
            {payAmount(payamount)}
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

        {/* <UptrailImage image1={image1} image2={image2} image1={image3}/> */}
        {images(image1, image2, image3)}

       
        
    </View>
  )
}



function ListUptrail(props) {

  useEffect( () => {    
    // Update the document title using the browser API  
    props.getUptrails({token: props.token})
  }, []);

  
  const showText = () => {
    if (props.uptrails.length > 0 )
      return props.uptrails[0].runtime
    return 0
  }

  return (
  
  <ScrollView>

    {props.uptrails.map(item =>  
      <Uptrail  
      key={item.runtime} 
      runtime={item.runtime} 
      code={item.code}
      appl_id={item.appl_id}
      payamount={item.payamount}
      remark={item.remark}
      trust_address={item.trust_address}
      next_visit_time={item.next_visit_time}
      image1={item.image1}
      image2={item.image2}
      image3={item.image3}
      />)
    }
  </ScrollView>
  )
};

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
    color: "#0099FF",
    fontWeight: "600",
  },
  eventMonth:{
    fontSize:14,
    color: "#0099FF",
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
    color: "#646464",
  },
  description:{
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
 
export default connect(mapStateToProps, mapDispatchToProps)(ListUptrail);

