import { StyleSheet, View, Image, Pressable } from 'react-native'
// import { RNCamera } from 'react-native-camera'
import React, { useState } from 'react'
import { Text, Snackbar } from 'react-native-paper';
import NewFileButton from '../components/NewFileButton';

const Home = ({navigation}) => {
  const [snackbarText, setSnackbarText] = useState("")
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);

  return (
    <View style={styles.wraper}>
      <View style={styles.row}>
        <NewFileButton setSnackbarText={setSnackbarText} setSnackbarVisibility={setSnackbarVisibility}/>
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
        <View style={{alignItems:"center", flex: 1}}>
        </View>
        <View>
        <Snackbar
          visible={snackbarVisibility}
          onDismiss={() => setSnackbarVisibility(false)}
          action={{
              label: 'Close'
          }}>
          {snackbarText}
        </Snackbar>
        </View>
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
    },
    
})