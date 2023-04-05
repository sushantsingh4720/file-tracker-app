import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './app/screens/MainStack';
import { AuthContextProvider } from './app/store/authContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <MainStack/>
        <StatusBar style="auto" />
      </AuthContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
