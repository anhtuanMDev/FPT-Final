import {View, Text, ScrollView, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, screenStyles} from '../../../custom/styles/ScreenStyle';
import TitleBar from '../../../custom/topbars/TitleBar';
import {fonts} from '../../../custom/styles/ComponentStyle';
import Icons, {IconName} from '../../../../assets/icons/Icons';
import OrderItems from '../../../custom/cards/OrderItems';
import Linear_btn from '../../../custom/buttons/Linear_btn';
import {RouteProp, useIsFocused, useRoute} from '@react-navigation/native';
import {ParamList} from '../../../navigation/RootNavigation';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import OrderItemRow from '../../../custom/cards/OrderItemRow';

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

  const getDetail = async () => {
    console.log(id);
    const response = await AxiosInstance().post('/get-user-order-detail.php', {
      id,
    });
    const data: OrderDetail = response.data;
    if (response.status) {
      const allItems = data.Restaurant.reduce<Items[]>((items, restaurant) => {
        return items.concat(restaurant.Items);
      }, []);
      setInfor({...data, Group: allItems});
    }
  };

  useEffect(() => {
    if (isFocused) getDetail();
  }, [isFocused]);
  return (
    <View style={{flex: 1}}>
      <TitleBar
        value="Chi tiết đơn hàng"
        onLeftPress={() => {}}
        onRightPress={() => {}}
        style={{paddingHorizontal: 20}}
        notify={0}
      />
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
          <Text style={[fonts.subline, {lineHeight: 22}]}>{infor.Address}</Text>
        </View>

        {infor.Restaurant.map(item => (
          <OrderItems
            key={item.Id}
            item={item.Items}
            restaurantName={item.Name}
            resImg={item.Image}
            style={{marginBottom: 15}}
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
          <Text style={[fonts.captionBold, {marginBottom: 10}]}>
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
          <Text style={[fonts.captionBold, {marginBottom: 10}]}>
            Chi tiết đơn hàng
          </Text>
          <OrderItemRow title="Số đơn hàng" content={infor.Id} />
          <OrderItemRow title="Ngày đặt hàng" content={infor.CreateAt.slice(0, -8)} />
          <OrderItemRow title="Phương thức thanh toán" content={infor.PaymentMethod} />
          <OrderItemRow title="Số đơn hàng" content={infor.Id} />
          <OrderItemRow title="Mã giảm giá" content={infor.Code + " - " + infor.Discount + "%" || 'Không có'} />

          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Ngày giao hàng
            </Text>
            <View style={{marginLeft: 5, marginTop: 10}}>
              {infor.Restaurant.map((item, index) => (
                <View key={item.Id}>
                  <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
                    {item.Name}
                  </Text>
                  {item.Items.map((i, n) => {
                    return (
                      <OrderItemRow
                        key={i.Id}
                        title={i.Name}
                        subValue={i.HasDiscount && infor.Discount ? i.Value * 100 / infor.Discount + '.000 đ' : undefined}
                        content={i.ArriveAt || 'Chưa cập nhật'}/>
                    )
                  })}
                </View>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{backgroundColor: Colors.white, paddingHorizontal: 10}}>
        <Linear_btn
          title="Đặt lại đơn hàng"
          style={{borderColor: Colors.silver}}
        />
      </View>
    </View>
  );
};

export default US_OrderDetail;
