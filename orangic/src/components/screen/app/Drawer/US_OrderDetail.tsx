import { View, Text, ScrollView, FlatList, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Colors, screenStyles } from '../../../custom/styles/ScreenStyle';
import TitleBar from '../../../custom/topbars/TitleBar';
import { fonts } from '../../../custom/styles/ComponentStyle';
import Icons, { IconName } from '../../../../assets/icons/Icons';
import OrderItems from '../../../custom/cards/OrderItems';
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
import { BottomSheetModal, BottomSheetModalProvider, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AlertConfirm from '../../../custom/alerts/AlertConfirm';
import { showMessage } from 'react-native-flash-message';
import AlertMessage from '../../../custom/alerts/AlertMessage';
import ReOrder from './ReOrder';

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

const US_OrderDetail = () => {
  const route = useRoute<RouteProp<ParamList, 'US_OrderDetail'>>();
  const navigate = useNavigation<NavigationProp<ParamList, 'US_OrderDetail'>>();
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
  const snapPoints = useMemo(() => ['20%', '100%'], []);

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
    console.log(id);
    const response = await AxiosInstance().post('/get-user-order-detail.php', {
      id,
    });
    console.log(id);
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
    navigate.reset({
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
  return (
    <GestureHandlerRootView style={[screenStyles.parent_container]}>
      <View style={{ flex: 1 }}>
        <TitleBar
          value="Chi tiết đơn hàng"
          onLeftPress={() => {
            navigate.dispatch(DrawerActions.openDrawer());
          }}
          onRightPress={() => {
            navigate.navigate('Notifications');
          }}
          style={{ paddingHorizontal: 20 }}
          notify={0}
        />
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

          {infor.Restaurant.map(item => (
            <OrderItems
              key={item.Id}
              onResPress={() =>
                navigate.navigate('US_Restaurant', { id: item.Id })
              }
              item={item.Items}
              restaurantName={item.Name}
              resImg={item.Image}
              getOrder={item => setOrderAction(item)}
              setAction={setAction}
              style={{ marginBottom: 15 }}
            />
          ))}

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

        <View style={{ backgroundColor: Colors.white, paddingHorizontal: 10 }}>
          <Linear_btn
            title="Đặt lại đơn hàng"
            onPress={handlePresentCommentModalPress}
            style={{ borderColor: Colors.silver }}
          />
        </View>

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
              <BottomSheetScrollView>
                <ReOrder orderID={infor.Id} onSuccess={(status) => {
                  CreatebottomSheetModalRef?.current?.close();
                }} />
              </BottomSheetScrollView>
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default US_OrderDetail;
