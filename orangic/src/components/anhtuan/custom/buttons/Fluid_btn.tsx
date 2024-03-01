import {TouchableHighlight, Text, ColorValue} from 'react-native';
import React from 'react';
import {buttons, fonts, btn, txt, Colors} from '../style/cpt';

type Prop = {
  button?: btn;
  text?: txt;
  underlayColor?: ColorValue;
};

const Fluid_btn = (props: Prop) => {
  const {button, text, underlayColor} = props;
  return (
    <TouchableHighlight
      activeOpacity={0.49}
      underlayColor={underlayColor || Colors.ember}
      onPress={() => button?.onPress && button?.onPress()}
      style={[buttons.fluid_Cont, button?.btnStyle]}>
      <Text style={[fonts.button, text?.textStyle]}>
        {text?.text || 'Get Started'}
      </Text>
    </TouchableHighlight>
  );
};

export default Fluid_btn;
