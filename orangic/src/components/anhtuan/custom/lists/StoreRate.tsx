import {View, Text, ViewStyle, ColorValue} from 'react-native';
import React from 'react';
import Star from '../../../../assets/ics/star.svg';
import Food from '../../../../assets/ics/food.svg';
import Order from '../../../../assets/ics/order.svg';
import {Colors, fonts, lists} from '../style/cpt';

type Prop = {
  title?: string;
  rate?: number;
  rateCount?: number;
  svg?: 'Food' | 'Order';
  color?: ColorValue;
  hasRate?: boolean;
  style?: ViewStyle | ViewStyle[];
};
const StoreRate = (props: Prop) => {
  return (
    <View style={[lists.storeRate_Cont, props?.style]}>
      <View style={[lists.storeRate_NameCont]}>
        {(() => {
          switch (props?.svg) {
            case 'Food':
              return (
                <Food
                  width={24}
                  height={24}
                  fill={props?.color || Colors.black}
                  style={{marginRight: 10}}
                />
              );
            case 'Order':
              return (
                <Order
                  width={24}
                  height={24}
                  fill={props?.color || Colors.black}
                  style={{marginRight: 10}}
                />
              );
            default:
              return (
                <Star
                  width={24}
                  height={24}
                  fill={props?.color || Colors.black}
                  style={{marginRight: 10}}
                />
              );
          }
        })()}
        <Text style={[fonts.sublineBold]}>
          {props?.title || 'Rating:'}{' '}
          {props?.hasRate && <Text>{props?.rate || 0}</Text>}
        </Text>
      </View>
      <Text style={[fonts.subline]}>{props?.rateCount || 0}</Text>
    </View>
  );
};

export default StoreRate;
