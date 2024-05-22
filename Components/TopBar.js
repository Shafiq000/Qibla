import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Compass from '../TabScreens/Compass';
import Map from '../TabScreens/Map';

const Tab = createMaterialTopTabNavigator();
const TopBar = () => {
  return (
    <View style={{flex:1}}>
       <Tab.Navigator
        screenOptions={{
          lazy:true,
            tabBarPressColor:false,  
            tabBarActiveTintColor: '#ffffff',
            tabBarInactiveTintColor: '#000',
            swipeEnabled:false,
            tabBarAndroidRipple: { borderless: false },
          tabBarStyle: {
            borderRadius:1,
             width:"50%",
             backgroundColor: '#fcba03',
            height:130,
          paddingTop:20,
          paddingLeft:10,
          borderTopWidth: 0,
            elevation: 0,             
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#000',
            height: '25%',
            borderRadius: 30,
           marginBottom:68,
            marginLeft: 10,
            width: '50%',
            
          },
        
          tabBarLabelStyle: { fontSize: 14,textTransform: 'none', },
          // labelStyle: { fontSize: 14,marginTop:20,textTransform: 'none' },
        }}
      >
        <Tab.Screen name="Compass" component={Compass} />
        <Tab.Screen name="Map" component={Map} />
      </Tab.Navigator>
    </View>
  )
}

export default TopBar

const styles = StyleSheet.create({})