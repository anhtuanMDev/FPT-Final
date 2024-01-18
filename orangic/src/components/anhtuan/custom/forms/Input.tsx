import {View, Text, TextInput, ViewStyle} from 'react-native';
import React, { useState } from 'react';
import {fonts, forms} from '../style/cpt';

type Prop = {
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  onChange?: (text:string) => void;
};

const Input = (props: Prop) => {
    const [text,setText] = useState('');
  return (
    <View style={[forms.input_Cont, props?.style]}>
      <TextInput
        style={[fonts.text, {width: '100%'}]}
        value={text}
        onChangeText={(text) => {
            setText(text)
            props?.onChange && props?.onChange(text)
        }}
        placeholder={props?.placeholder || 'Placeholder'}
      />
    </View>
  );
};

export default Input;
