import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomListItem from '../Components/CoustomList';
import {Avatar, Button, Input} from 'react-native-elements';
import icons from '../assets/Icons/icons';
import {db} from '../Firebase';

const HomeScreen = ({navigation}) => {
  const [input, setInput] = useState('');
  const Backbtn = () => {
    navigation.navigate('Home');
  };
  const EditPress = () => {
    navigation.replace('Edit');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add a Chat',
      headerStyle: {backgroundColor: '#2C5F2D'},
      headerTitleStyle: {Color: 'black'},
      headerTintColor: 'white',
      headerLeft: () => (
        <View >
          <TouchableOpacity activeOpacity={0.5} onPress={Backbtn}>
            <Image
              source={icons.Down}
              style={{height: 24, width: 24, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const createChat = async () => {
    await db
      .collection('Chats')
      .add({
        chatName: input,
      })
      .then(() => {
        navigation.replace('Home');
      })
      .catch(error => alert(error));
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <View style={{justifyContent: 'center', height: '100%'}}>
        <View style={{marginTop: 20, paddingHorizontal: 15}}>
          <Input
            value={input}
            onChangeText={text => setInput(text)}
            placeholder="enter user name"
            inputStyle={{fontSize: 20, fontWeight: '500'}}
            onSubmitEditing={createChat}
            leftIcon={
              <Image
                source={icons.user}
                style={{width: 24, height: 24, marginHorizontal: 5}}
              />
            }
          />
          <Button
            onPress={createChat}
            
            activeOpacity={0.5}
            title="Add Friend"
            style={{
              width: '80%',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            buttonStyle={{
              backgroundColor: '#2C5F2D',
              borderRadius: 3,
              borderRadius: 10,
            }}
            titleStyle={{fontSize: 18, fontWeight: '700'}}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
