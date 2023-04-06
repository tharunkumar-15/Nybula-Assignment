import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import {doc, getDocs,collection,query} from 'firebase/firestore';
import {useSelector} from 'react-redux';
import { db } from '../config';


export default function UpcomingAppointments() {
  const [data, setData] = useState([]);
  const { user } = useSelector((state) => state.useReducer);

  useEffect(() => {
    getUserData();
  },[]);

  const getUserData = async (userId) => {
    try {
      const userRef = doc(db, "Users", user);
      const appointmentQuery = query(collection(userRef, "Appointment"));

      const snapshot = await getDocs(appointmentQuery);
      const appointments = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      console.log("Meetings:", appointments);
      setData(appointments);
    } catch (error) {
      console.log(error);
      return { error: error.message };
    }
  };

  return (
    <View style={styles.cardscontainer}>
      {data.length === 0 ? (
        <Text style={styles.Nomeetings}>No upcoming meetings with others</Text>
      ) : (
        <View style={styles.cards}>
          {data.map((meeting) => (
            <View key={meeting.id}>
              <View style={styles.firstcontent}>
                <Text style={styles.firstcontenttext}>Date:{meeting.data.Date}</Text>
                <Text style={styles.firstcontenttext}>Time:{meeting.data.Time}</Text>
              </View>
              <View>
                <Text style={styles.firstcontenttext}>Title:{meeting.data.Title}</Text>
                <Text style={styles.firstcontenttext}>Agenda:{meeting.data.Agenda}</Text>
                <Text style={styles.firstcontenttext}>Name:{meeting.data.GuestName}</Text>
              </View>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardscontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  cards: {
    backgroundColor: "#51087E",
    width: "90%",
    padding: 18,
    marginBottom: 20,
    borderRadius: 10,
    margin: 5,
    marginRight: 10,
  },
  remaininfo: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  firstcontent: {
    flexDirection: "row",
  },
  firstcontenttext: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
    textAlign: "center",
    padding: 7,
  },
  Nomeetings:{
    color:'black',
    fontSize:18,
  }
});
