import {
  View,
  Text,
  ScrollView,
  FlatList,
  BackHandler,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Colors, screenStyles} from '../../../custom/styles/ScreenStyle';
import TitleBar from '../../../custom/topbars/TitleBar';
import {fonts} from '../../../custom/styles/ComponentStyle';
import Icons, {IconName} from '../../../../assets/icons/Icons';
import Linear_btn from '../../../custom/buttons/Linear_btn';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ParamList} from '../../../navigation/RootNavigation';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import OrderItemRow from '../../../custom/cards/OrderItemRow';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import AlertConfirm from '../../../custom/alerts/AlertConfirm';
import {showMessage} from 'react-native-flash-message';
import AlertMessage from '../../../custom/alerts/AlertMessage';
import {useSelector} from 'react-redux';
import {selectRestaurantID} from '../../../../helpers/state/AppTab/storeSlice';
import OrderItemsRestaurant from '../../../custom/cards/OrderItemsRestaurant';
import Fluid_btn from '../../../custom/buttons/Fluid_btn';
import {Dimensions} from 'react-native';
import {selectHost} from '../../../../helpers/state/Global/globalSlice';

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

const {width, height} = Dimensions.get('window');
const RES_OrderDetail = () => {
  const route = useRoute<RouteProp<ParamList, 'RES_OrderDetail'>>();
  const navigation =
    useNavigation<NavigationProp<ParamList, 'RES_OrderDetail'>>();
  const host = useSelector(selectHost);
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
    Image: '',
    Items: [],
  });
  const statuses = [
    'Waiting',
    'Denied',
    'Approved',
    'Made',
    'In Delivery',
    'Cancled',
    'Done',
  ];
  const [statusIndex, setStatusIndex] = useState(0);
  const [action, setAction] = useState(false);
  const [visible, setVisible] = useState(false);
  const [itemID, setItemID] = useState('' as string);


  const getDetail = async () => {
    const response = await AxiosInstance().post(
      '/get-restaurant-order-detail.php',
      {
        orderID: id,
        restaurantID: restaurantID,
      },
    );
    const data: OrderDetail = response.data;
    if (response.status) {
      setInfor(data);
    }
  };

  useEffect(() => {
    if (isFocused) getDetail();
  }, [isFocused]);

  const handleBackPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'OrderManagement'}],
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
      <Modal visible={visible} transparent={true} animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: Colors.white,
              elevation: 5,
              width: (width * 2) / 3,
              borderRadius: 15,
              paddingHorizontal: 20,
              paddingTop: 10,
              paddingBottom: 20,
            }}>
            <Text
              style={[
                fonts.sublineBold,
                {textAlign: 'center', marginBottom: 10},
              ]}>
              Chọn trạng thái
            </Text>

            {statuses.map((item, index) => {
              if (index <= statusIndex) {
                return null;
              }
              return (
                <Text
                  key={index}
                  onPress={() => {
                    updateStatus(itemID, item);
                    setVisible(false);
                    if (infor) {
                      setInfor({...infor, Status: item});
                    }
                    getDetail();
                  }}
                  style={[
                    fonts.text,
                    {
                      paddingVertical: 15,
                      color:
                        statusIndex === index ? Colors.orange : Colors.black,
                    },
                  ]}>
                  {convertStatus(item)}
                </Text>
              );
            })}

            <Fluid_btn
              title="Hủy"
              style={{marginTop: 30}}
              onPress={() => setVisible(false)}
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
      <View style={{flex: 1}}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: 20,
            alignItems: 'center',
            backgroundColor: Colors.white,
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
          <View style={{width: 45}} />
        </View>

        <StatusModal />

        <ScrollView style={{flex: 1}}>
          <View
            style={{
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              paddingVertical: 15,
              marginBottom: 15,
            }}>
            <Icons name={IconName.delivery} size={16} color={Colors.orange} />
            <Text style={[fonts.captionBold, {marginVertical: 5}]}>
              Địa chỉ giao hàng
            </Text>
            <Text style={[fonts.subline, {lineHeight: 22}]}>
              {infor.Address}
            </Text>
          </View>

          <FlatList
            data={infor.Items}
            keyExtractor={item => item.Id}
            scrollEnabled={false}
            renderItem={({item}) => (
              <OrderItemsRestaurant
                item={item}
                getOrder={item => {
                  setItemID(item.Id);
                  setStatusIndex(statuses.indexOf(item.Status));
                  setVisible(true);
                }}
                style={{marginBottom: 15}}
              />
            )}
          />

          <View
            style={{
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              paddingTop: 15,
              paddingBottom: 18,
              marginVertical: 15,
            }}>
            <Text style={[fonts.captionBold, {marginBottom: 10}]}>
              Tổng quan đơn hàng
            </Text>

            {infor.Items.map((item, index) => (
              <View
                key={item.Id}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
                  {item.Name}
                </Text>
                <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
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
                {infor.Items.reduce((n, n1) => {
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
            <Text style={[fonts.captionBold, {marginBottom: 10}]}>
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
              <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
                Ngày giao hàng
              </Text>

              <View style={{marginLeft: 5, marginTop: 10}}>
                {infor.Items.map((i, n) => {
                  return (
                    <OrderItemRow
                      key={i.Id}
                      title={i.Name}
                      style={{marginLeft: 10}}
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
            </View>

            {infor?.Image != null && (
              <View
                style={{
                  marginVertical: 10,
                }}>
                <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
                  Ảnh Thanh Toán
                </Text>
                <Image
                  source={{uri: `${host}/uploads/${infor.Image}.jpg`}}
                  style={{
                    width: width - 40,
                    height,
                    alignSelf: 'center',
                    resizeMode: 'contain',
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>

      </View>
  );
};

export default RES_OrderDetail;
