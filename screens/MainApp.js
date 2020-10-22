import React from 'react';

import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Button, StyleSheet } from 'react-native';

import {Remark, Vsf, Skip} from '../components';

import Dashboard from './Dashboard'
import ListAppls from './ListAppls'
import User from './User'


enableScreens();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListAppls" component={ListAppls} />
      <Stack.Screen name="Remark" component={Remark} />
      <Stack.Screen name="Vsf" component={Vsf} />
      <Stack.Screen name="Skip" component={Skip} />
    </Stack.Navigator>
  );
}


const Tab = createBottomTabNavigator();


function MainApp () {

  return (
    <NavigationContainer style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Portfolio') {
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
        <Tab.Screen name="Portfolio" component={MyStack} />
        <Tab.Screen name="User" component={User} />
        
    
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 0,
  },
});



export default MainApp;