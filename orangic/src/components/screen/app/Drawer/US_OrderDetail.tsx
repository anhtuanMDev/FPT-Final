import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import {Colors, screenStyles} from '../../../custom/styles/ScreenStyle';
import TitleBar from '../../../custom/topbars/TitleBar';
import {fonts} from '../../../custom/styles/ComponentStyle';
import Icons, {IconName} from '../../../../assets/icons/Icons';
import OrderItems from '../../../custom/cards/OrderItems';
import Linear_btn from '../../../custom/buttons/Linear_btn';

const US_OrderDetail = () => {
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
          <Text style={[fonts.subline]}>
            115/15 Lê Văn Sỹ, Phường 13, Quận 3, TP.HCM
          </Text>
        </View>

        <OrderItems
          foodName={'Há cảo'}
          quantity={0}
          foodRate={0}
          restaurantRate={0}
          status={'đang chờ'}
          restaurantName={'Bà Năm'}
          price={15}
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Tiền Há cảo
            </Text>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              {15}.000 đ
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={[fonts.sublineBold]}>Tổng</Text>
            <Text style={[fonts.sublineBold]}>{15}.000 đ</Text>
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Số đơn hàng
            </Text>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Mã đơn hàng
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Ngày đặt hàng
            </Text>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              21/01/2021
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
            }}>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Phương thức thanh toán
            </Text>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Thẻ ngân hàng
            </Text>
          </View>

          <View
            style={{
              marginVertical: 10,
            }}>
            <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
              Ngày giao hàng
            </Text>
            <View style={{marginLeft: 5, marginTop: 10}}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}>
                <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
                  Món
                </Text>
                <Text style={[fonts.sublineBold, {color: Colors.slate}]}>
                  Ngày
                </Text>
              </View>
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
