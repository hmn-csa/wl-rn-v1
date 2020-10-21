import React, { useState, useEffect } from 'react'
import { 
  StyleSheet, Text, View ,
  TextInput, TouchableOpacity, 
  Button, Alert
} from 'react-native';

import { connect } from "react-redux";
import { actloginUser } from "../actions/index"


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

  const fetchUsers = () => {
    const config = {
      "username": username.value,
      "password": password.value,
    }

    props.login(config) 

  };

  

  //const [token, setTocken] = useState()

  if (props.token.fetching)
    return (
      <View style={styles.container}>
        <Text>Loading ... </Text>
      </View>
    )

  if (props.data.fetching)
    return (
      <View style={styles.container}>
        <Text>Loading data... </Text>
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
    data: state.data
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (config) => {
      dispatch(actloginUser(config))
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

