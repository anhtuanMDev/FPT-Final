import {View, Text} from 'react-native';
import React, { useEffect } from 'react';
import {Store} from 'redux';
import {RootState} from '../helper/state/store';
import {NavigationContainer, NavigationProp, useNavigation} from '@react-navigation/native';
import UserStackNavigation from './UserStackNavigation';
import AppTabNavigation from './AppTabNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';
import { selectUserID } from '../helper/state/userStack/login/loginSlice';

export type RootNavigateProp = {
  store: Store<RootState>;
};

export type NavigateProp = {
  id: string;
};

export type NavigateType = {
  name: keyof ParamList;
  component: any;
  options: any;
};

export enum ParamsScreenEnum {
  // Login
  Splash = 'Splash',
  Wk = 'Wk',
  Login = 'Login',
  Register = 'Register',
  Confirm = 'Confirm',
  Congratulation = 'Congratulation',
  EnterAddress = 'EnterAddress',
  ForgotPassword = 'ForgotPassword',

  // APP TAB
  Home = 'Home',
  // Search = 'Search',
  // Orders = 'Orders',
  // AccountSetting = 'AccountSetting',

  //Navigation
  // AppNavigation = 'AppNavigation',
  UserNavigation = 'UserNavigation',
  // AccountStackNavigation = 'AccountStackNavigation',
}

export type ParamList = {
  // USER STACK

  // Login
  Splash: undefined | { id: string};
  Wk: undefined | { id: string};
  Login: undefined | { id: string};
  Register: undefined | { id: string};
  Confirm: undefined | { id: string};
  EnterAddress: undefined | { id: string};
  ForgotPassword: undefined | { id: string};
  Congratulation: undefined | { id: string};

  // APP TAB
  AppTabScreen: undefined | { id: string};
  Home: undefined | { id: string;}
  Favorite: undefined | { id: string};
  Address: undefined | { id: string};
  Restaurant: undefined | { id: string};
  Cart: undefined | { id: string};

  HiddenStack: undefined | { id: string};

  // Comment and rating
  DishComments: undefined | { id: string};
  RestaurantComments: undefined | { id: string};

  // Favorite
  DishLiked: undefined | { id: string};
  RestaurantLiked: undefined | { id: string};

  // Report
  DishReport: undefined | { id: string};
  RestaurantReport: undefined | { id: string};

  UserNavigation: undefined | { id: string};

  FoodDetail: undefined | { id: string};
};

const RootNavigation = (prop: RootNavigateProp) => {
  const {store} = prop;
  const isLogin = useSelector(selectUserID);
  const fullfilled = useSelector(selectUserID);
  const id = useSelector(selectUserID);

  useEffect(() => {
    if (isLogin) {
      AsyncStorage.setItem('userID', id);
      console.log('set userID')
    }
  }, [id]);

  console.log('RootNavigation', id, isLogin, fullfilled)
  return (
    <NavigationContainer>
      {id ? (
        <UserStackNavigation />
      ) : (
        <AppTabNavigation />
      )}
      {/* <UserStackNavigation/> */}
    </NavigationContainer>
  );
};

export default RootNavigation;
