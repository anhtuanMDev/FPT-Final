import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {Colors, fonts, forms} from '../style/cpt';

type Prop = {
  name?: string;
  style?: ViewStyle | ViewStyle[];
};

const Tags = (props: Prop) => {
  return (
    <Text
      style={[
        fonts.subline,
        forms.tag_Cont,
        {color: Colors.slate},
        props?.style,
      ]}>
      {props?.name || 'Tags'}
    </Text>
  );
};

export default Tags;
