import {View, Text, StatusBar} from 'react-native';
import React from 'react';
import {screens} from '../../custom/style/scn';
import Titlebar from '../../custom/actionbars/Titlebar';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import DishFavoriteScreen from './DishFavoriteScreen';
import RestaurantFavoriteScreen from './RestaurantFavoriteScreen';
import {Colors, fonts} from '../../custom/style/cpt';
import Restaurant from '../../../../assets/ics/restaurant.svg';
import Food from '../../../../assets/ics/food.svg';
import {SvgProps} from 'react-native-svg';

const Tab = createMaterialTopTabNavigator();

const Favorite = () => {
  return (
    <View style={[screens.main_Cont, {backgroundColor: 'white'}]}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <Titlebar
        left={{
          btnStyle: {borderWidth: 0},
        }}
        right={{
          btnStyle: {borderWidth: 0},
        }}
        title={{
          text: 'Danh sách yêu thích',
        }}
      />

      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarLabel: ({focused, color}) => {
            let label;
            color = focused ? Colors.orange : Colors.slate;
            let IconComponent: SvgProps | any;
            if (route.name === 'Favorite Dishes') {
              IconComponent = Food;
              label = 'Món ăn yêu thích';
            } else if (route.name === 'Favorite Restaurants') {
              IconComponent = Restaurant;
              label = 'Nhà hàng yêu thích';
            }
          
            return (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <IconComponent width={20} height={20} fill={color} />
                <Text style={{ color, marginLeft: 8 }}>{label}</Text>
              </View>
            );
          },
          tabBarIndicatorStyle: {
            backgroundColor: Colors.orange,
          }
        })}>
        <Tab.Screen name="Favorite Dishes" component={DishFavoriteScreen} />
        <Tab.Screen
          name="Favorite Restaurants"
          component={RestaurantFavoriteScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

export default Favorite;
