import React from 'react'
import { 
  Text, View, StyleSheet, 
  TextInput, Button, Alert 
} from 'react-native'
import { useForm, Controller, FormProvider } from 'react-hook-form'


import { connect } from "react-redux";
import { actloginUser } from "../actions/index"
import { styles, BACKGROUND_LOGIN } from '../styles'

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
    <View style={[styles.container, 
      {alignItems: 'center', backgroundColor: BACKGROUND_LOGIN}]}>

      <Text style={styles.sologan}>HMN APP</Text>
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



export default connect(mapStateToProps, mapDispatchToProps)(Login);

