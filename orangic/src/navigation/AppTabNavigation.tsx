import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigateType, ParamList} from './RootNavigation';
import RestaurantLiked from '../components/khanhduy/screen/RestaurantLiked';
import DishLiked from '../components/khanhduy/screen/DishLiked';
import RestaurantComment from '../components/khanhduy/screen/RestaurantComment';
import DishComment from '../components/khanhduy/screen/DishComment';
import RestaurantReport from '../components/khanhduy/screen/RestaurantReport';
import Home from '../components/anhtuan/screen/home/Home';
import Favorite from '../components/anhtuan/screen/favorite/Favorite';
import Address from '../components/anhtuan/screen/address/Address';
import Store from '../components/anhtuan/screen/store/StoreScreen';
import Cart from '../components/anhtuan/screen/cart/Cart';

import HomeIcon from '../assets/ics/home.svg';
import StoreIcon from '../assets/ics/store.svg';
import FavoriteIcon from '../assets/ics/heart_fill.svg';
import AddressIcon from '../assets/ics/location.svg';
import CartIcon from '../assets/ics/shop.svg';
import {Colors} from '../components/anhtuan/custom/style/cpt';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { selectUserID } from '../helper/state/userStack/login/loginSlice';
import FoodDetail from '../components/anhtuan/screen/detail/FoodDetail';

const Tab = createBottomTabNavigator<ParamList>();
const Stack = createNativeStackNavigator<ParamList>();

type UserStackType = {
  name: keyof ParamList;
  component: any;
  options: any;
};
const AppTabScreen = () => {
  const id = useSelector(selectUserID);
  console.log("AppTabScreen id: ", id)
  return (
    <Tab.Navigator
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = focused ? (
            <HomeIcon fill={Colors.orange} />
          ) : (
            <HomeIcon fill={Colors.slate} />
          );
        } else if (route.name === 'Favorite') {
          iconName = focused ? (
            <FavoriteIcon fill={Colors.orange} />
          ) : (
            <FavoriteIcon fill={Colors.slate} />
          );
        } else if (route.name === 'Address') {
          iconName = focused ? (
            <AddressIcon fill={Colors.orange} />
          ) : (
            <AddressIcon fill={Colors.slate} />
          );
        } else if (route.name === 'Restaurant') {
          iconName = focused ? (
            <StoreIcon fill={Colors.orange} />
          ) : (
            <StoreIcon fill={Colors.slate} />
          );
        } else if (route.name === 'Cart') {
          iconName = focused ? (
            <CartIcon fill={Colors.orange} />
          ) : (
            <CartIcon fill={Colors.slate} />
          );
        }
        return iconName;
      },
    })}>
    <Tab.Screen
      name="Home"
      component={Home as any}
      initialParams={{id: id}}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
    <Tab.Screen
      name="Favorite"
      component={Favorite as any}
      initialParams={{id: id}}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
    <Tab.Screen
      name="Address"
      component={Address as any}
      initialParams={{id: id}}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
    <Tab.Screen
      name="Restaurant"
      component={Store as any}
      initialParams={{id: id}}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
    <Tab.Screen
      name="Cart"
      component={Cart as any}
      initialParams={{id: id}}
      options={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    />
  </Tab.Navigator>
  )
}
const AppTabNavigation = () => {
  const id = useSelector(selectUserID);
  return (
    <Stack.Navigator initialRouteName='FoodDetail'>
      <Stack.Screen
        name="AppTabScreen"
        component={AppTabScreen}
        options={{headerShown: false}}/>
        {AppTab.map((item: NavigateType, index: number) => (
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

const AppTab: UserStackType[] = [
  {
    name: 'FoodDetail',
    component: FoodDetail,
    options: {headerShown: false},
  },
  {
    name: 'RestaurantLiked',
    component: RestaurantLiked,
    options: {headerShown: false},
  },
  {
    name: 'DishLiked',
    component: DishLiked,
    options: {headerShown: false},
  },
  {
    name: 'RestaurantComments',
    component: RestaurantComment,
    options: {headerShown: false},
  },
  {
    name: 'RestaurantReport',
    component: RestaurantReport,
    options: {headerShown: false},
  },
  {
    name: 'DishComments',
    component: DishComment,
    options: {headerShown: false},
  },
];

export default AppTabNavigation;
