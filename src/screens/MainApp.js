import React from 'react'
import { enableScreens } from 'react-native-screens'
//import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
//import { createDrawerNavigator } from '@react-navigation/drawer'
import { TransitionSpecs } from '@react-navigation/stack'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView, View, Text, StyleSheet } from 'react-native'
import { Remark, Vsf, Skip, Search } from '../components'
import { Button } from 'react-native-paper';
import Tree from './Tree'
import Dashboard from './Dashboard'
import ProductCategories from './ProductCategories'
import ListAppls from './ListAppls'
import User from './User'
// import Test from './test'
import Maps from './Maps'
import ListUptrail from './ListUptrail'

import { MAIN_COLOR2 } from '../styles'

import{ styles } from '../styles'


enableScreens()


// navigation.openDrawer();
const Stack = createStackNavigator()
function CategorieStack(props) {

  return (
    <Stack.Navigator
      initialRouteName="Tree"
      screenOptions={{ headerShown: true,}}
    >
      <Stack.Screen 
        name="Tree" 
        component={Tree} 
        
        options={{
          headerStyle: {
            backgroundColor: MAIN_COLOR2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          }, 
          //headerRight: CategorieStackMenu,
          headerRight: () => (
            <View style={buttonStyles.buttons}>
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('Categories', { screen: 'Product' })}
                style={buttonStyles.button}
              >
                Product
              </Button>
          </View>
          )
        }}
        
      />
      <Stack.Screen 
        name="Product" 
        component={ProductCategories}
        options={{
          headerStyle: {
            backgroundColor: MAIN_COLOR2,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          screenOptions: false,
          headerRight: () => (
            <View style={buttonStyles.buttons}>
              <Button
                  mode="contained"
                  onPress={() => props.navigation.navigate('Categories', { screen: 'Tree' })}
                  style={buttonStyles.button}
              >
                Tree
              </Button>
           
          </View>
          )
        }}
      />
    </Stack.Navigator>
  );
}


function PortStack(props) {
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
            <View style={buttonStyles.buttons}>
               <Button
                  mode="contained"
                  onPress={() => props.navigation.navigate('Portfolio', { screen: 'Uptrail' })}
                  style={buttonStyles.button}
              >
                Uptrail
              </Button>

              <Button
                  mode="contained"
                  onPress={() => props.navigation.navigate('Portfolio', { screen: 'Search' })}
                  style={buttonStyles.button}
              >
                Search
              </Button>
              
              <Button
                mode="contained"
                onPress={() => props.navigation.navigate('Portfolio', { screen: 'Maps' })}
                style={buttonStyles.button}
              >
                Maps
              </Button>
            </View>
           
          )
        }}
      />

      <Stack.Screen 
        name="Uptrail" 
        component={ListUptrail} 
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
        name="Search" 
        component={Search} 
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
const buttonStyles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    padding: 2,
  },
  button: {
    marginLeft: 2,
  },
});


const Tab = createBottomTabNavigator();
function MainApp () {
  return (
   
    <NavigationContainer style={styles.container}>
      
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused
                ? 'ios-information-circle' : 'ios-information-circle-outline';
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
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="Categories" component={CategorieStack} />
        <Tab.Screen name="Portfolio" component={PortStack} />
        {/* <Tab.Screen name="History" component={ListUptrail} /> */}
        <Tab.Screen name="User" component={User} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}





export default MainApp;