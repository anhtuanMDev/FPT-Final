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
import React, { useRef } from 'react';
import { fonts } from '../styles/ComponentStyle';
import Icons, { IconName } from '../../../assets/icons/Icons';
import { Colors } from '../styles/ScreenStyle';
import Linear_btn from '../buttons/Linear_btn';
import { convertStatus } from '../../screen/app/Store/RestaurantOrders';
import { useSelector } from 'react-redux';
import { selectHost, selectUserID } from '../../../helpers/state/Global/globalSlice';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ParamList } from '../../navigation/RootNavigation';
import { Swipeable } from 'react-native-gesture-handler';
import AxiosInstance from '../../../helpers/AxiosInstance';
import { showMessage } from 'react-native-flash-message';
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
  resImg: string;
  restaurantName: string;
  onResPress: () => void;
  getOrder: (item: Items) => void;
  setAction: (action: boolean) => void;
  item: Items[];
  style?: ViewStyle | ViewStyle[];
};

const { width, height } = Dimensions.get('window');

const OrderItemsRestaurant = (props: Prop) => {
  const { resImg, restaurantName, item, style, onResPress, getOrder, setAction } = props;
  const host = useSelector(selectHost);
  const userID = useSelector(selectUserID);
  const [items, setItems] = React.useState<Items[]>(item);
  const navigation = useNavigation<NavigationProp<ParamList, 'US_OrderDetail'>>();

  return (
    <View
      style={[
        {
          backgroundColor: Colors.white,
          paddingHorizontal: 20,
          paddingTop: 10,
          paddingBottom: 13,
          gap: 15
        },
        style,
      ]}>
      <TouchableOpacity
        onPress={onResPress}
        style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: `${host}/uploads/${resImg}.jpg` }}
          style={{ width: 35, height: 35, borderRadius: 20 }}
        />
        <Text style={[fonts.captionBold, { marginHorizontal: 10 }]}>
          {restaurantName}
        </Text>
        <Icons name={IconName.next} size={16} color={Colors.black} />
      </TouchableOpacity>

      {items?.map(i => {
        const swipeRef = useRef<Swipeable>(null);
        async function cancel() {
          getOrder(i);
          setAction(true);
          // const response = await AxiosInstance().post(
          //   '/post-update-orderitems-status.php',
          //   {
          //     id: i.Id,
          //     status: 'Cancled',
          //   },
          // );
          // if (response.status) {
          //   const newItem = item.map(item => {
          //     if (item.Id === i.Id) {
          //       item.Status = 'Cancled';
          //     }
          //     return item;
          //   });
          //   setItems(newItem);
          //   showMessage({
          //     message: 'Hủy đơn hàng thành công',
          //     type: 'success',
          //     icon: 'info',
          //   });
          // }
          swipeRef.current?.close();
        }

        return (

          <TouchableOpacity
            key={i.Id}
            onPress={() => navigation.navigate('OrderDetail', { id: i.Id })}
            style={{
              flexDirection: 'column',
              gap: 10,
              // marginVertical: 10,
              backgroundColor: Colors.white,
            }}>

            <View style={{
              flexDirection: 'row',
              // marginVertical: 10,
              backgroundColor: Colors.white,
            }}>

              <Image
                source={{ uri: `${host}/uploads/${i.Image}.jpg` }}
                style={{ width: width * 0.25, height: width * 0.25 }}
              />
              <View
                style={{
                  flex: 1,
                  marginLeft: 10,
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text style={[fonts.captionBold, { color: Colors.slate }]}>
                    {i.Name}
                  </Text>
                  {convertStatus(i.Status) === 'Đã giao' ? (
                    <Text style={[fonts.subline, { marginTop: 10 }]}>
                      {convertStatus(i.Status)}
                    </Text>
                  ) : (
                    <Text style={[fonts.subline, { marginTop: 10 }]}>
                      {convertStatus(i.Status)}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={[fonts.captionBold]}>{i.Value}.000 đ</Text>
                  <Text style={[fonts.captionBold, { marginTop: 10 }]}>
                    x{i.Quantity}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableWithoutFeedback>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Linear_btn
                  title="Chi Tiết"
                  onPress={() => {
                    navigation.navigate('OrderDetail', { id: i.Id });
                  }}
                  style={{ width: 150, height: 40 }}
                />

                <Fluid_btn
                  title="Trạng thái"
                  onPress={() => {
                    // setStatus(i.Id);
                  }}
                  enable={
                    i.Status === 'Done' || i.Status === 'Canceled' || i.Status === 'Denied'
                  }
                  style={{ width: 150, height: 40 }}
                />
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        );
      })}

    </View>
  );
};

export default OrderItemsRestaurant;
