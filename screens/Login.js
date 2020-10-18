import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View , TextInput, TouchableOpacity, Button, Alert} from 'react-native';

import axios from 'axios';
import { connect } from "react-redux";

import { actGetToken, actGetDataSaga, actloginUser } from "../actions/index"
import { WORKLIST_API } from "../consts"


import * as consts from "../consts"



//https://reactnavigation.org/docs/getting-started

function Login(props) {

  const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);
  
    const handleChange = e => {
      setValue(e.target.value);
    }
    return {
      value,
      onChange: handleChange
    }
  }
  const username = useFormInput('be_min')
  const password = useFormInput('1')

  const access = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjAzMDI2NTUzLCJqdGkiOiI3OTNjMDE4MGU0ZTA0ZDRiOWJiOWNjMjE0NzYwMzA5OSIsInVzZXJuYW1lIjoiTXJzSGEifQ.AUPnZWmZytl_qU5m-iZD451z3B4O30mhb1dvVblPP1k"

  const fetchUsers = () => {
    const config = {
      "username": username.value,
      "password": password.value,
    };
    props.login(config)
    props.getData(access)
     
  };

  

  //const [token, setTocken] = useState()

  if (props.token.fetching)
    return (
      <View>
        <Text>Loading ... </Text>
      </View>
    )
 
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HMN APP</Text>
      
      <View style={styles.inputView} >
        <TextInput  
          style={styles.inputText}
          placeholder="User..." 
          placeholderTextColor="#003f5c"
          {...username}
          />
      </View>
      
      <View style={styles.inputView} >
        <TextInput  
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..." 
          placeholderTextColor="#003f5c"
          {...password}
          />
      </View>

      <Button 
        style={styles.loginBtn}
        title='LOGIN'
        onPress={fetchUsers}
      />

      </View>
  );
}



const mapStateToProps = (state, ownProps) => {
  return {
    token: state.token,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (config) => {
      dispatch(actloginUser(config))
    },
    getData: (token) => {
      dispatch(actGetDataSaga(token))
    }

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
  },
  inputView:{
    width:"80%",
    backgroundColor:"#465881",
    borderRadius:25,
    height:50,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"white"
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"10%",
    backgroundColor:"#fb5b5a",
    borderRadius:50,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:10,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Login);

