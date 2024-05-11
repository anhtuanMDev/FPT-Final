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
import {convertStatus} from '../../screen/app/Store/RestaurantOrders';
import {useSelector} from 'react-redux';
import {selectHost} from '../../../helpers/state/Global/globalSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/RootNavigation';

type Items = {
  Id: string;
  Quantity: number;
  Status: string;
  FoodID: string;
  Value: number;
  Name: string;
  Image: string;
};

type Prop = {
  resImg: string;
  restaurantName: string;
  onResPress: () => void;
  item: Items[];
  style?: ViewStyle | ViewStyle[];
};

const {width, height} = Dimensions.get('window');
const OrderItems = (props: Prop) => {
  const {resImg, restaurantName, item, style, onResPress} = props;
  const host = useSelector(selectHost);
  const navigate = useNavigation<NavigationProp<ParamList, 'US_OrderDetail'>>();

  return (
    <View
      style={[
        {
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 13,
        },
        style,
      ]}>
      <TouchableOpacity
        onPress={onResPress}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{uri: `${host}/uploads/${resImg}.jpg`}}
          style={{width: 35, height: 35, borderRadius: 20}}
        />
        <Text style={[fonts.captionBold, {marginHorizontal: 10}]}>
          {restaurantName}
        </Text>
        <Icons name={IconName.next} size={16} color={Colors.black} />
      </TouchableOpacity>

      {item.map((_, index) => (
        <TouchableOpacity
          onPress={() =>
            navigate.navigate('US_FoodDetail', {id: item[index].FoodID})
          }
          key={item[index].Id}
          style={{flexDirection: 'row', marginTop: 15}}>
          <Image
            source={{uri: `${host}/uploads/${item[index].Image}.jpg`}}
            style={{width: width * 0.25, height: width * 0.25}}
          />
          <View
            style={{flex: 1, marginLeft: 10, justifyContent: 'space-between'}}>
            <View>
              <Text style={[fonts.captionBold, {color: Colors.slate}]}>
                {item[index].Name}
              </Text>
              {convertStatus(item[index].Status) === 'Đã giao' ? (
                <Text style={[fonts.subline, {marginTop: 10}]}>
                  {convertStatus(item[index].Status)}
                </Text>
              ) : (
                <Text style={[fonts.subline, {marginTop: 10}]}>
                  {convertStatus(item[index].Status)}
                </Text>
              )}
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={[fonts.captionBold]}>{item[index].Value}.000 đ</Text>
              <Text style={[fonts.captionBold, {marginTop: 10}]}>
                x{item[index].Quantity}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      <Linear_btn title="Hủy Đơn Hàng" style={{marginTop: 15}} />
    </View>
  );
};

export default OrderItems;
