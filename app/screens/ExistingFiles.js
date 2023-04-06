import { StyleSheet, View, FlatList } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../store/authContext'
import { REACT_APP_URL } from "@env"
import { ActivityIndicator, Surface, Text } from "react-native-paper";

const ExistingFiles = ({navigation}) => {
    const authCtx = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(false);
    const [files, setFiles] = useState(null);

    const getFiles = async ()=>{
        setIsLoading(true)
        var config = {
            method: "get",
            url: `${REACT_APP_URL}/api/file`,
            headers: {
                Authorization: `Bearer ${authCtx.token}`,
            },
        }
        axios(config)
            .then( async (resp) => {
                console.log(resp.data.data);
                setFiles(resp.data.data.files)
                setIsLoading(false)
                console.log("files", files)
            })
    }

    useEffect(()=>{
        getFiles();
    }, [])

    if( isLoading ){
        return (
            <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
                <ActivityIndicator size="large" color='blue'/>
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <FlatList 
            style={{flex:1}}
            data={files}
            numColumns={2}
            columnWrapperStyle={styles.row}
            renderItem= { ({item}) => {
            return(
                <View style={{paddingBottom: 20}}>
                <Surface elevation={3} style={styles.fileCard} onTouchEnd={()=>console.log(item.fileName)}>
                    <Text variant="titleLarge" style={{paddingBottom:10}}>{item?.fileName}</Text>
                    <Text>{item.description}</Text>
                </Surface>
                </View>
            )}
          } />
    </View>
  )
}

export default ExistingFiles

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: 20
    },
    fileCard:{
        width: 160,
        height:200,
        borderRadius: 10,
        padding: 10
    },
    row:{
        flex: 1,
    justifyContent: "space-evenly"
    }
})