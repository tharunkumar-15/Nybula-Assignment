import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../CustomButton';
import {signOut} from 'firebase/auth';
import {auth, db, storage} from '../config';
import {doc, getDoc, updateDoc, onSnapshot} from 'firebase/firestore';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from '../Redux/Actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePicker from 'react-native-image-crop-picker';
import CustomInput from '../CustomInput';
import {ref, getDownloadURL, uploadBytesResumable} from 'firebase/storage';

function UserProfileTab({navigation}) {
  const [userdata, setUserdata] = useState([]);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState({
    Name: '',
    Address: '',
    Caregiverno: '',
  });
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [inputValue, setInputValue] = useState('');
  const {user} = useSelector(state => state.useReducer);
  const [availability, setAvailability] = useState(true);


  useEffect(() => {
    Userdata();
  }, []);
  const uploadimage = async () => {
    console.log('upload function called');
    const blobImage = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError('Newtork error failed'));
      };
      xhr.responseType = 'blob';
      xhr.open('GET', imagePath, true);
      xhr.send(null);
    });
    const metadata = {
      contentType: 'image/jpeg',
    };
    const storageRef = ref(storage, 'Userimage/' + Date.now());
    const snapshot = await uploadBytesResumable(
      storageRef,
      blobImage,
      metadata,
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    const Imageref = doc(db, 'Users', user);
    const storageStatus = await updateDoc(Imageref, {
      UserImage: downloadURL,
    });
    console.log('downloadURL', downloadURL);
    setIsImageUploaded(true); 
  };
  useEffect(() => {
    if (imagePath !== '' && !isImageUploaded) {
    
      uploadimage();
      setImagePath('');
    } else if (isImageUploaded) {
      // <-- Reset state variable to false after image upload
      setIsImageUploaded(false);
    }
  }, [imagePath, isImageUploaded]);

  const Userdata = async () => {
    try {
      const UserRef = doc(db, 'Users', user);
      onSnapshot(UserRef, doc => {
        setUserdata(doc.data());
      });
    } catch (error) {
      console.log(error);
    }
  };

  function takePhoto() {
    console.log('captured');
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        console.log(image.path);
        setImagePath(image.path);
      })
      .catch(error => {
        console.log('Error taking photo:', error);
      });
  }
  const modalHandler = () => {
    setModal(prevstate => !prevstate);
  };
  const submitbutton = async () => {
    const UserRef = doc(db, 'Users', user);
    await updateDoc(UserRef, {
      Name: update.Name,
    }).then(() => {
      setModal(!modal);
      setInputValue('');
      setModal(!modal);
    });
  };
  const logout = () => {
    try {
      signOut(auth).then(() => {
        AsyncStorage.removeItem('UserData').then(() => {
          dispatch(setUser(''));
          navigation.navigate('userloginpage');
        });
      });
    } catch (error) {
      Alert(error)
    }
  };

  const toggleAvailability = () => {
    setAvailability(!availability);

    const UserRef = doc(db, 'Users', user);
     updateDoc(UserRef, {
      Availability:availability,
    })
  };

  return (
    <View style={styles.usercontainer}>
      <View style={styles.userdetails}>
        {userdata.UserImage && userdata.UserImage !== ''? (
            <TouchableOpacity onPress={() => takePhoto()}>
              <Image
                source={{uri: userdata.UserImage}}
                style={styles.userimage}
              />
            </TouchableOpacity>
          
        ) : (
          <TouchableOpacity onPress={() => takePhoto()}>
            <Image
              source={require('../Userimageicon.png')}
              style={styles.userimage}
            />
          </TouchableOpacity>
        )}
        {userdata.Name && (
          <Text style={styles.datacontainer}>Name: {userdata.Name}</Text>
        )}
        {userdata.Email && (
          <Text style={styles.datacontainer}>Email: {userdata.Email}</Text>
        )}
      <View style={styles.tooglecontainer}>
        <Text style={styles.toggleText}>Availability:</Text>
        <TouchableOpacity style={styles.toggleicon} onPress={toggleAvailability}>
        {userdata.Availability?<FontAwesome name="toggle-on" size={40} color="black"/>:
          <FontAwesome name="toggle-off" size={40} color="black"/>
        }
        </TouchableOpacity>
      </View>
      </View>
      <View style={styles.buttonstyle}>
        <CustomButton buttonTitle="Sign Out" onPress={() => logout()} />
        <CustomButton
          buttonTitle="Edit Profile"
          onPress={() => modalHandler()}
        />
        <Modal
          visible={modal}
          onRequestClose={() => modalHandler()}
          animationType="fade"
          transparent={true}>
          <View style={styles.modalstyle}>
            <View style={styles.modalbackground}>
              <Entypo
                size={35}
                color={'black'}
                name="cross"
                onPress={() => modalHandler()}
                style={styles.cross}
              />
              <CustomInput
                placeholderText="Name"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={text => setUpdate({...update, Name: text})}
                Icon={Ionicons}
                Icontype="person-outline"
                value={update}
              />
              <CustomButton
                buttonTitle="Submit"
                onPress={() => submitbutton()}
              />
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}
export default UserProfileTab;

const styles = StyleSheet.create({
  usercontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 50,
  },
  userdetails: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datacontainer: {
    textAlign: 'center',
    color: 'black',
    fontSize: 19,
    margin: 7,
    fontWeight: 'bold',
    marginTop: 25,
  },
  buttonstyle: {
    flex: 1.5,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalstyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalbackground: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F6F3',
    borderRadius: 7,
    padding: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  userimage: {
    width: 150,
    height: 150,
    borderRadius: 80,
    marginBottom: 20,
    backgroundColor: '#F8F6F3',
  },
  cross: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingBottom: 10,
  },
  toggleText: {
    color: 'black',
    fontSize: 19,
    fontWeight: 'bold',
    marginTop:15,
    marginBottom: 18,
  },
  toggleicon:{
    marginLeft:10,
    marginTop:10,
  },
  tooglecontainer:{
    flexDirection:'row'
  }
});
