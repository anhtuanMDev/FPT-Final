import {View, Text, ViewStyle, TextStyle} from 'react-native';
import React from 'react';
import {Colors, fonts} from '../style/cpt';

type Prop = {
    title?: string;
    style?: ViewStyle | ViewStyle[];
    fontsStyle?: TextStyle | TextStyle[];
    barStyle?: ViewStyle | ViewStyle[];
    barLeft?: ViewStyle | ViewStyle[];
}

const TitleList = (props: Prop) => {
  return (
    <View
      style={[{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }, props?.style]}>
      <View style={[{width: 50, height: 2, backgroundColor: Colors.green}, props?.barStyle, props?.barLeft]} />
      <Text style={[fonts.sublineBold, {marginHorizontal: 10}, props?.fontsStyle]}>{props?.title || "TitleList"}</Text>
      <View style={[{flex: 1, height: 2, backgroundColor: Colors.green}, props?.barStyle]} />
    </View>
  );
};

export default TitleList;
