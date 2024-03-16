import {View, Text, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {fonts, forms} from '../style/cpt';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Square_btn from '../buttons/Square_btn';

type Prop = {
  placeholder?: string;
  style?: ViewStyle | ViewStyle[];
  onChange?: (text: string) => void;
  onSearch?: () => void;
};

const Search = (props: Prop) => {
  const [text, setText] = useState('');
  return (
    <View style={[forms.search_Cont]}>
      <TextInput
        style={[fonts.text, {width: '70%'}, props?.style]}
        value={text}
        placeholderTextColor={Colors.slate}
        onChangeText={text => {
          setText(text);
          props?.onChange && props?.onChange(text);
        }}
        placeholder={props?.placeholder || 'Search'}
      />

      <Square_btn svg='Search'button={{
        btnStyle: {
            backgroundColor: Colors.white,
            borderWidth: 0,
        },
        onPress: () => {
          props?.onSearch && props?.onSearch();
        },
      }}/>
    </View>
  );
};

export default Search;
