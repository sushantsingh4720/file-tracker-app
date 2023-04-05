import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from '../store/authContext';


const Account = ({navigation}) => {
    const [user, setUser] = useState(null);
    const authCtx = useContext(AuthContext);
    console.log(authCtx)

    return (
    <View style={styles.wrapper}>
        {/* <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingBottom: 10}}>
            <Pressable style={ styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </Pressable>
            <Text style={{fontSize: 22, fontWeight:900}}>
                account
            </Text>
        </View> */}
        <View style={{alignItems: "center"}}>
            <Image source={{
            uri: authCtx?.profile,
            }}  style={{width: 120, height: 120, borderRadius: 10}}/>
        </View>
        <View style={styles.userBox}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: 700 }}> { authCtx?.firstName + " " + authCtx?.lastName} </Text>
            <Text style={{ color: "white", paddingLeft:2, fontSize: 16, paddingTop: 4 }}> { authCtx.email} </Text>
        </View>

        <View style={ styles.cardRow }>
            <View>
                <Text>
                    My Files
                </Text>
            </View>
            <View>
                <Text>
                    My Files
                </Text>
            </View>
        </View>
        <Pressable onPress={() => {authCtx.logout()
        }} style={ styles.cardRow }>
            <Text>
                Log out
            </Text>
        </Pressable>

        
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#dee4f7',
        padding: 20,
    },
    backButton:{
        position: 'absolute',
        left: 0,
        backgroundColor: '#ffff',
        width: 40,
        height: 40,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: "center"
    },
    backButtonText:{
        fontSize: 20,
        fontWeight: 700
    },
    cardRow: {
        flexDirection: 'row',
        marginTop: 20,
        height: 90,
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userBox:{
        marginTop: 30,
        backgroundColor: '#2C0703',
        borderRadius: 10,
        padding: 20,
        height: 100
    }
})