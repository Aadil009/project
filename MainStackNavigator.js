import React,{ Component} from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './components/Home'
import RouteMap from './components/RouteMap'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="LET'S GO PUNEKAR'S" component={Home}
          options={{
            headerTitleAlign:'center'
            //headerTransparent: true,
            // headerBackground: () => (
            //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
            // ),
          }} />
        <Stack.Screen name='RouteMap' component={RouteMap}
        options={{
          headerTitleAlign:'center'
          //headerTransparent: true,
          // headerBackground: () => (
          //   <BlurView tint="light" intensity={100} style={StyleSheet.absoluteFill} />
          // ),
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator











