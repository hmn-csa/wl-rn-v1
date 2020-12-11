import React, { useRef } from 'react'
import { enableScreens } from 'react-native-screens'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Button } from 'react-native-paper';

import{ styles, colors } from '../styles'


import ManagerStaff from './ManagerStaff'


import Tree from './Tree'
import Dashboard from './Dashboard'
import ProductCategories from './ProductCategories'
import ScoreCategories from './ScoreCategories'
import ListAppls from './ListAppls'
import User from './User'
//import Test from './test'
// import Maps from './Maps'
import ListUptrail from './ListUptrail'
import {CategorieStack, PortStack, DashboardStack, StafflistStack} from './Stacks'

enableScreens()

const Tab = createBottomTabNavigator();
function MagagerApp () {
  return (
   
    <NavigationContainer style={styles.container}>
      
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'ios-stats' : 'ios-stats';
            } else if (route.name === 'ManageStaff') {
              iconName = focused ? 'ios-home' : 'ios-home';
            } else if (route.name === 'Portfolio') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            } else if (route.name === 'User') {
              iconName = focused ? 'ios-person' : 'ios-person';
            } else if (route.name === 'Categories') {
              iconName = focused ? 'ios-folder' : 'ios-folder';
            } 
            // else if (route.name === 'History') {
            //   iconName = focused ? 'ios-checkbox-outline' : 'ios-checkbox-outline';
            // }
            // You can return any component that you like here! <ion-icon name="folder-open-outline"></ion-icon>
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          
        })
        }
        tabBarOptions={{
          activeTintColor: colors.secondary, //'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        
        <Tab.Screen name="ManageStaff" component={StafflistStack} />
        <Tab.Screen name="Dashboard" component={DashboardStack} />
        <Tab.Screen name="Categories" component={CategorieStack} />
        <Tab.Screen name="Portfolio" component={PortStack} />
        <Tab.Screen name="User" component={User } />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





export default MagagerApp;