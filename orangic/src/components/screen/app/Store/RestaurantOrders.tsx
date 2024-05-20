import { View, Text, FlatList, Dimensions, Image, Modal, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Colors, screenStyles } from '../../../custom/styles/ScreenStyle';
import { fonts } from '../../../custom/styles/ComponentStyle';
import Fluid_btn from '../../../custom/buttons/Fluid_btn';
import Linear_btn from '../../../custom/buttons/Linear_btn';
import { useSelector } from 'react-redux';
import { selectRestaurantID } from '../../../../helpers/state/AppTab/storeSlice';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import { convertPoint } from '../../../navigation/AppTabNavigation';
import { ParamList } from '../../../navigation/RootNavigation';
import { selectHost } from '../../../../helpers/state/Global/globalSlice';
import Empty from '../../../../assets/images/BlankFood.svg';
import OrderCard from '../../../custom/cards/OrderCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import OrderCardRestaurant from '../../../custom/cards/OrderCardRestaurant';
import Icons, { IconName } from '../../../../assets/icons/Icons';

type ItemData = {
  ArriveAt: string;
  FoodID: string;
  FoodImageID: string;
  FoodName: string;
  Id: string;
  OrderID: string;
  Pick: boolean;
  Quantity: number;
  Status: string;
  UserID: string;
  UserImage: string | null;
  UserName: string;
  UserRank: number;
  Value: number;
  CreateAt: string;
};

export type Items = {
  ArriveAt: string;
  FoodName: string;
  Id: string;
  Image: string;
  FoodID: string;
  OrderID: string;
  Quantity: number;
  Status: string;
  Value: number;
};

type OrderItems = {
  Address: string;
  City: string;
  CreateAt: string;
  Delivery: number;
  District: string;
  Id: string;
  Items: Items[];
  Phone: string;
  TotalValue: number;
  Ward: string;
};

export const convertStatus = (status: string) => {
  switch (status) {
    case 'Cancled':
      return 'Đã hủy';
    case 'Waiting':
      return 'Chờ xác nhận';
    case 'Approved':
      return 'Đã xác nhận';
    case 'In Delivery':
      return 'Đang giao';
    case 'Done':
      return 'Đã giao';
    case 'Denied':
      return 'Đã từ chối';
    case 'Made':
      return 'Đã làm xong';

  }
};

const { width, height } = Dimensions.get('window');
const RestaurantOrders = () => {
  const navigation =
    useNavigation<NavigationProp<ParamList, 'RestaurantOrders'>>();

  const resID = useSelector(selectRestaurantID);
  const host = useSelector(selectHost);
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState<OrderItems[]>([]);
  const [status, setStatus] = useState<string>('');
  const [action, setAction] = useState(false);
  const [orderAction, setOrderAction] = useState<Items>({} as Items);
  const [refresh, setRefresh] = useState(false);

  const getOrders = async () => {
    setRefresh(true);
    const response = await AxiosInstance().post(`/get-restaurant-order-history.php`, {
      restaurantID: resID,
    });
    if (response.status) setOrders(response.data);
    setRefresh(false);
  };

  useEffect(() => {
    if (isFocused) {
      getOrders();
    }
  }, [isFocused]);

  const OrderItem = (data: ItemData) => {
    const {
      FoodName,
      Quantity,
      UserImage,
      UserName,
      UserRank,
      Value,
      Status,
      FoodImageID,
      Id,
      CreateAt,
    } = data;

    return (
      <View
        style={{
          backgroundColor: Colors.white,
          borderRadius: 15,
          paddingBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 5,
            paddingBottom: 10,
            paddingLeft: 7,
            paddingRight: 15,
          }}>
          <Image
            source={
              FoodImageID && FoodImageID.length > 0
                ? { uri: `${host}/uploads/${FoodImageID}.jpg` }
                : require('./../../../../assets/images/baseImage.png')
            }
            style={{ width: width / 4, height: width / 5, borderRadius: 10 }}
          />

          {/* Order Detail */}
          <View
            style={{
              flex: 1,
              paddingLeft: 10,
              justifyContent: 'space-evenly',
              paddingTop: 5,
            }}>
            {/* Food name and quantity */}
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={fonts.sublineBold}>{FoodName}</Text>
              <Text style={fonts.sublineBold}>{'SL: ' + Quantity}</Text>
            </View>

            {/* User's information*/}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                  source={
                    UserImage && UserImage.length > 0
                      ? { uri: `${host}/uploads/${UserImage}.jpg` }
                      : require('./../../../../assets/images/baseImage.png')
                  }
                  style={{ width: 20, height: 20, borderRadius: 10 }}
                />
                <Text style={[fonts.subline, { marginLeft: 3 }]}>
                  {UserName.length > 15
                    ? UserName.slice(0, 15) + '...'
                    : UserName}
                </Text>
              </View>
              <Text style={fonts.textBold}>{convertPoint(UserRank)}</Text>
            </View>

            {/* Order item infor*/}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={[
                  fonts.sublineBold,
                  { marginLeft: 3, color: Colors.green },
                ]}>
                {Value}$
              </Text>
              <Text style={[fonts.text, { marginLeft: 3 }]}>{CreateAt}</Text>
            </View>
          </View>
        </View>
        <View style={{ marginVertical: 5, marginHorizontal: 15 }}>
          <Text style={[fonts.sublineBold, { textAlign: 'right' }]}>
            {convertStatus(Status)}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Linear_btn
            title="Chi Tiết"
            onPress={() => {
              navigation.navigate('OrderDetail', { id: Id });
            }}
            style={{ width: 150, height: 40 }}
          />

          <Fluid_btn
            title="Trạng thái"
            onPress={() => {
              setStatus(Id);
            }}
            enable={
              Status === 'Done' || Status === 'Canceled' || Status === 'Denied'
            }
            style={{ width: 150, height: 40 }}
          />
        </View>
      </View>
    );
  };

  const StatusModal = () => {
    return (
      <Modal visible={status !== ''} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              width: (width * 2) / 3,
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            <Text
              style={[
                fonts.sublineBold,
                { textAlign: 'center', marginBottom: 10 },
              ]}>
              Chọn trạng thái
            </Text>
            <Text
              style={[
                fonts.text,
                {
                  paddingVertical: 15,
                },
              ]}
              onPress={() => {
                updateStatus(status, 'Approved');
                setStatus('');
                setOrders(
                  orders.map(order =>
                    order.Id === status
                      ? { ...order, Status: 'Approved' }
                      : order,
                  ),
                );
              }}>
              Chấp nhận đơn hàng
            </Text>

            <Text
              onPress={() => {
                updateStatus(status, 'Made');
                setStatus('');
                setOrders(
                  orders.map(order =>
                    order.Id === status
                      ? { ...order, Status: 'Canceled' }
                      : order,
                  ),
                );
              }}
              style={[
                fonts.text,
                {
                  paddingVertical: 15,
                },
              ]}>
              Đã làm xong
            </Text>

            <Text
              onPress={() => {
                updateStatus(status, 'In Delivery');
                setStatus('');
                setOrders(
                  orders.map(order =>
                    order.Id === status
                      ? { ...order, Status: 'Delivering' }
                      : order,
                  ),
                );
              }}
              style={[
                fonts.text,
                {
                  paddingVertical: 15,
                },
              ]}>
              Vận chuyển đơn hàng
            </Text>

            <Text
              onPress={() => {
                updateStatus(status, 'Done');
                setStatus('');
                setOrders(
                  orders.map(order =>
                    order.Id === status ? { ...order, Status: 'Done' } : order,
                  ),
                );
              }}
              style={[
                fonts.text,
                {
                  paddingVertical: 15,
                },
              ]}>
              Hoàn thành
            </Text>

            <Text
              onPress={() => {
                updateStatus(status, 'Denied');
                setStatus('');
                setOrders(
                  orders.map(order =>
                    order.Id === status
                      ? { ...order, Status: 'Canceled' }
                      : order,
                  ),
                );
              }}
              style={[
                fonts.text,
                {
                  paddingVertical: 15,
                },
              ]}>
              Từ chối đơn hàng
            </Text>
            <Fluid_btn
              title="Hủy"
              style={{ marginTop: 30 }}
              onPress={() => setStatus('')}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const updateStatus = async (id: string, status: string) => {
    // console.log(id, status);
    const response = await AxiosInstance().post(
      `/post-update-orderitems-status.php`,
      {
        id,
        status,
      },
    );
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[[screenStyles.container, { padding: 0 }]]}>

        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Store');
            }}
            style={{
              width: 45,
              height: 45,
              borderRadius: 10,
              backgroundColor: Colors.white,
              elevation: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icons name={IconName.back} size={18} color={Colors.orange} />
          </TouchableOpacity>

          <Text style={[fonts.captionBold]}>Quản lý đơn đặt hàng</Text>
          <View style={{ width: 45 }} />
        </View>

        <FlatList
          data={orders}
          refreshing={refresh}
          onRefresh={getOrders}
          contentContainerStyle={{ paddingBottom: 20 }}
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          ListEmptyComponent={() => {
            return (
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Empty
                  width={width / 2}
                  height={width / 2}
                  style={{ alignSelf: 'center' }}
                />
                <Text
                  style={[
                    fonts.sublineBold,
                    { textAlign: 'center', marginTop: 20 },
                  ]}>
                  Không có đơn hàng nào
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }: { item: OrderItems, index: number }) => {
            // console.log("item:",item.Items);
            return (
              <OrderCardRestaurant
                id={item.Id}
                totalValue={item.TotalValue}
                padding={20}
                style={{ marginVertical: 10 }}
                orderDate={item.CreateAt.slice(0, 10)}
                items={item.Items}
                onAlert={setAction}
                onGetInfor={setOrderAction}
                onPress={() => {
                  navigation.navigate('RES_OrderDetail', { id: item.Id });
                }}
              />
            );
          }}
          keyExtractor={(_, index) => index.toString()}
        />
        <StatusModal />
      </View>
    </GestureHandlerRootView>
  );
};

export default RestaurantOrders;
