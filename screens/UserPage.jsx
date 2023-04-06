import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomInput from '../CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import {db} from '../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {
  query,
  where,
  collection,
  onSnapshot,
  addDoc,
  getDocs,
  doc
} from 'firebase/firestore';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../CustomButton';
import UpcomingAppointments from './UpcomingAppointments';

function UserPage() {
  const {user} = useSelector(state => state.useReducer);
  const [fetch, setFetch] = useState([]);
  const [usersData, setUserData] = useState({});

  const [time, setTime] = useState(new Date());
  const [show, setShow] = useState(false);
  const [nameUser, setNameUser] = useState({});
  const [data, setData] = useState({
    Title: '',
    Agenda: '',
    Guestid: '',
    GuestName: '',
    Date: '',
    Time: '',
  });
  const [dateTime, setDateTime] = useState(new Date()); // hold both date and time
  const [show1, setShow1] = useState(false);

  const senddata = () => {
    const appointquery = collection(db, 'Users', data.Guestid, 'Appointment');
    addDoc(appointquery, {
      Title: data.Title,
      Agenda: data.Agenda,
      Guestid: data.Guestid,
      Time: data.Time,
      Date: data.Date,
      GuestName:nameUser.Name
    }).then(() => {
      setData({
        Title: '',
        Agenda: '',
        Guestid: '',
        GuestName: '',
        Date: '',
        Time: '',
      });
      alert('Data sent successfully');
    });
  };
  
  useEffect(()=>{
    try {
      const UserRef = doc(db, 'Users', user);
      onSnapshot(UserRef,(doc) => {
        setNameUser(doc.data() || {});
        console.log(doc.data())
      });
    } catch (error) {
      console.log(error);
    }
},[])


  useEffect(() => {
    appointment();
  }, []);

  useEffect(() => {
    if (fetch.length > 0) {
      let users = {};
      for (let i = 0; i < fetch.length; i++) {
        users = {
          ...users,
          [fetch[i].Userid]: fetch[i].Name,
        };
      }
      setUserData(users);
    }
  }, [fetch]);

  const appointment = () => {
    const q = query(collection(db, 'Users'), where('Availability', '==', true));

    onSnapshot(q, appointmentshot => {
      const appointmentdata = appointmentshot.docs
        .filter(doc => doc.id !== user)
        .map(doc => ({
          ...doc.data(),
        }));
      setFetch(appointmentdata);
      console.log(appointmentdata);
    });
  };

  const onChangeTime = (event, selectedTime) => {
    // Update the state or variable 'setTime'
    setTime(selectedTime);
    // Update the state or variable 'setShow'
    setShow(false);

    setData({...data, Time: selectedTime});
  };

  const showTimepicker = () => {
    setShow(true);
  };

  const onChangeDateTime = (event, selectedTime) => {
    // Update the state or variable 'setDateTime'
    setDateTime(selectedTime);
    // Update the state or variable 'setShow'
    setShow1(false);

    setData({
      ...data,
      Date: selectedTime.toLocaleDateString(),
      Time: selectedTime.toLocaleTimeString(),
    });
  };

  const showDateTimePicker = () => {
    setShow1(true);
  };
  return (
    <View style={styles.appointmentcontainer}>
      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        style={styles.ScrollView}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.appointtext}>Appointment Page</Text>

        <CustomInput
          placeholderText={'Title'}
          autoCapitalize="none"
          autoCorrect={false}
          Icon={MaterialCommunityIcons}
          Icontype="subtitles-outline"
          onChangeText={text => setData({...data, Title: text})}
          value={data}
        />
        <CustomInput
          placeholderText={'Agenda'}
          autoCapitalize="none"
          autoCorrect={false}
          Icon={MaterialCommunityIcons}
          Icontype="view-agenda"
          onChangeText={text => setData({...data, Agenda: text})}
          value={data}
        />
        <Picker
          selectedValue={data.Guestid}
          onValueChange={itemValue =>
            setData({
              ...data,
              Guestid: itemValue,
              GuestName: usersData[itemValue],
            })
          }
          value={data}
          style={{
            height: 50,
            width: 200,
            borderColor: 'black',
            borderWidth: 1,
            marginVertical: 10,
            color: 'black',
            backgroundColor: 'white',
          }}
          itemStyle={{color: 'black'}}
          prompt="Select a Name">
          {Object.keys(usersData).length > 0 &&
            Object.keys(usersData).map(userId => (
              <Picker.Item
                key={userId}
                label={usersData[userId]}
                value={userId}
              />
            ))}
        </Picker>
        <View style={styles.timecontainer}>
          <Text style={styles.timetext}>Pick a time to Schedule Meeting:</Text>
          <TouchableOpacity onPress={showTimepicker}>
            <View style={styles.timePicker}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={35}
                color="black"
                style={styles.timeanddataeicon}
              />
              {/* <Text style={styles.timePickerText}>
                {time.toLocaleTimeString()}
              </Text> */}
            </View>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              value={time}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={onChangeTime}
            />
          )}
        </View>
        <View style={styles.timecontainer}>
          <Text style={styles.timetext}>Pick a Date to Schedule Meeting:</Text>
          <TouchableOpacity onPress={showDateTimePicker}>
            <View style={styles.timePicker}>
              <MaterialCommunityIcons
                name="calendar-clock"
                size={35}
                color="black"
                style={styles.timeanddataeicon}
              />
              {/* <Text style={styles.timePickerText}>
                {dateTime.toLocaleString()}
              </Text> */}
            </View>
          </TouchableOpacity>
          {show1 && (
            <DateTimePicker
              value={dateTime}
              mode="datetime"
              is24Hour={true}
              display="default"
              onChange={onChangeDateTime}
            />
          )}
        </View>
        <CustomButton buttonTitle="Submit" onPress={() => senddata()} />
        <Text style={styles.appointtext}>Upcoming Meeting</Text>
        <UpcomingAppointments />
      </ScrollView>
    </View>
  );
}

export default UserPage;

const styles = StyleSheet.create({
  appointmentcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appointtext: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  timecontainer: {
    flexDirection: 'row',
  },
  timetext: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dropdown: {
    color: 'black',
    fontSize: 20,
  },
  ScrollView: {
    width: '100%',
  },
  upcomingcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingtext: {
    color: 'black',
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  timeanddataeicon: {
    marginTop: 5,
    marginLeft: 10,
  },
});
