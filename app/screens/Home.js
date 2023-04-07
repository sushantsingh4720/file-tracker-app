import { StyleSheet, View, Image, Pressable, NativeModules } from 'react-native'
// import { RNCamera } from 'react-native-camera'
import { REACT_APP_URL } from  "@env";
import React, { useContext, useState } from 'react'
import { Modal, Portal, Text, Button, TextInput, Snackbar } from 'react-native-paper';
import axios from "axios"
import AuthContext from '../store/authContext';

const Home = ({navigation}) => {
  const authCtx = useContext(AuthContext);
  const [visibleNewFileModel, setVisibleNewFileModel] = useState(false);
  const [snackbarText, setSnackbarText] = useState("")
  const [snackbarVisibility, setSnackbarVisibility] = useState(false);
  const [fileName, setFileName] = useState(null);
  const [description, setDescription] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const showNewFileModal = () => setVisibleNewFileModel(true);
  const hideNewFileModal = () => setVisibleNewFileModel(false);
  const createNewFile = async () =>{
    if( !fileName || ! description){
      setSnackbarText("Fill the details correctly")
      setSnackbarVisibility(true)
      return
    }
    setIsLoading(true)
    const body = { fileName: fileName, description: description}
    const resp =  await axios.post( `${REACT_APP_URL}/api/file`, body, {
      method: 'POST',
      headers:{
        'content-type': 'application/json',
        'Authorization': `Bearer ${authCtx.token}`
      }
    })
    
    const response= resp.data;

    if( response.status === "success"){
      setFileName(null);
      setDescription(null);
      setSnackbarText("Fill created Successfully!")
      setSnackbarVisibility(true)
    }
    
    setIsLoading(false)
  }
  return (
    <View style={styles.wraper}>
      <Portal>
        <Modal visible={visibleNewFileModel} onDismiss={hideNewFileModal} contentContainerStyle={styles.model}>
          <Text variant='titleLarge' style={{paddingBottom: 30}}>Create New File</Text>
          <TextInput
            label="File Name"
            mode="outlined"
            style={{marginBottom: 20}}
            onChangeText={ text => setFileName(text)}
            value={fileName}
          />
          <TextInput
            label="Description"
            style={{marginBottom: 20, height: 80}}
            multiline={true}
            onChangeText={ text => setDescription(text)}
            value={description}
          />
          <Button
            mode="contained-tonal"
            style={{marginBottom: 20}}
            onPress={() => createNewFile()}
            loading={isLoading}
            disabled={isLoading}
          >
            Create
          </Button>
        </Modal>
      </Portal>
      <View style={styles.row}>
        <Pressable style={({ pressed }) => [
        {
          transform: [{
            scale: pressed ? 1.07 : 1
          }],
          backgroundColor: '#2277ee'
        },
        styles.card, styles.rowCard]}
        onPress={()=>showNewFileModal()}
        >
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
        <View style={{alignItems:"center", flex: 1}}>
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
    model:{
      // flex:0.5,
      height: 400,
      backgroundColor: 'white',
      padding: 20,
      marginHorizontal: 20,
      borderRadius: 10
    }
})