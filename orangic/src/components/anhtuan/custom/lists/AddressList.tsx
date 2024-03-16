import {View, Text, ViewStyle} from 'react-native';
import React from 'react';
import Square_btn from '../buttons/Square_btn';
import {fonts} from '../style/cpt';

type Prop = {
  style?: ViewStyle | ViewStyle[];
  address?: string;
  detail?: string;
  onPress?: () => void;
};

const AddressList = (props: Prop) => {
  return (
    <View
      style={[
        {
          width: '100%',
          paddingLeft: 20,
          paddingVertical: 10,
          paddingRight: 5,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        props?.style,
      ]}>
      <View style={{justifyContent: 'space-between', height: 50}}>
        <Text style={[fonts.sublineBold, {}]}>
          {props?.address || 'Address'}
        </Text>
        <Text style={[fonts.subline, {}]}>
          {props?.detail || "Address's detail"}
        </Text>
      </View>
      <Square_btn
        svg="Edit"
        button={{
          btnStyle: {borderWidth: 0},
          onPress() {
            props?.onPress && props?.onPress();
          },
        }}
      />
    </View>
  );
};

export default AddressList;
