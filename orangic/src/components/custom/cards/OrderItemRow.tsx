import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import {fonts} from '../styles/ComponentStyle';
import {Colors} from '../styles/ScreenStyle';

type Prop = {
  title: string;
  content: string;
  style?: ViewStyle | ViewStyle[];
  subValue?: string;
};

const OrderItemRow = (props: Prop) => {
  const {title, content, style, subValue} = props;
  return (
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10,
          },
          style,
        ]}>
        <Text style={[fonts.sublineBold, {color: Colors.slate}]}>{title}</Text>
        {subValue ? (
          <Text
            style={[
              fonts.sublineBold,
              {color: Colors.slate, textDecorationLine: 'line-through'},
            ]}>
            {content} {subValue}
          </Text>
        ) : null}
        <Text
          style={[
            fonts.sublineBold,
            {color: subValue ? Colors.black : Colors.slate},
          ]}>
          {content}
        </Text>
      </View>
  );
};

export default OrderItemRow;
