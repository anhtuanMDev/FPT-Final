import {TouchableOpacity, Text} from 'react-native';
import React from 'react';
import {Colors, btn, buttons, fonts, txt} from '../style/cpt';

type Prop = {
  button?: btn;
  text?: txt;
};

const Hoverbar_btn = (props: Prop) => {
  const {button, text} = props;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[buttons.hover_Cont, button?.btnStyle]}
      onPress={() => button?.onPress()}>
      <Text style={[fonts.button, {color: Colors.black}, text?.textStyle]}>
        {text?.text || 'Skip'}
      </Text>
    </TouchableOpacity>
  );
};

export default Hoverbar_btn;
