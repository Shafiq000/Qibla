import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Home from "../Screens/Home";
import Setting from "../Screens/Setting";
import MoreApps from "../Screens/MoreApps";
function AppStack() {
  return (
    <NavigationContainer>
   <Stack.Navigator  screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Setting" component={Setting}/>
        <Stack.Screen name="MoreApps" component={MoreApps}/>
      </Stack.Navigator> 
    </NavigationContainer>
  );
}

export default AppStack;