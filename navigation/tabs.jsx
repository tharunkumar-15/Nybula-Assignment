import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import UserPage from '../screens/UserPage';
import UserProfileTab from '../screens/UserProfileTab';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          elevation: 0,
          backgroundColor: '#51087E',
          height: 60,
        },
        //tabBarIconStyle:{display:"none"},
        headerShown: false,
        ...styles.shadow,
      }}>
      <Tab.Screen
        name="Home"
        component={UserPage}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./AddUser.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Appointment
              </Text>
            </View>
          ),
          headerShown: true,
          headerStyle: {
            backgroundColor: '#51087E',
            height:80,
          },
          headerTintColor: '#ffffff',
          headerTitle: 'Nybula',
          headerTitleStyle: {
            fontSize: 27, 
            fontFamily: "serif",
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="User Profile"
        component={UserProfileTab}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{alignItems: 'center', justifyContent: 'center', top: 5}}>
              <Image
                source={require('./user.png')}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#ffffff' : '#9F8BCC',
                }}
              />
              <Text
                style={{color: focused ? '#ffffff' : '#9F8BCC', fontSize: 12}}>
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default Tabs;
