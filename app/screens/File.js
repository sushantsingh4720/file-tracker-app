import { StyleSheet, View, Image, FlatList } from 'react-native'
import React, { useEffect, useContext, useState } from 'react'
import axios from 'axios';
import AuthContext from '../store/authContext';
import {REACT_APP_URL} from "@env";
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import RNPrint from 'react-native-print';

const File = ({route, navigation}) => {
    const { fileId } = route.params;
    const [ history, setHistory ] = useState([]);
    const [ file, setFile ] = useState({});
    const [ qr, setQr ] = useState("");
    const authCtx = useContext(AuthContext);
    const [ isLoading, setIsLoading] = useState(false)

    const getFileData = async ()=>{
        setIsLoading(true)
        const resp = await axios(`${REACT_APP_URL}/api/file/history/${fileId}`, {
            method: 'GET',
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${authCtx.token}`
            }
        });
        const response = resp.data;
        if(response.data.history){
            // console.log(response.data);
            setHistory(response.data.history.reverse());
            setFile(response.data.file);
            setQr(response.data.qr);
        }
        setIsLoading(false)
    }
    useEffect(()=>{
        getFileData();
    }, [])

    const printHTML = async () => {
        await RNPrint.print({
          html: `<Image source={{uri: data:image/jpeg;base64,${qr}}} style={{ width: 150, height: 150, marginBottom: 20, alignSelf: 'center'}}/>`,
        });
    };
    

    if( isLoading ){
        return <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <ActivityIndicator size='large' color='#2277ee'/>
            </View>
    }
    return (
        <View style={styles.container}>
            <Text variant='headlineMedium' style={{paddingBottom: 20, alignSelf: 'center'}}>{file.fileName}</Text>
            <Image source={{uri: `data:image/jpeg;base64,${qr}`}} style={{ width: 150, height: 150, marginBottom: 20, alignSelf: 'center'}}/>
            {/* <Button onPress={()=> printHTML()}>Print</Button> */}
            <FlatList
                data={history}
                keyExtractor={(item, index) => index}
                renderItem= { ({item, index}) => {
                    return(
                        <View style={{ marginBottom:6, borderWidth: 1 , backgroundColor: index%2 ? "BFC0C0" : "#DFE3DE", borderColor: "grey"}}>
                            <Text style={{borderBottomWidth: 1, paddingLeft: 5, paddingRight: 5, paddingBottom: 2, borderColor: "grey"}}>{item.userId.firstName + " " + item.userId.lastName}</Text>
                            { item.info && <Text style={{borderBottomWidth: 1, paddingLeft: 5, paddingRight: 5, borderColor: "grey"}}>{item.info}</Text> }
                            <Text style={{ paddingLeft: 5, paddingRight: 5, borderColor: "grey"}}>{item.reachedAt}</Text>
                        </View>
                )} }
            />

        </View>
    )
}

export default File

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:20
    },
})