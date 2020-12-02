import {
  View, Text, Image, ScrollView, Alert, FlatList , StyleSheet, TouchableOpacity
} from 'react-native'
import { Button } from 'react-native-paper';
import React, { useState, useEffect} from "react"
import { connect } from "react-redux"
import { styles } from '../styles'
import axios from "axios";

function UptrailBeuty(props) {
  const [item, setItem] = useState(props.item.item)
  const splitTime = (t) => t.substring(0, 10) + " "+ t.substring(11, 19)

  const payAmount = (n) => {
    if(n != null) {
      const  money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      return <Text style={stylesTrail.description}>Hứa trả: {money.substring(0, money.length -2)} </Text>
    }
  }
  
  return (
    <TouchableOpacity>
      <View style={stylesTrail.eventBox}>
        <View style={stylesTrail.eventDate}>
          <Text  style={stylesTrail.eventDay}>{item.runtime.substring(8, 10)}</Text>
          <Text  style={stylesTrail.eventMonth}>Th{item.runtime.substring(5,7)}</Text>
          <Text  style={stylesTrail.remarkCode}>{item.code}</Text>
          
        </View>
        <View style={stylesTrail.eventContent}>
          <Text  style={stylesTrail.eventTime}>{splitTime(item.runtime)}</Text>
          <Text  style={stylesTrail.userName}>{item.appl_id}</Text>
          {payAmount(item.pay_amount)}
        </View>

      </View>
    </TouchableOpacity>
  )
}
function UptrailImage(props) {
  const [item, setItem] = useState(props.item.item)
  const image1 = "data:image/png;base64," + item.image1
  const image2 = "data:image/png;base64," + item.image2
  const image3 = "data:image/png;base64," + item.image3
  
  if(item.image1 !== null || item.image2 !== null || item.image3 !== null) {
    return (
      <View
      style={[styles.row, {
        padding: 5,
      }]}
      > 
      <Image 
        style={[styles.box, {width: 100, height: 100, }]} 
        source={{uri: image1}}/>
       <Image 
        style={[styles.box, {width: 100, height: 100, }]} 
        source={{uri: image2}}/>
       <Image 
        style={[styles.box, {width: 100, height: 100, }]} 
        source={{uri: image3}}/>
      </View>
    )
  } else {
    return <View
      style={{
        padding: 5,
      }}
      > 
      </View>
  }
}

function UptrailText(props) {
  const [item, setItem] = useState(props.item.item)
  const image1 = "data:image/png;base64," + item.image1
  const splitTime = (t) => t.substring(0, 10) + " "+ t.substring(11, 19)
  const nextTime = (t) => {
    if(t != null) 
      return t.substring(0, 10)
  }

  const payAmount = (n) => {
    if(n != null) {
      const  money = parseFloat(n, 10).toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString()
      return <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>Số tiền hứa/đã trả:</Text>
        </View>
        <View style={[styles.box, { flex: 2.5 }]}>
          <View style={[styles.row]}>
            <View style={[styles.box, { flex:2 }]}>
              <Text style={{fontWeight:"bold",}}>{money.substring(0, money.length -2)}</Text>
            </View>
          </View>
        </View>
      </View>
    }
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
            <Text style={{fontWeight:"bold",}}>{nextTime(item.next_visit_time)}</Text>
          </View>
        </View>
      </View>
    </View>
  }
  
  
  return (
    <View
      style={{
        padding: 5,
        backgroundColor: 'white',
        borderRadius:10
      }}
    > 
       
      <View style={[styles.row]}>
        <View style={styles.box}>
          <Text>ghi chú:</Text>
        </View>
        <View style={[styles.box, { flex: 3.5 }]}>
          <View style={[styles.row]}>
            <View style={[styles.box,]}>
              <Text style={{fontWeight:"bold",}}>{item.remark}</Text>
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
              <Text style={{fontWeight:"bold",}}>{item.trust_address}</Text>
            </View>
          </View>
        </View>
      </View>

      {reVisit(item.next_visit_time)}
     

    </View>
  )
}


function ListUptrail(props) {
  const [listUptrail, setListUptrail] = useState([])

  useEffect(async () => {    
    // Update the document title using the browser API  

    let config = {
      method: 'get',
      url: `https://beta-fc.lgm.com.vn/rn-ver/api/uptrail`,
      headers: {
        'Authorization': `Bearer ${props.token.token.access}`
      },
      data: {
      }
    }
    const response = await axios(config);
    setListUptrail(response.data);
    console.log(response.data)
  }, []);

  return (

   <FlatList 
    data = {listUptrail}
    renderItem={item => 
      <View style={{
        padding: 5,
        borderBottomWidth: 2,
        borderRadius:10,
        borderColor:"#87CEEB"
      }}>

        <UptrailBeuty 
          key={item.appl_id}
          item={item}
        />
        <UptrailText 
          key={item.appl_id}
          item={item}
        />
        <UptrailImage 
        key={item.appl_id}
        item={item}
        />
        
      </View>
      
      }
    />
  ) 

}

const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  };
};




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
 
export default connect(mapStateToProps, null)(ListUptrail);

