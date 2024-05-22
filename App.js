import { StatusBar } from 'expo-status-bar';
import React from 'react';
import AppStack from './Navigations/AppStack';
import AuthContextProvider from './Navigations/AuthContext';
export default function App() {
  return (
   <>
   <AuthContextProvider>
      <StatusBar
        headerTintColor="white"
        backgroundColor="#fcba03"
        translucent={false}
      />

      <AppStack />
    </AuthContextProvider>
   </>
  );
}


