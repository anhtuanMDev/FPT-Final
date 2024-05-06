import {View, Text, StatusBar, Modal, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors, screenStyles} from '../../../custom/styles/ScreenStyle';
import Empty from '../../../../assets/images/EmptyFoodFav.svg';
import TitleBar from '../../../custom/topbars/TitleBar';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {ParamList} from '../../../navigation/RootNavigation';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import {useSelector} from 'react-redux';
import {selectUserID} from '../../../../helpers/state/Global/globalSlice';
import WaitingModal from '../../../custom/ui/WaitingModal';
import OrderCard from '../../../custom/cards/OrderCard';

const Tab = createMaterialTopTabNavigator();
export type Items = {
  ArriveAt: string;
  FoodName: string;
  Id: string;
  Image: string;
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

const OrderManagement = () => {
  const userID = useSelector(selectUserID);
  const [order, setOrder] = useState<OrderItems[]>([]);
  const [resfresh, setRefresh] = useState(false);

  const ModalLoad = () => {
    return (
      <Modal animationType="fade" transparent visible={resfresh}>
        <WaitingModal />
      </Modal>
    );
  };

  const getOrders = async () => {
    const response = await AxiosInstance().post('/get-user-order-history.php', {
      id: userID,
    });
    console.log(response);
    setOrder(response.data);
  };
  useEffect(() => {
    getOrders();
  }, []);
  const navigation = useNavigation<NavigationProp<ParamList, 'HomeDrawer'>>();
  const {width, height} = Dimensions.get('window');

  return (
    <View style={[screenStyles.parent_container, {flexGrow: 1}]}>
      <StatusBar backgroundColor={Colors.orange} barStyle="dark-content" />
      <TitleBar
        value="Quản lý đơn hàng"
        style={{paddingHorizontal: 20}}
        onLeftPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        notify={0}
        onRightPress={() => {
          navigation.navigate('Profile');
        }}
      />
      <ModalLoad />
      <FlatList
        data={order}
        nestedScrollEnabled={true}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 15}}
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
            <OrderCard
              id={item.Id}
              totalValue={item.TotalValue}
              padding={20}
              style={{marginVertical: 10}}
              orderDate={item.CreateAt.slice(0, 10)}
              items={item.Items}
              onPress={() => {navigation.navigate('US_OrderDetail', {id: item.Id})}}
            />
          );
        }}
      />
    </View>
  );
};

export default OrderManagement;
