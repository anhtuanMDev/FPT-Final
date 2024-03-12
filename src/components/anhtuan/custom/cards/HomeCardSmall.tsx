import {View, Text, Image, ViewStyle} from 'react-native';
import React, {useState} from 'react';
import {Colors, cards, fonts} from '../style/cpt';
import CardRate from '../lists/CardRate';
import TimeMade from '../../../../assets/ics/time_made.svg';
import {BlurView} from '@react-native-community/blur';
import HeartFill from '../../../../assets/ics/heart_fill.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';

type Prop = {
  style?: ViewStyle | ViewStyle[];
  name?: string;
  time?: string;
  image?: any;
  rate?: number;
  rateCount?: number;
  price?: number;
  favorite?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
};

const HomeCardSmall = (props: Prop) => {
  // delaying render of icon
  const [isBlurViewReady, setIsBlurViewReady] = useState(false);
  const onLayout = () => {
    setIsBlurViewReady(true);
  };
  return (
    <TouchableOpacity
      style={[cards.small_Cont, {elevation: 5}, props.style]}
      onLongPress={() => {
        props?.onLongPress && props?.onLongPress();
      }}
      onPress={() => {
        props?.onPress && props.onPress();
      }}>
      <Image
        style={[cards.small_Cont, {height: 147}]}
        source={props?.image || require('../../../../assets/imgs/baseImg.png')}
      />
      <CardRate
        style={[{bottom: 60, left: 10}]}
        rate={props?.rate}
        rateCount={props?.rateCount}
      />
      <View style={[cards.small_NameCont]}>
        <Text style={fonts.sublineBold}>{props?.name || 'HomeCardSmall'}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TimeMade width={20} height={20} fill={Colors.orange} />
          <Text
            style={[
              fonts.subline,
              {marginLeft: 5, flex: 1, textAlignVertical: 'center'},
            ]}>
            {props?.time || '10 - 15 mins'}
          </Text>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 10,
          left: 10,
          paddingVertical: 2,
          backgroundColor: Colors.white,
          paddingHorizontal: 7,
          borderRadius: 15,
        }}>
        <Text style={[fonts.textBold, {color: Colors.yellow}]}>
          ${' '}
          <Text style={[fonts.textBold, {color: Colors.black}]}>
            {props?.price || 'price'}
          </Text>
        </Text>
      </View>
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
          blurType="light"
          blurAmount={50}
          onLayout={onLayout}
          reducedTransparencyFallbackColor="white">
          {isBlurViewReady && (
            <HeartFill
              width={16}
              height={16}
              fill={props?.favorite ? Colors.ember : Colors.white}
            />
          )}
        </BlurView>
      </View>
    </TouchableOpacity>
  );
};

export default HomeCardSmall;
