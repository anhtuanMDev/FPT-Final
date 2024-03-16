import {View, Text, ViewStyle, Dimensions, Image} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors, cards, fonts} from '../style/cpt';
import CardRate from '../lists/CardRate';
import {BlurView} from '@react-native-community/blur';
import HeartFill from '../../../../assets/ics/heart_fill.svg';
import TimeMade from '../../../../assets/ics/time_made.svg';
import Delivery from '../../../../assets/ics/delivery.svg';

type Prop = {
  style?: ViewStyle | ViewStyle[];
  name?: string;
  intro?: string;
  time?: string;
  image?: any;
  rate?: number;
  rateCount?: number;
  price?: number;
  favorite?: boolean;
  onLongPress?: () => void;
  onPress?: () => void;
  type?: 'Restaurant' | 'Food';
};

const HomeCardBig = (props: Prop) => {
  //delaying render icon in big card
  const [isBlurViewReady, setIsBlurViewReady] = useState(false);
  const onLayout = () => {
    setIsBlurViewReady(true);
  };

  return (
    <TouchableOpacity
      style={[cards.big_Cont, {elevation: 5, flex: 1}, props.style]}
      onLongPress={() => {
        props?.onLongPress && props?.onLongPress();
      }}
      onPress={() => {
        props?.onPress && props.onPress();
      }}>
      <Image
        style={[{height: 147, width: '100%'}]}
        borderRadius={15}
        resizeMode="cover"
        source={
          props?.image || require('../../../../assets/imgs/big_baseImg.png')
        }
      />
      <CardRate
        style={[{top: 20, left: 10}]}
        rate={props?.rate}
        rateCount={props?.rateCount}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 10,
          right: 10,
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <BlurView
          style={{
            width: 30,
            height: 30,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onLayout={onLayout}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="white">
          {isBlurViewReady && (
            <HeartFill
              width={18}
              height={18}
              fill={props?.favorite ? Colors.ember : Colors.white}
            />
          )}
        </BlurView>
      </View>
      {props?.type && props?.type == 'Food' ? (
        <View style={[cards.small_NameCont]}>
          <Text style={fonts.sublineBold}>
            {props?.name || 'HomeCardSmall'}
          </Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TimeMade width={20} height={20} fill={Colors.orange} />
              <Text
                style={[
                  fonts.subline,
                  {marginLeft: 5, textAlignVertical: 'center'},
                ]}>
                {props?.time || '10 - 15 mins'}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TimeMade width={20} height={20} fill={Colors.orange} />
              <Text
                style={[
                  fonts.subline,
                  {marginLeft: 5, textAlignVertical: 'center'},
                ]}>
                {props?.time || '10 - 15 mins'}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View style={[cards.small_NameCont]}>
          <Text style={fonts.sublineBold}>
            {props?.name || 'HomeCardSmall'}
          </Text>
          <Text style={fonts.subline}>
            {props?.intro || 'HomeCardSmall Introduction'}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default HomeCardBig;
