import {
  View,
  Text,
  Dimensions,
  Image,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import CardRate from './CardRate';
import {cards, fonts} from '../styles/ComponentStyle';
import Icons, {IconName} from '../../../assets/icons/Icons';
import {Colors} from '../styles/ScreenStyle';
import Icons2, { Icon2Name } from '../../../assets/icons/Icons2';

const width = Dimensions.get('window').width * 0.38;
const height = Dimensions.get('window').height * 0.25;
type Prop = {
  style?: ViewStyle | ViewStyle[];
  name?: string;
  time?: string;
  image?: string;
  rate?: number;
  rateCount?: number;
  price?: number;
  favorite?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};
const SmallCart = (props: Prop) => {
  const {
    style,
    name,
    time,
    image,
    rate,
    rateCount,
    price,
    favorite,
    onPress,
    onLongPress,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        onPress && onPress();
      }}
      style={[
        {
          width,
          height,
          borderRadius: width / 10,
          backgroundColor: Colors.white,
          elevation: 5,
          overflow: 'hidden',
        },
        style,
      ]}>
      <Image
        source={
          image ? {uri: image} : require('../../../assets/images/baseImage.png')
        }
        style={{width: '100%', height: '60%'}}
      />

      <View
        style={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 25,
          elevation: 5,
          position: 'absolute',
          backgroundColor: Colors.white,
          top: 10,
          right: 10,
          zIndex: 1,
        }}>
        {favorite ? (
          <Icons2 name={Icon2Name.love} color={Colors.orange} size={18} />
        ) : (
          <Icons name={IconName.like} color={Colors.black} size={18} />
        )}
      </View>

      <CardRate
        style={[{bottom: '35%', left: 10}]}
        rate={rate}
        rateCount={rateCount}
      />

      <View style={[cards.small_NameCont]}>
        <Text style={fonts.sublineBold}>{name || 'HomeCardSmall'}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icons name={IconName.order} color={Colors.orange} size={16} />
          <Text
            style={[
              fonts.text,
              {marginLeft: 5, flex: 1, textAlignVertical: 'center'},
            ]}>
            {time || '10 - 15 mins'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SmallCart;
