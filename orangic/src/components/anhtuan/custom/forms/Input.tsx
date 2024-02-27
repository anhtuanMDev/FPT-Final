import {View, Text, TextInput, ViewStyle} from 'react-native';
import React, { useState } from 'react';
import {Colors, fonts, forms} from '../style/cpt';

type Prop = {
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  onChange?: (text:string) => void;
};

const Input = (props: Prop) => {
    const [text,setText] = useState('');
  return (
      <TextInput
        style={[fonts.text, {width: '100%'},forms.input_Cont, props?.style]}
        value={text}
        placeholderTextColor={Colors.slate}
        onChangeText={(text) => {
            setText(text)
            props?.onChange && props?.onChange(text)
        }}
        placeholder={props?.placeholder || 'Placeholder'}
      />
  );
};

export default Input;
