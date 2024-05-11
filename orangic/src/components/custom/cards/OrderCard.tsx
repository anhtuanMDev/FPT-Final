import {
  View,
  Text,
  Dimensions,
  ViewStyle,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../styles/ScreenStyle';
import Icons2, {Icon2Name} from '../../../assets/icons/Icons2';
import {fonts} from '../styles/ComponentStyle';
import {useSelector} from 'react-redux';
import {selectHost} from '../../../helpers/state/Global/globalSlice';

const {width, height} = Dimensions.get('window');
const padding = 20;

type Items = {
  ArriveAt: string;
  FoodName: string;
  Id: string;
  Image: string;
  Quantity: number;
  Status: string;
  Value: number;
};

type Prop = {
  id: string;
  totalValue: number;
  orderDate: string;
  style?: ViewStyle | ViewStyle[];
  items: Items[];
  padding: number;
  onPress: () => void;
};

type OrderItemDetailProp = {
  name: string;
  quantity: number;
  status: string;
  value: number;
  image: string;
};

const convertStatus = (status: string) => {
  switch (status) {
    case 'Waiting':
      return 'Đang chờ';
    case 'Approve':
      return 'Đã xác nhận';
    case 'Denied':
      return 'Bị từ chối';
    case 'In Delivery':
      return 'Đang giao hàng';
    case 'Done':
      return 'Hoàn thành';
    case 'Cancled':
      return 'Đã hủy';
  }
};

const OrderItemDetail = (props: OrderItemDetailProp) => {
  const {name, quantity, status, value, image} = props;

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingTop: 10,
        paddingLeft: 5,
        paddingRight: 10,
        marginBottom: 10,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'flex-start',
          paddingLeft: 15,
        }}>
        <View
          style={{
            width: width * 0.15,
            height: width * 0.15,
            overflow: 'hidden',
            borderRadius: 20,
          }}>
          <Image
            source={{uri: image}}
            style={{width: '100%', height: '100%', resizeMode: 'cover'}}
          />
        </View>

        <View style={{flex: 1, marginLeft: 15, justifyContent: 'space-evenly'}}>
          <Text style={[fonts.sublineBold]}>{name}</Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[fonts.textBold, {color: Colors.orange}]}>
                {value}.000 đ
              </Text>
              <Text style={[fonts.subline, {marginLeft: 5}]}>x {quantity}</Text>
            </View>
            <Text style={[fonts.sublineBold, {marginLeft: 5}]}>{status}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const OrderCard = (props: Prop) => {
  const {id, totalValue, orderDate, style, items, padding, onPress} = props;
  const host = useSelector(selectHost);
  return (
    <TouchableOpacity
      onPress={()=>{onPress && onPress()}}
      style={[
        {
          width: width - padding * 2,
          backgroundColor: Colors.white,
          overflow: 'hidden',
          borderRadius: 18,
          paddingBottom: 15,
          paddingTop: 15,
          paddingHorizontal: 10,
          marginHorizontal: padding,
          elevation: 5,
        },
        style,
      ]}>
      <Text style={[fonts.sublineBold, {marginVertical: 5}]}>{id}</Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          marginBottom: 25,
        }}>
        <Text>
          Tổng giá tiền:{' '}
          <Text style={fonts.textBold}>{totalValue?.toString()}.000 đ</Text>
        </Text>
        <Text>
          Ngày đặt: <Text style={fonts.textBold}>{orderDate}</Text>
        </Text>
      </View>
      <View>
        {items.map((item, index) => {
          return (
            <OrderItemDetail
              key={item.Id}
              image={`${host}/uploads/${item.Image}.jpg`}
              quantity={item.Quantity}
              name={item.FoodName}
              status={convertStatus(item.Status) as string}
              value={item.Value}
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
