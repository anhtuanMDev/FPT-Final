import { View, Text, Image, ViewStyle } from 'react-native';
import React from 'react';
import CheckBox from '@react-native-community/checkbox';
import Quantity_btn from '../buttons/Quantity_btn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Colors } from '../styles/ScreenStyle';
import { fonts } from '../styles/ComponentStyle';

type Prop = {
  image?: any;
  name?: string;
  intro?: string;
  price?: number;
  quantity?: number;
  originalPrice?: number;
  onPress?: () => void;
  onDel?: () => void;
  add?: () => void;
  minus?: () => void;
  value?: boolean;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
};

const CartItems = (props: Prop) => {
  const leftAction = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          props?.onDel && props?.onDel();
        }}
        style={{
          width: 110,
          flex: 1,
          backgroundColor: Colors.ember,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            fonts.titleBold,
            {
              color: Colors.white,
            },
          ]}>
          Xóa
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={leftAction}>
      <View
        style={[
          {
            backgroundColor: Colors.white,
            flexDirection: 'row',
            height: 110,
            paddingVertical: 5,
            paddingLeft: 2,
            paddingRight: 10,
          },
          props?.style,
        ]}>
        <View
          style={{
            shadowColor: Colors.orange,
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
          <Image
            source={
              props?.image || require('../../../assets/images/baseImage.png')
            }
            style={[
              {
                width: 100,
                height: 100,
                borderRadius: 20,
              },
            ]}
          />
        </View>
        <View style={[{ flex: 1, marginLeft: 10 }]}>
          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
            ]}>
            <Text
              style={[fonts.titleBold]}

            >{(props?.name && props.name.length > 12 ? props.name.slice(0, 12) + "..." : props.name) || 'CartItems'}</Text>
            <CheckBox
              value={typeof props?.value != undefined ? props?.value : false}
              onChange={() => {
                props?.onPress && props?.onPress();
              }}
              tintColors={{ true: Colors.orange, false: Colors.slate }}
            />
          </View>
          <Text
            style={[
              fonts.subline,
              { flex: 1, color: Colors.slate, marginVertical: 5 },
            ]}>
            {props?.intro || 'This is a description'}
          </Text>
          {
            (props?.originalPrice && props?.price) &&
            (props?.originalPrice > props?.price) &&

            <Text style={[fonts.text, { color: Colors.slate, textDecorationLine: "line-through" }]}>
              {props?.originalPrice || '0'}.000 đ
            </Text>
          }


          <View
            style={[
              {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: 5,
              },
            ]}>
            <Text style={[fonts.sublineBold, { color: Colors.orange }]}>
              {props?.price || '0'}.000 đ</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
              <Quantity_btn
                type="minus"
                onPress={() => {
                  props?.minus && props?.minus();
                }}
              />
              <Text style={[fonts.subline, { marginHorizontal: 8 }]}>
                {props?.quantity || '0'}
              </Text>
              <Quantity_btn
                type="plus"
                onPress={() => {
                  props?.add && props?.add();
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default CartItems;
