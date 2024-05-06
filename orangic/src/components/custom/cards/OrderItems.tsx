import {
  View,
  Text,
  Dimensions,
  Image,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {fonts} from '../styles/ComponentStyle';
import Icons, {IconName} from '../../../assets/icons/Icons';
import {Colors} from '../styles/ScreenStyle';
import Icons2, {Icon2Name} from '../../../assets/icons/Icons2';
import Linear_btn from '../buttons/Linear_btn';

type Prop = {
  foodName: string;
  quantity: number;
  foodRate: number;
  restaurantRate: number;
  resImg?: string;
  foodImg?: string;
  status: string;
  restaurantName: string;
  price: number;
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  showButton?: boolean;
};

const {width, height} = Dimensions.get('window');
const OrderItems = (props: Prop) => {
  const {
    foodName,
    quantity,
    foodRate,
    restaurantRate,
    resImg,
    foodImg,
    status,
    restaurantName,
    price,
    style,
    onPress,
    showButton,
  } = props;
  return (
    <View
      style={{
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 13,
      }}>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('./../../../assets/images/baseImage.png')}
          style={{width: 35, height: 35, borderRadius: 20}}
        />
        <Text style={[fonts.captionBold, {marginHorizontal: 10}]}>
          {restaurantName}
        </Text>
        <Icons name={IconName.next} size={16} color={Colors.black} />
      </TouchableOpacity>

      <TouchableOpacity style={{flexDirection: 'row', marginTop: 15}}>
        <Image
          source={require('./../../../assets/images/baseImage.png')}
          style={{width: width * 0.25, height: width * 0.25}}
        />
        <View
          style={{flex: 1, marginLeft: 10, justifyContent: 'space-between'}}>
          <View>
            <Text style={[fonts.captionBold, {color: Colors.slate}]}>
              {foodName}
            </Text>
            {status === 'Đã giao' ? (
              <Text style={[fonts.subline, {marginTop: 10}]}>{status}</Text>
            ) : (
              <Text style={[fonts.subline, {marginTop: 10}]}>{status}</Text>
            )}
          </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={[fonts.captionBold]}>{price}.000 đ</Text>
            <Text style={[fonts.captionBold, {marginTop: 10}]}>
              x{quantity}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <Linear_btn title="Hủy Đơn Hàng" style={{marginTop: 15}} />
    </View>
  );
};

export default OrderItems;
