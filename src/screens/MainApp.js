import React from 'react';

import { enableScreens } from 'react-native-screens';
//import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Button, StyleSheet } from 'react-native';

import {Remark, Vsf, Skip} from '../components';

import Dashboard from './Dashboard'
import ListAppls from './ListAppls'
import User from './User'
import Maps from './Maps'
import { MAIN_COLOR2 } from '../styles'


enableScreens();
//const Stack = createNativeStackNavigator();
const Stack =  createStackNavigator();

function MyStack(props) {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="List" 
        component={ListAppls}  
        options={{
          headerStyle: {
            backgroundColor: MAIN_COLOR2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => (
            <Button
              onPress={() => {
                //alert('This is a button!')
                props.navigation.navigate('Portfolio', { screen: 'Maps' });
                }}
              title="Maps"
              backgroundColor="#465881"
            />
          ),
        }}
      />
      <Stack.Screen 
        name="Remark" 
        component={Remark} 
        options={{
          headerStyle: {
            backgroundColor: MAIN_COLOR2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen 
        name="Vsf" 
        component={Vsf} 
        options={{
          headerStyle: {
            backgroundColor: MAIN_COLOR2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      <Stack.Screen 
        name="Skip" 
        component={Skip}
        options={{
          headerStyle: {
            backgroundColor: MAIN_COLOR2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
      
     
      <Stack.Screen 
        name="Maps" 
        component={Maps}
        options={{
          headerStyle: {
            backgroundColor: MAIN_COLOR2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />
       
      
      
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