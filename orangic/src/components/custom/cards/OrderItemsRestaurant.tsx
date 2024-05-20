import {
  View,
  Text,
  Dimensions,
  Image,
  ViewStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ColorValue,
} from 'react-native';
import React, {useRef} from 'react';
import {fonts} from '../styles/ComponentStyle';
import Icons, {IconName} from '../../../assets/icons/Icons';
import {Colors} from '../styles/ScreenStyle';
import Linear_btn from '../buttons/Linear_btn';
import {convertStatus} from '../../screen/app/Store/RestaurantOrders';
import {useSelector} from 'react-redux';
import {
  selectHost,
  selectUserID,
} from '../../../helpers/state/Global/globalSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/RootNavigation';
import {Swipeable} from 'react-native-gesture-handler';
import AxiosInstance from '../../../helpers/AxiosInstance';
import {showMessage} from 'react-native-flash-message';
import Fluid_btn from '../buttons/Fluid_btn';

type Items = {
  Id: string;
  Quantity: number;
  Status: string;
  FoodID: string;
  Value: number;
  Name: string;
  Image: string;
  HasDiscount: number;
  ArriveAt: string | null;
};

type Prop = {
  getOrder: (item: Items) => void;
  item: Items;
  style?: ViewStyle | ViewStyle[];
};

const {width, height} = Dimensions.get('window');

const OrderItemsRestaurant = (props: Prop) => {
  const {item, style,getOrder} =
    props;
  const host = useSelector(selectHost);
  const userID = useSelector(selectUserID);
  const [items, setItems] = React.useState<Items>(item);
  const navigation =
    useNavigation<NavigationProp<ParamList, 'US_OrderDetail'>>();

  return (
    <View
      style={[
        {
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 13,
          gap: 15,
        },
        style,
      ]}>
      <TouchableOpacity
        key={item.Id}
        onPress={() => navigation.navigate('OrderDetail', {id: item.Id})}
        style={{
          flexDirection: 'column',
          gap: 10,
          // marginVertical: 10,
          backgroundColor: Colors.white,
        }}>
        <View
          style={{
            flexDirection: 'row',
            // marginVertical: 10,
            backgroundColor: Colors.white,
          }}>
          <Image
            source={{uri: `${host}/uploads/${item.Image}.jpg`}}
            style={{width: width * 0.25, height: width * 0.25}}
          />
          <View
            style={{
              flex: 1,
              marginLeft: 10,
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={[fonts.captionBold, {color: Colors.slate}]}>
                {item.Name}
              </Text>
              {convertStatus(item.Status) === 'Đã giao' ? (
                <Text style={[fonts.subline, {marginTop: 10}]}>
                  {convertStatus(item.Status)}
                </Text>
              ) : (
                <Text style={[fonts.subline, {marginTop: 10}]}>
                  {convertStatus(item.Status)}
                </Text>
              )}
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={[fonts.captionBold]}>{item.Value}.000 đ</Text>
              <Text style={[fonts.captionBold, {marginTop: 10}]}>
                x{item.Quantity}
              </Text>
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Linear_btn
              title="Chi Tiết"
              onPress={() => {
                navigation.navigate('OrderDetail', {id: item.Id});
              }}
              style={{width: 150, height: 40}}
            />

            <Fluid_btn
              title="Trạng thái"
              onPress={() => {
                getOrder(item);
              }}
              enable={
                item.Status === 'Done' ||
                item.Status === 'Cancled' ||
                item.Status === 'Denied'
              }
              style={{width: 150, height: 40}}
            />
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </View>
  );
};

export default OrderItemsRestaurant;
