import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import axios from 'axios'


import { actInitData, actInitDashboard, actUpdateShowlist } from "../actions"
import { WORKLIST_API } from "../consts"


import Dashboard from './Dashboard'
import ListAppls from './ListAppls'

//import Maps from './Maps'

const Tab = createBottomTabNavigator();

function MainApp(props) {
  
  useEffect( () => {
    async function fetchList() {
      let config = {
        method: 'post',
        url: `${WORKLIST_API}/appls-list/`,
        headers: { 
          'Authorization': `Bearer ${props.token.token.access}`
        }
      }
      const response = await axios(config)
      const responseData = response.data
      props.initData(responseData)
      props.initDashboard(responseData)
      //const all_list = responseData.map(appl => appl.appl_id)
      props.updateShowlist(responseData.map(appl => appl.appl_id))
      console.log(responseData);

    }
    fetchList();
  }, [])
  

  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'ListAppls') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >

        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="ListAppls" component={ListAppls} />
    
      </Tab.Navigator>
    </NavigationContainer>
  );
}


const mapStateToProps = (state, ownProps) => {
  return {
    appls: state.appls,
    token: state.token,
    dash: state.dash,
    showlist: state.showlist
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initData: (content) => {
      dispatch(actInitData(content))
    },
    initDashboard: (content) => {
      dispatch(actInitDashboard(content))
    },
    updateShowlist: (content) => {
      dispatch(actUpdateShowlist(content))
    }
  };
};
 
const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



export default connect(mapStateToProps, mapDispatchToProps)(MainApp);

