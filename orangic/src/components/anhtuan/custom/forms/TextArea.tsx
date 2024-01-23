import {View, Text, TextInput, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {fonts, forms} from '../style/cpt';

type Prop = {
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  onChange?: (text: string) => void;
};

const TextArea = (props: Prop) => {
  const [text, setText] = useState('');
  const [count, setCount] = useState(text.length);
  return (
    <View style={[forms.textArea_Cont, props?.style]}>
      <TextInput
        multiline={true}
        maxLength={300}
        numberOfLines={6}
        style={[fonts.text, {textAlignVertical: 'top'}]}
        value={text}
        onChangeText={text => {
          setText(text);
          setCount(text.length);
          props?.onChange && props?.onChange(text);
        }}
        placeholder={props?.placeholder || 'Placeholder'}
      />

      <Text style={[fonts.text, {position: 'absolute', bottom: 10, right: 20}]}>{count}/300</Text>
    </View>
  );
};

export default TextArea;
