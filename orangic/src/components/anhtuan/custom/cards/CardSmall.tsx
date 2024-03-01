import {View, Text, Image, ViewStyle} from 'react-native';
import React from 'react';
import {Colors, cards, fonts} from '../style/cpt';
import CardRate from '../lists/CardRate';
import TimeMade from '../../../../assets/ics/time_made.svg';

type Prop = {
  style?: ViewStyle | ViewStyle[];
  name?: string;
  time?: string;
  image?: any;
  rate?: number;
  rateCount?: number;
};

const CardSmall = (props: Prop) => {
  return (
    <View style={[cards.small_Cont,  props.style]}>
      <Image
        style={[cards.small_Cont, {height: 147}]}
        source={props?.image || require('../../../../assets/imgs/foodPoster1.jpg')}
      />
      <CardRate style={[{bottom: 60}]} rate={props?.rate} rateCount={props?.rateCount}/>
      <View style={[cards.small_NameCont]}>
        <Text style={fonts.sublineBold}>{props?.name || "CardSmall"}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TimeMade width={20} height={20} fill={Colors.orange} />
          <Text style={[fonts.subline, {marginLeft: 5}]}>{props?.time || "10 - 15 mins"}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardSmall;
