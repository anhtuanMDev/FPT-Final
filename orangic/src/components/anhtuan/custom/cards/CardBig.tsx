import {
  View,
  Text,
  ScrollView,
  ViewStyle,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors, cards, fonts} from '../style/cpt';
import SliderCarousel from '../sliders/SliderCarousel';
import Check from '../../../../assets/ics/check.svg';
import Delivery from '../../../../assets/ics/delivery.svg';
import TimeMade from '../../../../assets/ics/time_made.svg';
import Tags from '../lists/Tags';

type Prop = {
  name?: string;
  delivery?: string;
  time?: string;
  tag?: string[];
  style?: ViewStyle | ViewStyle[];
  onImagePress?: () => void;
  onNamePress?: () => void;
};

const CardBig = (props: Prop) => {

  const tag = props.tag || ["tag1", "tag2", "tag3"]
  return (
    <View style={[cards.big_Cont, props?.style]}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          props.onImagePress && props.onImagePress();
        }}>
        <SliderCarousel
          style={{width: 266, height: 136, borderRadius: 35}}
          imageStyle={{height: 136}}
        />
      </TouchableOpacity>

      <TouchableHighlight
        activeOpacity={0.5}
        underlayColor={Colors.white}
        onPress={() => {
          props.onNamePress && props.onNamePress();
        }}>
        <View style={[cards.big_NameCont]}>
          <View style={[cards.big_ItemCont, {marginBottom: 5}]}>
            <Text style={[fonts.sublineBold, {marginRight: 5}]}>CardBig</Text>
            <Check width={15} height={15} fill={Colors.blue} />
          </View>

          <View style={[cards.big_ItemCont, {marginBottom: 12}]}>
            <View style={[cards.big_ItemCont, {marginRight: 20}]}>
              <Delivery width={13} height={13} fill={Colors.orange} />
              <Text style={[fonts.text, {marginLeft: 5}]}>CardBig</Text>
            </View>
            <View style={[cards.big_ItemCont]}>
              <TimeMade width={13} height={13} fill={Colors.orange} />
              <Text style={[fonts.text, {marginLeft: 5}]}>CardBig</Text>
            </View>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {
              tag.map((item, index) => {
                return (
                  <Tags key={index} name={item} style={{marginRight: 5}}/>
                )
              })
            }
          </ScrollView>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default CardBig;
