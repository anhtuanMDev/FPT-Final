import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import React, {
  useState,
} from 'react';

import {Colors, fonts} from '../../custom/style/cpt';
import {screens} from '../../custom/style/scn';

import Logo from '../../../../assets/imgs/emptyStore.svg';

import Titlebar from '../../custom/actionbars/Titlebar';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import { useNavigation } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from '../../../../../App';

// <-*-- The Start of NoRestoScreen Component --*-> //

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NoRestoScreen'>;

const NoRestoScreen = () => {

  const navigation = useNavigation<ScreenNavigationProp>();


  return (
    <View style={[screens.main_Cont]}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <Titlebar
        title={{text: 'Your Restaurant'}}
        left={{btnStyle: {opacity: 0}}}
        right={{btnStyle: {opacity: 0}}}
      />
      <View style={[screens.noRes_Cont]}>
        <Logo width={312} height={332} />
        <Text style={[fonts.sublineBold, {marginVertical: 20}]}>
          We can't seem to find your Restaurant.
        </Text>
        <Fluid_btn
          text={{
            text: 'Let create one',
          }}
          button={{onPress: () => {
            navigation.push('CreateRestaurant');
          }}}
        />
      </View>
    </View>
  );
};

export default NoRestoScreen;
