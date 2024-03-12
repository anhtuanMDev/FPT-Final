import {View, Text, TextStyle, ViewStyle, ColorValue} from 'react-native';
import React from 'react';
import Square_btn from '../buttons/Square_btn';
import {Colors, actionbars, btn, fonts, svg, txt} from '../style/cpt';

type Prop = {
  title?: txt;
  left?: btn;
  right?: btn;
  svgLeft?: keyof typeof svg;
  svgRight?: keyof typeof svg;
  colorLeft?: ColorValue;
  colorRight?: ColorValue;
  barStyle?: ViewStyle | ViewStyle[];
};

const Titlebar = (props: Prop) => {
  const {title, left, right} = props;
  return (
    <View style={[actionbars.container, props?.barStyle]}>
      <Square_btn
        svg={props?.svgLeft}
        button={{
          btnStyle: left?.btnStyle,
          onPress: left?.onPress,
        }}
        color={props?.colorLeft}
      />
      <Text style={[fonts.titleBold, title?.textStyle]}>
        {title?.text || 'Topbar'}
      </Text>
      <Square_btn
        svg={props?.svgRight}
        button={{
          btnStyle: right?.btnStyle,
          onPress: right?.onPress,
        }}
        color={props?.colorRight}
      />
    </View>
  );
};

export default Titlebar;
