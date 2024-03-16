import {View, Text, ColorValue, ViewStyle} from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';
import {Colors, fonts} from '../style/cpt';
import {screens} from '../style/scn';

type Prop = {
  message: string;
  progressColor: string;
  background: ColorValue;
  style?: ViewStyle | ViewStyle[]
};

const Loading = (props: Prop) => {
  return (
    <View
      style={[
        screens.main_Cont,
        {
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: props?.background || Colors.white,
        },
        props?.style
      ]}>
      <Progress.Circle
        borderWidth={5}
        size={150}
        indeterminate={true}
        thickness={10}
        color={props?.progressColor || Colors.orange}
      />
      <Text
        style={[
          fonts.titleBold,
          {width: 300, textAlign: 'center', marginTop: 30},
        ]}>
        {props?.message || 'We are doing some progress !'}
      </Text>
    </View>
  );
};

export default Loading;
