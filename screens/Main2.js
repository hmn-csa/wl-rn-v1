import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from "react-redux";
import axios from 'axios'


import { actInitData, actInitDashboard, actUpdateShowlist } from "../actions"
import { WORKLIST_API } from "../consts"

import { Home, List, Item } from '../components';

import Dashboard from './Dashboard'
import ListAppls from './ListAppls'
import User from './User'


// import Maps from './Maps'
//<Tab.Screen name="Maps" component={Maps} />

const ListItemStack = createStackNavigator({
  'List': ListAppls,
  'Item': Item
});

const Tab = createBottomTabNavigator({

});

function MainApp () {
  
  /*
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
      props.updateShowlist(responseData.map(appl => appl.appl_id))

    }
    fetchList();
  }, [])
  */

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
            } else if (route.name === 'User') {
              iconName = focused ? 'ios-person' : 'ios-person';
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
        <Tab.Screen name="ListAppls" component={ListItemStack} />
        <Tab.Screen name="User" component={User} />
        
    
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 15,
  },
});




export default MainApp;

