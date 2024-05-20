import {
  View,
  Text,
  Dimensions,
  ViewStyle,
  Image,
  TouchableOpacity,
  ColorValue,
} from 'react-native';
import React from 'react';
import {Colors} from '../styles/ScreenStyle';
import Icons2, {Icon2Name} from '../../../assets/icons/Icons2';
import {fonts} from '../styles/ComponentStyle';
import {useSelector} from 'react-redux';
import {selectHost, selectUserID} from '../../../helpers/state/Global/globalSlice';
import {Swipeable} from 'react-native-gesture-handler';
import AxiosInstance from '../../../helpers/AxiosInstance';
import { showMessage } from 'react-native-flash-message';

const {width, height} = Dimensions.get('window');
const padding = 20;

type Items = {
  ArriveAt: string;
  FoodName: string;
  Id: string;
  FoodID: string;
  OrderID: string;
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
  onAlert: (bool: boolean) => void;
  onGetInfor: (item: Items) => void;
};

type OrderItemDetailProp = {
  name: string;
  quantity: number;
  status: string;
  value: number;
  image: string;
  foodID: string;
  action: string;
  actionColors: ColorValue;
  index: number;
};

const convertStatus = (status: string) => {
  switch (status) {
    case 'Waiting':
      return 'Đang chờ';
    case 'Approved':
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

const OrderCard = (props: Prop) => {
  const {
    id,
    totalValue,
    orderDate,
    style,
    items,
    padding,
    onPress,
    onAlert,
    onGetInfor,
  } = props;
  const host = useSelector(selectHost);

  const OrderItemDetail = (props: OrderItemDetailProp) => {
    const userID = useSelector(selectUserID);
    const swipeRef = React.useRef<Swipeable>(null);
    const {name, quantity, status, value, image, action, actionColors, index, foodID} =
      props;

      console.log(name, status, foodID)

    const cancel = () => {
      onGetInfor(items[index]);
      onAlert(true);
      swipeRef.current?.close();
    };

    const addToCart = async() => {
      const response = await AxiosInstance().post('/post-orders.php',{
        userID,
        foodID,
        quantity
      })
      if(response.status){
        showMessage({
          message: 'Thêm vào giỏ hàng thành công',
          type: 'success',
          icon: 'success',
        })
      }
      swipeRef.current?.close();
    };

    const rightRender = () => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            status == 'Đang chờ' ? cancel() : addToCart();
          }}
          style={{
            width: 110,
            backgroundColor: actionColors,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              fonts.textBold,
              {
                color: Colors.white,
                textAlign: 'center',
              },
            ]}>
            {action}
          </Text>
        </TouchableOpacity>
      );
    };

    const leftRender = () => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
             addToCart();
          }}
          style={{
            width: 110,
            backgroundColor: actionColors,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={[
              fonts.textBold,
              {
                color: Colors.white,
                textAlign: 'center',
              },
            ]}>
              Thêm vào giỏ hàng
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <Swipeable ref={swipeRef} renderLeftActions={leftRender} renderRightActions={rightRender}>
        <View
          style={{
            backgroundColor: Colors.white,
            flexDirection: 'row',
            paddingTop: 10,
            paddingLeft: 5,
            paddingRight: 10,
            paddingBottom: 10,
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

            <View
              style={{flex: 1, marginLeft: 15, justifyContent: 'space-evenly'}}>
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
                  <Text style={[fonts.subline, {marginLeft: 5}]}>
                    x {quantity}
                  </Text>
                </View>
                <Text style={[fonts.sublineBold, {marginLeft: 5}]}>
                  {status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Swipeable>
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        onPress && onPress();
      }}
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
      <Text style={[fonts.sublineBold, {marginVertical: 5}]}>
        Mã đơn hàng: {id}
      </Text>
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
              foodID={item.FoodID}
              index={index}
              status={convertStatus(item.Status) as string}
              value={item.Value}
              action={
                item.Status == 'Waiting' ? 'Hủy đơn' : 'Thêm vào giỏ hàng'
              }
              actionColors={
                item.Status == 'Waiting' ? Colors.orange : Colors.green
              }
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
