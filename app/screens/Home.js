import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
// import { RNCamera } from 'react-native-camera'
import React, { useState } from 'react'

const Home = ({navigation}) => {

  return (
    <View style={styles.wraper}>
      <View style={styles.row}>
        <Pressable style={({ pressed }) => [
        {
          transform: [{
            scale: pressed ? 1.07 : 1
          }],
          backgroundColor: '#2277ee'
        },
        styles.card, styles.rowCard]}>
            <Image source={require('../assets/add_files.png')} style={{ width: 100, height: 100}}/>
            <Text style={styles.cardText}> New File</Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
        {
          transform: [{
            scale: pressed ? 1.07 : 1
          }],
          backgroundColor: '#2277ee'
        },
        styles.card, styles.rowCard]}
        onPress={() => navigation.navigate("ExistingFiles")}
        >
            <Image source={require('../assets/existing_files.png')} style={{ width: 100, height: 100}}/>
            <Text style={styles.cardText}> Existing Files </Text>
        </Pressable>
      </View>
      <Pressable style={({ pressed }) => [
        {
          transform: [{
            scale: pressed ? 1.07 : 1
          }],
          backgroundColor: '#2277ee'
        },
        styles.card, styles.columnCard]}>
            <Text style={styles.cardText}> Take In File </Text>
        </Pressable>
        <Pressable style={({ pressed }) => [
        {
          transform: [{
            scale: pressed ? 1.07 : 1
          }],
          backgroundColor: '#2277ee'
        },
        styles.card, , styles.columnCard]}>
            <Text style={styles.cardText}> Send Out File </Text>
        </Pressable>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    wraper:{
        flex: 1,
        padding: 20,
        backgroundColor: '#dee4f7'
    },
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    card:{
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardText:{
        fontSize: 16,
        fontWeight: 700
    },
    rowCard: {
        width: 160,
        height: 200,
    },
    columnCard:{
        // width: 100,
        height: 100,
        marginTop: 20
    }
})