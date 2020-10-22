import React from 'react'
import { 
  Text, View, StyleSheet, 
  TextInput, Button, Alert 
} from 'react-native'
import { useForm, Controller } from 'react-hook-form'


import { connect } from "react-redux";
import { actloginUser } from "../actions/index"

function Login(props) {

  const { register, setValue, handleSubmit, control } = useForm();
  const onSubmit = data => {
    console.log(data)
    props.login(data)
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView} >
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="User..." 
              style={styles.inputText}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="username"
        />
      </View>
      
      <View style={styles.inputView} >
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              secureTextEntry
              placeholder="Password..." 
              style={styles.inputText}
              onBlur={onBlur}
              onChangeText={value => onChange(value)}
              value={value}
            />
          )}
          name="password"
        />
      </View>
      
      
        <Button
          style={styles.loginBtn}
          title="Button"
          onPress={handleSubmit(onSubmit)}
        />
      
    </View>
  );
};


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
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  forgot:{
    color:"white",
    fontSize:11
  },
  loginBtn:{
    width:"30%",
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

