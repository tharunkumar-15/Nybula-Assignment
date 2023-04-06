import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
// import AppStack from './AppStack';
// import AuthStack from './AuthStack';
import LoginPage from './login';
import Tabs from './navigation/tabs';
import SignupPage from './signup';
import {Provider} from 'react-redux';
import {Store} from './Redux/Store';

function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{header: () => null}}>
          <Stack.Screen
            name="userloginpage"
            component={LoginPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Signpage"
            component={SignupPage}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="UserPage" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
export default App;
