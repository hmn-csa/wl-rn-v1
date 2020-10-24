import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Button } from 'react-native';

import { Home, List, Item } from '../components';

import Dashboard from './Dashboard'
import ListAppls from './ListAppls'
import User from './User'


const TestDrawerItem = (props) => (
  <View>
    <Text>
      Đây là component được hiển thị liên kết dưới dạng link trong Drawer
    </Text>
  </View>
);

const ItemDrawer = createDrawerNavigator({
  'Item': Item,
  'Link đến TestDrawerItem function component': TestDrawerItem
});

const ListItemStack = createStackNavigator({
  'List': List,
  'Item': ItemDrawer
});

const IndexNavigator = createBottomTabNavigator({
  'Home': Home,
  'List': ListItemStack
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === "Home") {
        iconName = `ios-home`;
      } else if (routeName === "List") {
        iconName = `ios-analytics`;
      }
      return <Ionicons name={iconName} size={25} color={tintColor} />;
    }
  })
});

const MainApp = createAppContainer(IndexNavigator);

export default MainApp;