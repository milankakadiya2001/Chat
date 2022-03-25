import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {Avatar} from 'react-native-elements';
import {auth, db} from '../Firebase';
import icons from '../assets/Icons/icons';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
// import * as firebase from 'firebase'
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const ChatScreen = ({navigation, route}) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const Backbtn = () => {
    navigation.navigate('Home');
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: 'right',
      title: 'Chat',
      headerBackTitleVisible: false,

      headerTitle: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          {/* <Avatar
            rounded
            source={{
              uri: 'https://gravatar.com/avatar/af31bfb1fdf769d85eaa62ad93a9c525?s=400&d=mp&r=x',
            }}
          /> */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: '700',
              color: '#fff',
              // marginLeft: 10,
            }}>
            {route.params.chatName}
          </Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity activeOpacity={0.5} onPress={Backbtn}>
          <Image
            source={icons.Down}
            style={{height: 24, width: 24, tintColor: 'white'}}
          />
        </TouchableOpacity>
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
          <TouchableOpacity activeOpacity={0.5}>
            <Image source={icons.videocall} style={styles.iconimg} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={icons.call} style={styles.iconimg} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const sendMessage = () => {
    Keyboard.dismiss();

    db.collection('chats').doc(route.params.id).collection('message').add({
      timestamps: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput('');
  };

  useEffect(() => {
    const unsubscribe = db
      .collection('chats')
      .doc(route.params.id)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map(doc => ({
            id: doc.id,
            data: doc.data(),
          })),
        ),
      );
      return unsubscribe
  }, [route]);
  return (
    <SafeAreaView style={styles.maincontainer}>
      {/* <Text>{route.params.chatName}</Text> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={90}
        style={styles.container}>
        <ScrollView style={{paddingTop: 15}} >
          {messages.map(({id, data}) => 
            data.email === auth.currentUser.email ? (
                <View key={id} style={styles.receiver} >
                  <Avatar/>
                  <Text style={styles.receivertext} >{data.message} </Text>
                </View>
            ) : 
            (
              <View style={styles.sender}>
                  <Avatar/>
                  <Text style={styles.sendertext} >{data.message} </Text>
                </View>
            )
          )}
          <Text>hello</Text>
        </ScrollView>
        <View style={styles.footer}>
          <TextInput
            placeholder="Send Message"
            style={styles.inputfield}
            value={input}
            onChangeText={text => setInput(text)}
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity
            onPress={sendMessage}
            activeOpacity={0.3}
            style={styles.sendbtn}>
            <Image source={icons.send} style={styles.iconsend} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  iconimg: {
    height: 25,
    width: 25,
    tintColor: '#fff',
  },
  maincontainer: {
    flex: 1,
    backgroundColor: '#C0C0C0',
  },
  container: {
    flex: 1,
  },
  receiver : {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    alignItems: 'flex-end',
    marginRight: 20,
    marginBottom: 20,
    maxWidth: '80%',
    position: 'relative'


  },
receivertext : {

},
sender : {
  padding: 15,
  backgroundColor: '#2C5F2D',
  borderRadius: 20,
  alignItems: 'flex-start',
  marginRight: 20,
  marginBottom: 20,
  maxWidth: '80%',
  position: 'relative'
},
sendertext : {

},
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15,
  },
  inputfield: {
    bottom: 0,
    height: 40,
    // flex: 1,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 12,
    width: '85%',
    paddingLeft: 22,
  },
  iconsend: {
    height: 25,
    width: 25,
    tintColor: '#fff',
  },
  sendbtn: {
    backgroundColor: '#2C5F2D',
    padding: 7,
    borderRadius: 5,
    marginLeft: 10,
    paddingHorizontal: 12,
  },
});
