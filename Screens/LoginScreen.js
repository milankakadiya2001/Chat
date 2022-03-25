import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/core';
const {height, width} = Dimensions.get('window');
import Img from '../assets/Img/image';
import {auth} from '../Firebase';
import firebase from 'firebase/compat/app';
import {getAuth, onAuthStateChanged} from 'firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SingUp = () => {
    navigation.navigate('Register');
  };

  useEffect(() => {
    console.log('inuseEfect');
    // const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      console.log(authUser);
      if (authUser) {
        navigation.navigate('Home');
      }
    });
    console.log(unsubscribe);
    return unsubscribe;
  }, []);
  const SingIn = () => {
    console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.page}>
          <Image source={Img.main} style={styles.img} resizeMode={'contain'} />
          <View style={styles.title}>
            <Text style={styles.titletext}>Talk Mates</Text>
          </View>
          <View style={styles.inputcontainer}>
            <Image source={Img.user} style={styles.icon} />
            <TextInput
              placeholder="email"
              autoFocus
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.inputcontainer}>
            <Image source={Img.password} style={styles.icon} />
            <TextInput
              placeholder="password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.i} onPress={SingIn}>
            <Text style={styles.btntext} KeyboardAvoiding="false">
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.i} onPress={SingUp}>
            <Text style={styles.btntext}>Register</Text>
          </TouchableOpacity>
          <View style={{marginBottom: 22}}></View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  page: {
    // backgroundColor: 'skyblue',
    // padding: 100,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  title: {
    // marginVertical: 20,
    position: 'absolute',
  },
  imgcontainer: {},
  img: {
    height: '25%',
    width: '100%',
  },
  titletext: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 170,
  },
  inputcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    height: 20,
    width: 20,
    position: 'absolute',
    marginLeft: 9,
    tintColor: '#2C5F2D',
  },
  input: {
    width: 250,
    borderColor: '#2C5F2D',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    padding: 10,
    paddingLeft: 40,
    marginVertical: 15,
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    letterSpacing: 1,
  },
  btntext: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
  i: {
    borderColor: '#2C5F2D',
    borderWidth: 2,
    padding: 8,
    marginVertical: 10,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
    backgroundColor: '#2C5F2D',
  },
});
