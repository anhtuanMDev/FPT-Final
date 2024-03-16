import {
  View,
  Text,
  ViewStyle,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import React, {useState} from 'react';
import {flexBox} from '../style/flexBox';
import {Colors, fonts, forms} from '../style/cpt';

import Star from '../../../../assets/ics/star.svg';
import TimeMade from '../../../../assets/ics/time_made.svg';
import Delivery from '../../../../assets/ics/delivery.svg';
import BooleanButton from '../button/BooleanButton';
import Tags from '../../../anhtuan/custom/lists/Tags';

type Prop = {
  style?: ViewStyle | ViewStyle[];

  rating?: number;
  numberOfReviews?: number;
  restaurantFeaturedPartnerName?: string;

  freeDelivery?: boolean;
  deliveryfee?: number;
  timeDelivery?: string;

  onBooleanButtonPress?: (value: boolean) => void;
  favorite?: boolean;
  onPress?: () => void;

};

const RestaurantFeaturedPartnerCart = (props: Prop) => {
  const {
    style,
    rating,
    restaurantFeaturedPartnerName,
    numberOfReviews,
    freeDelivery,
    deliveryfee,
    timeDelivery,
    favorite,
    onPress,
    onBooleanButtonPress,
  } = props;

  const [valueTemp, setValueTemp] = useState(favorite ? favorite : false);

  const handleBooleanButtonPress = (value: boolean) => {
    setValueTemp(value);
    props.onBooleanButtonPress && props.onBooleanButtonPress(value);
    console.log(
      'RestaurantFeaturedPartnerCart handleBooleanButtonPress: ',
      value,
    );
  };

  const handlePress = () => {
    onPress && onPress();
    console.log(
      'RestaurantFeaturedPartnerCart handlePress: ',
      restaurantFeaturedPartnerName,
    );
  };

  return (
    <TouchableOpacity
      style={[
        {
          display: 'flex',
          borderRadius: 20,
          elevation: 5,
          backgroundColor: Colors.white,
        },
        style,
      ]}
      onPress={handlePress}>
      <View style={{position: 'relative'}}>
        <Image
          source={require('../../../../assets/imgs/foodPoster1.jpg')}
          style={{
            width: '100%',
            height: 198,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            objectFit: 'cover',
          }}
        />

        <View
          style={[
            flexBox.rowFlexBox,
            flexBox.alignItemsCenter,
            flexBox.justifyContentFlexStart,
            forms.capsule_Cont,
            {position: 'absolute', top: 20, left: 15},
          ]}>
          <Text style={[fonts.sublineBold, {textAlign: 'center'}]}>
            {rating ? rating : '__'}
          </Text>

          <Star fill={Colors.yellow} width={17} height={17} />

          <Text
            style={[fonts.text, {color: Colors.slate, textAlign: 'center'}]}>
            {numberOfReviews
              ? numberOfReviews > 0
                ? numberOfReviews > 30
                  ? '(30+)'
                  : `(${numberOfReviews})`
                : '(0)'
              : '(0)'}
          </Text>
        </View>

        <TouchableWithoutFeedback>
          <View style={{position: 'absolute', top: 10, right: 10}}>
            <BooleanButton
              svg="Heart"
              value={true}
              style={{position: 'absolute', top: 10, right: 10}}
              onPress={handleBooleanButtonPress}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>

      <View
        style={[
          flexBox.columnFlexBox,
          flexBox.alignItemsFlexStart,
          flexBox.justifyContentCenter,
          {
            width: '100%',
            gap: 10,
            padding: 20,
            paddingTop: 10,
            shadowOffset: {width: 10, height: -5},
            shadowColor: Colors.black,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 5,
          },
        ]}>
        <Text style={[fonts.sublineBold]}>
          {restaurantFeaturedPartnerName || 'Partner Name'}
        </Text>


        <View
          style={[
            flexBox.rowFlexBox,
            flexBox.alignItemsCenter,
            flexBox.justifyContentSpaceBetween,
            {width: '100%'},
          ]}>
          <View
            style={[
              flexBox.rowFlexBox,
              flexBox.alignItemsCenter,
              flexBox.justifyContentSpaceBetween,
              {gap: 20},
            ]}>
            <View
              style={[
                flexBox.rowFlexBox,
                flexBox.alignItemsCenter,
                flexBox.justifyContentFlexStart,
              ]}>
              <Delivery fill={Colors.orange} width={25} height={25} />
              <Text style={[fonts.text, {color: Colors.slate}]}>
                {deliveryfee
                  ? deliveryfee > 0
                    ? freeDelivery
                      ? 'Free'
                      : `${deliveryfee}$`
                    : 'Free'
                  : 'Free'}
              </Text>
            </View>
            <View
              style={[
                flexBox.rowFlexBox,
                flexBox.alignItemsCenter,
                flexBox.justifyContentFlexEnd,
              ]}>
              <TimeMade fill={Colors.orange} width={25} height={25} />
              <Text style={[fonts.text, {color: Colors.slate}]}>
                {timeDelivery ? timeDelivery : 'Time Delivery'}
              </Text>
            </View>
          </View>
        </View>

      </View>
    </TouchableOpacity>
  );
};

export default RestaurantFeaturedPartnerCart;
