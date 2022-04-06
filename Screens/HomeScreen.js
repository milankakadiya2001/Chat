import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import CustomListItem from '../Components/CoustomList';
import {Avatar} from 'react-native-elements';
import icons from '../assets/Icons/icons';
import {auth, db} from '../Firebase';
import {ScrollView} from 'react-native-gesture-handler';
import {StackActions} from '@react-navigation/routers';

const HomeScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);
  const SignOut = () => {
    auth
      .signOut()
      .then(() => {
        // navigation.dispatch(StackActions.popToTop());
        navigation.reset({
          index: 0,
          routes: [{name: 'Login'}],
        });
      })
      .catch(error => alert(error.message));
  };
  const EditPress = () => {
    navigation.navigate('Edit');
  };

  useEffect(() => {
    const unsubscribe = db.collection('chats').onSnapshot(snapshot =>
      setChats(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data(),
        })),
      ),
    );
    return unsubscribe;
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Meet Up',
      headerStyle: {backgroundColor: '#fff'},
      headerTitleStyle: {Color: 'black'},
      headerTintColor: 'black',
      // headerTintWidth: 2,
      headerLeft: () => (
        <View style={{marginLeft: 5}}>
          <TouchableOpacity activeOpacity={0.5} onPress={SignOut}>
            <Avatar
              rounded
              source={{
                uri: 'https://qph.fs.quoracdn.net/main-qimg-f48a79de0d1667c27d61df7ff6b9f2d2.webp',
              }}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            marginRight: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 80,
            marginRight: 5,
          }}>
          <TouchableOpacity activeOpacity={0.5} onPress={null}>
            <Image source={icons.Camera} style={{height: 25, width: 25}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={EditPress}>
            <Image source={icons.Edit} style={{height: 25, width: 25}} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  const enterChat = (id, chatName) => {
    navigation.navigate('Chat', {
      id,
      chatName,
    });
  };
  return (
    <View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          marginVertical: 10,
          justifyContent: 'center',
          textAlign: 'center',
        }}>
        Hey {auth?.currentUser?.displayName}
      </Text>
      <ScrollView style={{height: '100%'}}>
        {chats.map(({id, data: {chatName}}) => (
          <CustomListItem
            key={id}
            id={id}
            chatName={chatName}
            enterChat={enterChat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
