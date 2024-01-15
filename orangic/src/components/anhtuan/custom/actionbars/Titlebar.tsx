import {View, Text, TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import Square_btn from '../buttons/Square_btn';
import {Colors, actionbars, btn, fonts, svg, txt} from '../style/cpt';

type Prop = {
  title?: txt;
  left?: btn;
  svgLeft?: keyof typeof svg;
  svgRight?: keyof typeof svg;
  right?: btn;
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
      />
    </View>
  );
};

export default Titlebar;
