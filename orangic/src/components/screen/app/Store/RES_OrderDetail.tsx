import { View, Text, ScrollView, FlatList, BackHandler, TouchableOpacity, Modal } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Colors, screenStyles } from '../../../custom/styles/ScreenStyle';
import TitleBar from '../../../custom/topbars/TitleBar';
import { fonts } from '../../../custom/styles/ComponentStyle';
import Icons, { IconName } from '../../../../assets/icons/Icons';
import Linear_btn from '../../../custom/buttons/Linear_btn';
import {
  DrawerActions,
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { ParamList } from '../../../navigation/RootNavigation';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import OrderItemRow from '../../../custom/cards/OrderItemRow';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AlertConfirm from '../../../custom/alerts/AlertConfirm';
import { showMessage } from 'react-native-flash-message';
import AlertMessage from '../../../custom/alerts/AlertMessage';
import { useSelector } from 'react-redux';
import { selectRestaurantID } from '../../../../helpers/state/AppTab/storeSlice';
import OrderItemsRestaurant from '../../../custom/cards/OrderItemsRestaurant';
import Fluid_btn from '../../../custom/buttons/Fluid_btn';
import { Dimensions } from 'react-native';

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

// export type Items = {
//   ArriveAt: string;
//   FoodName: string;
//   Id: string;
//   Image: string;
//   FoodID: string;
//   OrderID: string;
//   Quantity: number;
//   Status: string;
//   Value: number;
// };

// type OrderItems = {
//   Address: string;
//   City: string;
//   CreateAt: string;
//   Delivery: number;
//   District: string;
//   Id: string;
//   Items: Items[];
//   Phone: string;
//   TotalValue: number;
//   Ward: string;
// };

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

type OrderDetail = {
  Id: string;
  TotalValue: number;
  Status: string;
  Delivery: number;
  CreateAt: string;
  UpdateAt: string | null;
  PaymentMethod: string;
  Address: string;
  CouponID: string | null;
  Discount: number | null;
  Code: string | null;
  Restaurant: Restaurant[];
  Group: Items[];
};

type Restaurant = {
  Id: string;
  Name: string;
  Image: string;
  Items: Items[];
};

type Items = {
  Id: string;
  FoodID: string;
  Quantity: number;
  Status: string;
  Value: number;
  ArriveAt: string | null;
  Name: string;
  Image: string;
  HasDiscount: number;
};

const { width, height } = Dimensions.get('window');
const RES_OrderDetail = () => {
  const route = useRoute<RouteProp<ParamList, 'RES_OrderDetail'>>();
  const navigation = useNavigation<NavigationProp<ParamList, 'RES_OrderDetail'>>();
  const restaurantID = useSelector(selectRestaurantID);
  const id = route.params?.id;
  const isFocused = useIsFocused();
  const [infor, setInfor] = useState<OrderDetail>({
    Id: '',
    TotalValue: 0,
    Status: '',
    Delivery: 0,
    CreateAt: '',
    UpdateAt: null,
    PaymentMethod: '',
    Address: '',
    CouponID: null,
    Discount: null,
    Code: null,
    Restaurant: [],
    Group: [],
  });
  const [action, setAction] = useState(false);
  const [visible, setVisible] = useState(false);
  const [orderAction, setOrderAction] = useState<Items>({} as Items);
  const CreatebottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['20%', '90%'], []);

  const handlePresentCommentModalPress = useCallback(() => {
    CreatebottomSheetModalRef.current?.present();
  }, []);

  const cancelOrder = async (item: Items) => {
    const response = await AxiosInstance().post(
      '/post-update-orderitems-status.php',
      {
        id: item.Id,
        status: 'Cancled',
      },
    );
    if (response.status) {
      console.log(response.status);
      const newOrder = {
        ...infor,
        Restaurants: infor.Restaurant.map(orderItem => {
          const newItem = orderItem.Items.map(items => {
            if (items.Id === item.Id) {
              return { ...items, Status: 'Cancled' };
            }
            return items;
          });
          return newItem;
        }),
        Group: infor.Group.map(items => {
          if (items.Id === item.Id) {
            items.Status = 'Cancled';
          }
          return items;
        }),
      };
      setInfor(newOrder);
      setVisible(true);
      showMessage({
        message: 'Hủy đơn hàng thành công',
        type: 'success',
        icon: 'info',
      });
    }
    console.log(item);
  };

  const getDetail = async () => {
    // console.log(id);
    const response = await AxiosInstance().post('/get-restaurant-order-detail.php', {
      orderID: id,
      restaurantID: restaurantID,
    });
    console.log(restaurantID);
    console.log(response.data);
    console.log(infor.Restaurant);
    console.log(infor.Restaurant[0]?.Items);
    console.log(infor)
    const data: OrderDetail = response.data;
    if (response.status) {
      const allItems = data.Restaurant.reduce<Items[]>((items, restaurant) => {
        return items.concat(restaurant.Items);
      }, []);
      setInfor({ ...data, Group: allItems });
      console.log('ord', data);
    }
  };

  useEffect(() => {
    if (isFocused) getDetail();
  }, [isFocused]);

  const handleBackPress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'OrderManagement' }],
    });
    return true;
  };

  useEffect(() => {
    // Add event listener when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  const [status, setStatus] = useState<string>('');
  // const [action, setAction] = useState(false);
  // const [orderAction, setOrderAction] = useState<Items>({} as Items);
  // const OrderItem = (data: ItemData) => {
  //   const {
  //     FoodName,
  //     Quantity,
  //     UserImage,
  //     UserName,
  //     UserRank,
  //     Value,
  //     Status,
  //     FoodImageID,
  //     Id,
  //     CreateAt,
  //   } = data;

  //   return (
  //     <View
  //       style={{
  //         backgroundColor: Colors.white,
  //         borderRadius: 15,
  //         paddingBottom: 10,
  //       }}>
  //       <View
  //         style={{
  //           flexDirection: 'row',
  //           paddingTop: 5,
  //           paddingBottom: 10,
  //           paddingLeft: 7,
  //           paddingRight: 15,
  //         }}>
  //         <Image
  //           source={
  //             FoodImageID && FoodImageID.length > 0
  //               ? { uri: `${host}/uploads/${FoodImageID}.jpg` }
  //               : require('./../../../../assets/images/baseImage.png')
  //           }
  //           style={{ width: width / 4, height: width / 5, borderRadius: 10 }}
  //         />

  //         {/* Order Detail */}
  //         <View
  //           style={{
  //             flex: 1,
  //             paddingLeft: 10,
  //             justifyContent: 'space-evenly',
  //             paddingTop: 5,
  //           }}>
  //           {/* Food name and quantity */}
  //           <View
  //             style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //             <Text style={fonts.sublineBold}>{FoodName}</Text>
  //             <Text style={fonts.sublineBold}>{'SL: ' + Quantity}</Text>
  //           </View>

  //           {/* User's information*/}
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'space-between',
  //               alignItems: 'center',
  //             }}>
  //             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //               <Image
  //                 source={
  //                   UserImage && UserImage.length > 0
  //                     ? { uri: `${host}/uploads/${UserImage}.jpg` }
  //                     : require('./../../../../assets/images/baseImage.png')
  //                 }
  //                 style={{ width: 20, height: 20, borderRadius: 10 }}
  //               />
  //               <Text style={[fonts.subline, { marginLeft: 3 }]}>
  //                 {UserName.length > 15
  //                   ? UserName.slice(0, 15) + '...'
  //                   : UserName}
  //               </Text>
  //             </View>
  //             <Text style={fonts.textBold}>{convertPoint(UserRank)}</Text>
  //           </View>

  //           {/* Order item infor*/}
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               justifyContent: 'space-between',
  //             }}>
  //             <Text
  //               style={[
  //                 fonts.sublineBold,
  //                 { marginLeft: 3, color: Colors.green },
  //               ]}>
  //               {Value}$
  //             </Text>
  //             <Text style={[fonts.text, { marginLeft: 3 }]}>{CreateAt}</Text>
  //           </View>
  //         </View>
  //       </View>
  //       <View style={{ marginVertical: 5, marginHorizontal: 15 }}>
  //         <Text style={[fonts.sublineBold, { textAlign: 'right' }]}>
  //           {convertStatus(Status)}
  //         </Text>
  //       </View>
  //       <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
  //         <Linear_btn
  //           title="Chi Tiết"
  //           onPress={() => {
  //             navigation.navigate('OrderDetail', { id: Id });
  //           }}
  //           style={{ width: 150, height: 40 }}
  //         />

  //         <Fluid_btn
  //           title="Trạng thái"
  //           onPress={() => {
  //             setStatus(Id);
  //           }}
  //           enable={
  //             Status === 'Done' || Status === 'Canceled' || Status === 'Denied'
  //           }
  //           style={{ width: 150, height: 40 }}
  //         />
  //       </View>
  //     </View>
  //   );
  // };

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
                // setOrders(
                //   orders.map(order =>
                //     order.Id === status
                //       ? { ...order, Status: 'Approved' }
                //       : order,
                //   ),
                // );
              }}>
              Chấp nhận đơn hàng
            </Text>

            <Text
              onPress={() => {
                updateStatus(status, 'Made');
                setStatus('');
                // setOrders(
                //   orders.map(order =>
                //     order.Id === status
                //       ? { ...order, Status: 'Canceled' }
                //       : order,
                //   ),
                // );
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
                // setOrders(
                //   orders.map(order =>
                //     order.Id === status
                //       ? { ...order, Status: 'Delivering' }
                //       : order,
                //   ),
                // );
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
                // setOrders(
                //   orders.map(order =>
                //     order.Id === status ? { ...order, Status: 'Done' } : order,
                //   ),
                // );
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
                // setOrders(
                //   orders.map(order =>
                //     order.Id === status
                //       ? { ...order, Status: 'Canceled' }
                //       : order,
                //   ),
                // );
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
    <GestureHandlerRootView style={[screenStyles.parent_container]}>
      <View style={{ flex: 1 }}>
        {/* <TitleBar
          value="Chi tiết đơn hàng"
          onLeftPress={() => {
            navigate.dispatch(DrawerActions.openDrawer());
          }}
          onRightPress={() => {
            navigate.navigate('Notifications');
          }}
          style={{paddingHorizontal: 20}}
          notify={0}
        /> */}
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
              navigation.navigate('RestaurantOrders');
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

          <Text style={[fonts.captionBold]}>Chi tiết đơn hàng</Text>
          <View style={{ width: 45 }} />
        </View>

        <AlertConfirm
          visible={action}
          title="Bạn muốn hủy đơn hàng ?"
          content={`Bạn có chắc chắn muốn hủy đơn hàng ${orderAction.Name} với số lượng ${orderAction.Quantity} không ?`}
          onPress={setAction}
          onConfirm={() => {
            cancelOrder(orderAction);
            setAction(false);
          }}
        />

        <AlertMessage
          visible={visible}
          title="Hủy đơn hàng thành công"
          content={`Bạn sẽ được hoàn tiền lại ${orderAction.Value}.000 đ cho đơn hàng ${orderAction.Name} với số lượng ${orderAction.Quantity}`}
          onPress={setVisible}
        />
        <ScrollView style={{ flex: 1 }}>
          <View
            style={{
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              paddingVertical: 15,
              marginBottom: 15,
            }}>
            <Icons name={IconName.delivery} size={16} color={Colors.orange} />
            <Text style={[fonts.captionBold, { marginVertical: 5 }]}>
              Địa chỉ giao hàng
            </Text>
            <Text style={[fonts.subline, { lineHeight: 22 }]}>
              {infor.Address}
            </Text>
          </View>

          {/* {infor.Restaurant.map(item => ( */}
            <OrderItemsRestaurant
              // key={i.Id}
              onResPress={() =>
                navigation.navigate('US_Restaurant', { id: infor?.Restaurant[0]?.Id })
              }
              item={infor?.Restaurant[0]?.Items}
              restaurantName={infor?.Restaurant[0]?.Name}
              resImg={infor?.Restaurant[0]?.Image}
              getOrder={item => setOrderAction(item)}
              setAction={setAction}
              style={{ marginBottom: 15 }}
            />
          {/* ))} */}

          <View
            style={{
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              paddingTop: 15,
              paddingBottom: 18,
              marginVertical: 15,
            }}>
            <Text style={[fonts.captionBold, { marginBottom: 10 }]}>
              Tổng quan đơn hàng
            </Text>

            {infor.Group.map((item, index) => (
              <View
                key={item.Id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={[fonts.sublineBold, { color: Colors.slate }]}>
                  {item.Name}
                </Text>
                <Text style={[fonts.sublineBold, { color: Colors.slate }]}>
                  {item.Value}.000 đ
                </Text>
              </View>
            ))}

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: 10,
              }}>
              <Text style={[fonts.sublineBold]}>Tổng</Text>
              <Text style={[fonts.sublineBold]}>
                {infor.Group.reduce((n, n1) => {
                  return n + Number(n1.Value);
                }, 0)}
                .000 đ
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              paddingTop: 15,
              paddingBottom: 18,
              marginTop: 10,
            }}>
            <Text style={[fonts.captionBold, { marginBottom: 10 }]}>
              Chi tiết đơn hàng
            </Text>
            <OrderItemRow title="Số đơn hàng" content={infor.Id} />
            <OrderItemRow
              title="Ngày đặt hàng"
              content={infor.CreateAt.slice(0, -8)}
            />
            <OrderItemRow
              title="Phương thức thanh toán"
              content={infor.PaymentMethod}
            />
            {infor.CouponID && (
              <OrderItemRow
                title="Mã giảm giá"
                content={
                  infor.Code + ' - ' + infor.Discount + '%' || 'Không có'
                }
              />
            )}

            <View
              style={{
                marginVertical: 10,
              }}>
              <Text style={[fonts.sublineBold, { color: Colors.slate }]}>
                Ngày giao hàng
              </Text>
              <View style={{ marginLeft: 5, marginTop: 10 }}>
                {infor.Restaurant.map((item, index) => (
                  <View key={item.Id}>
                    <Text
                      style={[
                        fonts.sublineBold,
                        { color: Colors.slate, marginTop: 20 },
                      ]}>
                      {item.Name}
                    </Text>
                    {item.Items.map((i, n) => {
                      return (
                        <OrderItemRow
                          key={i.Id}
                          title={i.Name}
                          style={{ marginLeft: 10 }}
                          subValue={
                            i.HasDiscount && infor.Discount
                              ? Math.round((i.Value * 100) / infor.Discount) +
                              '.000 đ'
                              : undefined
                          }
                          content={
                            i.Status == 'Denied' || i.Status == 'Cancled'
                              ? 'Bị hủy'
                              : i.ArriveAt || 'Chưa cập nhật'
                          }
                        />
                      );
                    })}
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* <View style={{backgroundColor: Colors.white, paddingHorizontal: 10}}>
          <Linear_btn
            title="Đặt lại đơn hàng"
            onPress={handlePresentCommentModalPress}
            style={{borderColor: Colors.silver}}
          />
        </View> */}

        <BottomSheetModalProvider>
          <View>
            <BottomSheetModal
              ref={CreatebottomSheetModalRef}
              index={1}
              style={{
                flex: 1,
              }}
              snapPoints={snapPoints}>
              <Text
                style={[
                  fonts.captionBold,
                  { marginVertical: 10, textAlign: 'center' },
                ]}>
                Thanh toán
              </Text>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default RES_OrderDetail;
