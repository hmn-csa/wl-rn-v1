import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';  
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Button } from 'react-native';

import {Remark, Vsf, Skip} from '../components';

import Dashboard from './Dashboard'
import ListAppls from './ListAppls'
import User from './User'



const ListItemStack = createStackNavigator({
  'List': ListAppls,
  'Remark': Remark,
  'Vsf': Vsf,
  'Skip': Skip,
});

const IndexNavigator = createBottomTabNavigator({
  'Dashboard': Dashboard,
  'ListAppls': ListItemStack,
  'User': User,
  }, 
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === "Dashboard") {
          iconName = focused
                ? 'ios-information-circle' : 'ios-information-circle-outline';
        } else if (routeName === "ListAppls") {
          iconName = `ios-analytics`;
        } else if (routeName.name === 'User') {
          iconName = `ios-person` ;
        }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    })
  },

);

const MainApp = createAppContainer(IndexNavigator);

export default MainApp;