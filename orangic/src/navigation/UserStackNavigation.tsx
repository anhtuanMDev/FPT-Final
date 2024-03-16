import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../components/siduc/screen/login/Login';
import { NavigateType, ParamList} from './RootNavigation';
import Register from '../components/siduc/screen/register/Register';
import EnterAddress from '../components/siduc/screen/register/EnterAddress';
import ForgotPassword from '../components/khanhduy/screen/ForgotPassword/ForgotPassword';
import ForgotPasswordUpdatePassword from '../components/khanhduy/screen/ForgotPassword/ForgotPasswordUpdatePassword';
import ForgotPasswordDone from '../components/khanhduy/screen/ForgotPassword/ForgotPasswordDone';

const Stack = createNativeStackNavigator<ParamList>();


const UserStackNavigation = () => {

  return (
    <Stack.Navigator initialRouteName="Login">
      {UserStack.map((item: NavigateType, index: number) => (
        <Stack.Screen
          key={index}
          name={item.name}
          component={item.component}
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
};

const UserStack: NavigateType[] = [
  {
    name: 'Login',
    component: Login,
    options: {headerShown: false},
  },
  {
    name: 'Register',
    component: Register,
    options: {headerShown: false},
  },
  {
    name: 'EnterAddress',
    component: EnterAddress,
    options: {headerShown: false},
  }, 
  {
    name: 'ForgotPassword',
    component: ForgotPassword,
    options: {headerShown: false},
  },
  {
    name: 'ForgotPasswordUpdatePassword',
    component: ForgotPasswordUpdatePassword,
    options: {headerShown: false},
  },
  {
    name: 'ForgotPasswordDone',
    component: ForgotPasswordDone,
    options: {headerShown: false},
  },
];

export default UserStackNavigation;
