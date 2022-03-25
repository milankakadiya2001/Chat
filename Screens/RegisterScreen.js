import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {auth} from '../Firebase';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Registration',
    });
  }, [navigation]);

  const register = async () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        authUser.user.updateProfile({
          displayName: name,
          photoUrl:
            profileUrl ||
            'https://cencup.com/wp-content/uploads/2019/07/avatar-placeholder.png',
        });
      })
      .catch(error => alert(error.message));
    //  await navigation.replace('Home')
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
     
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.page}>
          <View style={{marginTop: 10}}></View>
        <Text style={styles.title}>Create a Account with chatApp</Text>
        <View style={styles.inputcontainer}>
          <TextInput
            placeholder="full name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            extContentType="emailAddress"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            autoCompleteType="email"
          />
          <TextInput
            placeholder="password"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            placeholder="profile picture url"
            style={styles.input}
            value={profileUrl}
            onChangeText={setProfileUrl}
            onSubmitEditing={register}
          />
          <TouchableOpacity style={styles.i} onPress={register}>
            <Text style={styles.btntext}>Register</Text>
          </TouchableOpacity>
          <View style={{marginBottom: 80}}></View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    borderColor: '#2C5F2D',
    // borderWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 15,
    borderRadius: 10,
    fontSize: 16,
    color: 'black',
    fontWeight: '700',
    letterSpacing: 1,
  },
  inputcontainer: {
    marginVertical: 22,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    marginVertical: 18,
  },
  page: {
    // backgroundColor: 'skyblue',
    height: '100%',
    justifyContent: 'center'
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
  btntext: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1,
  },
});
