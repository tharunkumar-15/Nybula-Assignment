#Nybula Assignment

Hi,This is tharun kumar P from New Horizon College ,Bangalore 

The assignment which i choose was Scheduling meeting for teeraforms using an application which is Assignment-1.

To do this assignment i choosed react native for frontend/for building application and for storing data i have choosed firebase cloud storage as backend.

#About React Native 

React Native (also known as RN) is a popular JavaScript-based mobile app framework that allows you to build natively-rendered mobile apps for iOS and Android. The framework lets you create an application for various platforms by using the same codebase.

#About Firebase 

Firebase is a Backend-as-a-Service (Baas). It provides developers with a variety of tools and services to help them develop quality apps, grow their user base, and earn profit. It is built on Google’s infrastructure.

For this assignment i am using Firestore Database to store the user data in the cloud storage.

#Tasks

1.Login and SignUp

The login and signup feature in the react native was implemented using Firebase built in method called signInWithEmailAndPassword and createUserWithEmailAndPassword. Once signup the details will be stored in firebase and then will be navigated to login page. The user has to login in using the details which was entered during signup. Once user is signed up he can use the application to book appointments.Async Storage is used in the application so that user need not to login again when he opens the app fonce again/later.

#About Async Storage 
React Native AsyncStorage is a simple, unencrypted, asynchronous, persistent, storage system which stores the data globally in the app. It store data in the form of a key-value pair.

2.Schedule Metting

The meeting will be scheduled based on the availability of other users. If the user is availabe only then the user can book meeting with other users. To make user available for meeting with other user. He has enable the Availability option which is presented in Profile Tab to true.

The data like title,agenda,date,time and Guestname are to entered by the user through the input box. Once data is entered correctly the data will e stored in Firestore Database.

3.Upadate profile tab 

In profile tab there is Edit Profile button which will be used to edit the user details like Name and password.

4.Upcoming Meetings 

Once user enter details of meeting and submits it the data is stored so the data stored is fetched and displayed in Upcoming meetings.

5.Mark off-Hours

In profile Tab the user can Disable the availability then no meeting will be scheduled with him by other users.

/***Note***/


As cloud storage is private the data cant be accessed by others. If database access is needed then Email is needed to provide permission 

