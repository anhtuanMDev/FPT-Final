import {View, Dimensions, FlatList, Modal, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import OrderItems from '../../../custom/cards/OrderItems';
import {screenStyles} from '../../../custom/styles/ScreenStyle';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import {useSelector} from 'react-redux';
import {selectUserID} from '../../../../helpers/state/Global/globalSlice';
import Empty from '../../../../assets/images/EmptyFoodFav.svg';
import WaitingModal from '../../../custom/ui/WaitingModal';

type OrderItems = {
  Id: string;
  OrderID: string;
  FoodID: string;
  Quantity: 79;
  Pick: 0;
  Status: string | null;
  Value: number;
  UserID: string;
  TotalValue: number;
  PaymentMethod: string;
  FoodName: string;
  RestaurantName: string;
  RestaurantID: string;
  ResImage: string;
  ResRating: number;
  FoodImage: string | null;
  FoodRating: number;
};

const {width, height} = Dimensions.get('window');
const OrderHistory = () => {
  const userID = useSelector(selectUserID);
  const [order, setOrder] = useState<OrderItems[]>([]);
  const [resfresh, setRefresh] = useState(false);

  const ModalLoad = () => {
    return (
      <Modal animationType='fade' transparent visible={resfresh}>
        <WaitingModal/>
      </Modal>
    )
  }

  const getOrders = async () => {
    const response = await AxiosInstance().post('/get-user-order-history.php', {
      id: userID,
    });
    // console.log(response.data);
    setOrder(response.data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <View style={[screenStyles.container, {flexGrow: 1}]}>
      <ModalLoad/>
      <FlatList
        data={order}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          paddingBottom: 15,
        }}
        scrollEnabled={true}
        refreshing={resfresh}
        onRefresh={() => {
          setRefresh(true);
          getOrders();
          setRefresh(false);
        }}
        keyExtractor={item => item.Id}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Empty width={width} height={width} />
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'gray'}}>
              Bạn chưa có đơn hàng nào
              </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}: {item: OrderItems}) => {
          return (
            <OrderItems
              padding={60}
              foodName={
                item.FoodName.length > 20
                  ? item.FoodName.slice(0, 20) + '...'
                  : item.FoodName
              }
              restaurantName={item.RestaurantName}
              foodRate={item.FoodRating}
              price={item.Value}
              quantity={item.Quantity}
              restaurantRate={item.ResRating}
              status={item.Status ? item.Status : 'Không thấy'}
              style={{marginTop: 15, marginHorizontal: 10}}
            />
          );
        }}
      />
    </View>
  );
};

export default OrderHistory;
