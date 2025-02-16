import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect, useContext } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Modal, Portal, Button, Text, ActivityIndicator } from 'react-native-paper';
import { REACT_APP_URL } from "@env";
import axios from 'axios';
import AuthContext from '../store/authContext';

const TakeInFileButton = ({setSnackbarVisibility, setSnackbarText}) => {
    const authCtx = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [ scannerVisibility, setScannerVisibility ] = useState(false);
    const [scanResult, setScanResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
        };

        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
        checkResult(data);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }


    // function to take file in
    const takeFileIn = async (fileId)=>{
        setIsLoading(true)
        const body  ={
            info:  `File recieved by ${authCtx.firstName} ${authCtx.lastName}.`
        }
        console.log(body)
        const resp = await axios.post(`${REACT_APP_URL}/api/file/history/${fileId}`, body, {
          method: 'POST',
          headers:{
              'content-type': 'application/json',
              'Authorization': `Bearer ${authCtx.token}`
          }})
        const response = resp.data;
        if( response.status === "success" ){
            setSnackbarVisibility(true)
            setSnackbarText("File Spot updated successfully")
        }
        else{
            setSnackbarVisibility(true)
            setSnackbarText("Failed to update file spot")
        }
        setIsLoading(false)
        setScanned(false)
        setScanResult(null)
        setScannerVisibility(false)
      }
    const checkResult = async (res) => {
        setIsLoading(true)
        try{
            const resp = await axios.get(`${REACT_APP_URL}/api/file/${res}`, {
                method: 'GET',
                headers:{
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${authCtx.token}`
                }
              });
              const response = resp.data;

              if( response.status === "success" ){
                setScanResult({
                    flag: true,
                    msg: `Do you want to take file "${response.data.file.fileName}"`,
                    fileId: response.data.file.fileId
                })
                console.log( response.data.file );
              }
              else{
                setSnackbarVisibility(true)
                setSnackbarText("QR don't belong to our domain.")
                setScanResult({
                    flag: false,
                    msg: `QR don't belong to our domain.`
                })
              }
        }
        catch(err){
            console.log(err)
            setSnackbarVisibility(true)
            setSnackbarText("QR don't belong to our domain.")
            setScanResult({
                flag: false,
                msg: `QR don't belong to our domain.`, 
            })
        }
        setIsLoading(false)
    }
    return (
        <View style={{paddingTop: 20}}>
            <Button contentStyle={styles.card}
                onPress={() => setScannerVisibility(true)}
                textColor='black'
                >
                    <Text style={styles.cardText}> Take In File </Text>
            </Button>
            <View>
                <Portal>
                <Modal visible={scannerVisibility} onDismiss={()=> setScannerVisibility(false)} contentContainerStyle={styles.modal}>
                    <Text variant='titleLarge' >Taking File In</Text>
                    <View style={styles.container}> 
                        {   !scanned &&
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={StyleSheet.absoluteFillObject}
                            />
                        }
                        {
                            !scanned &&
                            <Text style={{color:"grey", position:'absolute', bottom: 60, right: 10 }}>Scanning...</Text>
                        }
                        {
                            isLoading &&
                            <ActivityIndicator size='small' color='#395FD0' />
                        }
                        
                        { scanResult && 
                            <View>
                                <Text variant='titleSmall'>{scanResult.msg}</Text>
                                {
                                    !scanResult.flag && 
                                    <View style={{paddingTop:20}}>
                                        <Button onPress={() => {
                                            setScanned(false)
                                            setScanResult(null)
                                        }} mode="contained">Tap to Scan Again</Button>
                                    </View>
                                }
                                {
                                    scanResult.flag &&
                                    <View style={styles.row}>
                                        <Button mode="contained" 
                                        disabled={isLoading}
                                        onPress={() => {
                                            setScanned(false)
                                            setScanResult(null)
                                            setScannerVisibility(false)
                                        }}>NO</Button>
                                        <Button mode="contained" 
                                        disabled={isLoading}
                                        onPress={() =>{
                                            takeFileIn(scanResult.fileId)
                                        }}>YES</Button>
                                    </View>
                                }
                                
                            </View>
                        }
                    </View>
                </Modal>
                </Portal>
            </View>
        </View>
  )
}

export default TakeInFileButton

const styles = StyleSheet.create({
    card:{
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
    },
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10
    },
    absoluteFillObject:{
        width: 100,
        height: 100
    },
    modal:{
        // flex:0.5,
        height: 500,
        backgroundColor: 'white',
        padding: 20,
        marginHorizontal: 20,
        borderRadius: 10
    },
    cardText:{
        fontSize: 16,
        fontWeight: 700
    },
    row:{
        paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between' 
    }
})