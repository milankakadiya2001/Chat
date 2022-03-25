import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar, ListItem } from 'react-native-elements'
import { auth } from '../Firebase'

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem  onPress={() =>enterChat( id, chatName)} key={id} bottomDivider >
      
    <Avatar 
      rounded
      source={{uri : "https://gravatar.com/avatar/af31bfb1fdf769d85eaa62ad93a9c525?s=400&d=mp&r=x",
      }}
    />
    <ListItem.Content>
      <ListItem.Title style={{fontWeight: '700', fontSize: 17}} ><Text>{chatName}</Text></ListItem.Title>
      <ListItem.Subtitle numberOfLines={1} ellipsizeMode='tail' >This is From User</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})