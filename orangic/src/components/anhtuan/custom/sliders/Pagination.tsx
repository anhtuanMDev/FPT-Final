import {View, Dimensions, Animated} from 'react-native';
import React, { useEffect } from 'react';
import {Colors, fonts, sliders} from '../style/cpt';

type Prop = {
  data: any[];
  scrollX: Animated.Value;
};

const {width} = Dimensions.get('screen');

const Pagination = (props: Prop) => {
  return (
    <View style={[sliders.pagination_Cont]}>
      {props.data.map((item, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];

        // Change pagination indicator width when scroll with outputRange
        const dotWidth = props.scrollX.interpolate({
          inputRange,
          outputRange: [12, 30, 12],
          extrapolate: 'clamp',
        });

        const backgroundColor = props.scrollX.interpolate({
          inputRange,
          outputRange: [Colors.slate,Colors.orange,Colors.slate,],
          extrapolate: 'clamp',
        });
        return (
          <Animated.View
            key={index}
            style={[sliders.pagination_Item, {width: dotWidth,backgroundColor}]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;
