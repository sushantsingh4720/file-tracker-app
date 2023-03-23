import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Account from './app/screens/Account';
import Home from './app/screens/Home';
import AvatarButton from './app/components/AvatarButton';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
          options={({ navigation, route }) => ({
            headerTitle: "Lets Track",
            headerRight: () => (
              <AvatarButton navigation={navigation}/>
            ),
          })}
        />
        <Stack.Screen name="Account" component={Account} />
      </Stack.Navigator>
      <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
