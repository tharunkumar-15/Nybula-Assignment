import React, {useState, useEffect} from 'react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import {auth} from './config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import {GoogleSignin} from '@react-native-google-signin/google-signin';
import CustomButton from './CustomButton';
import {useDispatch} from 'react-redux';
import {setUser} from './Redux/Actions';
import CustomInput from './CustomInput';

function LoginPage({navigation}) {
  // const navigation = useNavigation();
  // const {user} = useSelector(state => state.useReducer);
  const dispatch = useDispatch();

  const [email, setemail] = useState(null);
  const [password, setpassword] = useState(null);
  const [isloaded, setisloaded] = useState(true);
  useEffect(() => {
    getdata();
    getuid();
  }, []);

  const getdata = () => {
    try {
      AsyncStorage.getItem('UserData').then(value => {
        if (value != null) {
          setisloaded(false);
          navigation.reset({
            index: 0,
            routes: [{name: 'UserPage'}],
          });
        } else {
          setisloaded(false);
        }
      });
    } catch (e) {
      alert(e);
    }
  };
  const getuid = () => {
    try {
      AsyncStorage.getItem('UserUid').then(value => {
        if (value != null) {
          dispatch(setUser(value));
        }
      });
    } catch (e) {
      alert(e);
    }
  };

  const forgotpassword = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('Password reset email has been sent successfully');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const login = async () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        var user1 = {
          Email: email,
          Password: password,
        };
        await AsyncStorage.setItem('UserData', JSON.stringify(user1));
        dispatch(setUser(userCredential.user.uid));
        await AsyncStorage.setItem('UserUid', userCredential.user.uid);
        navigation.replace('UserPage');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
      });
  };

  return (
    <View style={styles.loginmainpage}>
      {isloaded ? (
        <View>
          <ActivityIndicator size="large" color="black" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{alignItems: 'center'}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.appcontainer}>
            <Text style={styles.appname}>Nybula</Text>
            <Image
              source={require('./nybula.png')}
              style={styles.loginimage}
              resizeMode="stretch"
            />
          </View>
          <Text style={styles.loginpagetext}>Login</Text>
            <CustomInput
              placeholderText={'Email'}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => setemail(email)}
              keyboardType="email-address"
              Icon={Fontisto}
              Icontype='email'
            />
            <CustomInput
              placeholderText={'Password'}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => setpassword(password)}
              Icon={AntDesign}
              Icontype='lock'
            />
          <CustomButton
            onPress={() => login()}
            buttonStyle={{
              backgroundColor: '#f95999',
              margin: 10,
              width:'50%',
            }}
            buttonTitle="Login"
          />
          <Text style={styles.forgotpassword} onPress={() => forgotpassword()}>
            Forgot Password?
          </Text>
          <Pressable>
          </Pressable>
          <Text
            style={styles.register}
            onPress={() => navigation.navigate('Signpage')}>
            Dont have an account?Create here
          </Text>
        </ScrollView>
      )}
    </View>
  );
}
export default LoginPage;

const styles = StyleSheet.create({
  loginmainpage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F6F3',
    paddingTop: 40,
  },
  appname: {
    fontWeight: 'bold',
    fontSize: 35,
    marginBottom: 20,
    color: 'black',
    textAlign:'center'
  },
  logincontainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginimage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
  },
  loginpagetext: {
    fontWeight: 'bold',
    fontSize: 27,
    color: 'black',
    marginBottom: 15,
    textAlign: 'center',
  },
  register: {
    color: 'black',
    fontSize: 19,
    margin: 15,
    textDecorationLine: 'underline'
  },
  forgotpassword: {
    fontSize: 17,
    color: 'black',
    marginTop: 5,
    marginBottom: 5,
    textDecorationLine: 'underline'
  },
  googlebutton: {
    color: 'red',
    fontSize: 20,
  },
});
