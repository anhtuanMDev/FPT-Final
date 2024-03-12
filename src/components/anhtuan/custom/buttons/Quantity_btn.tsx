import {
  TouchableOpacity,
  TouchableHighlight,
  Text,
  ColorValue,
} from 'react-native';
import React from 'react';
import {Colors, btn, buttons} from '../style/cpt';
import Add from '../../../../assets/ics/add.svg';
import Minus from '../../../../assets/ics/minus.svg';

type Prop = {
  button?: btn;
  type: 'plus' | 'minus';
  color?: ColorValue;
};

const Quantity_btn = (props: Prop) => {
  const {button, type, color} = props;

  return (
    type === 'minus' ? (
      <TouchableOpacity
      activeOpacity={0.6}
        style={[buttons.minus_Cont, button?.btnStyle]}
        onPress={() => button?.onPress()}>
        <Minus width={24} height={24} fill={color || Colors.orange} />
      </TouchableOpacity>
    ) : (
      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={Colors.ember}
        style={[buttons.add_Cont, button?.btnStyle]}
        onPress={() => button?.onPress()}>
        <Add width={24} height={24} fill={color || Colors.white} />
      </TouchableHighlight>
    )
  );
};

export default Quantity_btn;
