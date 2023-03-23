import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import React from 'react'

const AvatarButton = ({navigation}) => {
  return (
    <Pressable onPress={()=>{
        navigation.navigate('Account')
    }}>
        <Image source={{ uri:'https://picsum.photos/200'}} style={{width: 40, height: 40, borderRadius: 50}}></Image>
    </Pressable>
  )
}

export default AvatarButton

const styles = StyleSheet.create({})