import {TouchableOpacity, Text, Image} from 'react-native';
import React from 'react';
import {btn, buttons} from '../style/cpt';

type Prop = {
  button?: btn;
  avatar?: any;
};

const Avatar_btn = (props: Prop) => {
  const {button} = props;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[buttons.avatar_Cont, button?.btnStyle]}
      onPress={() => {
        button?.onPress && button.onPress();
      }}>
      <Image
        source={props?.avatar || require('../../../../assets/imgs/jake.jpg')}
        style={[buttons.avatar_Cont]}
      />
    </TouchableOpacity>
  );
};

export default Avatar_btn;
