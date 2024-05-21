import {View, Text, StatusBar, Modal, Dimensions, FlatList, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Colors, screenStyles} from '../../../custom/styles/ScreenStyle';
import Empty from '../../../../assets/images/EmptyFoodFav.svg';
import TitleBar from '../../../custom/topbars/TitleBar';
import {
  DrawerActions,
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {ParamList} from '../../../navigation/RootNavigation';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import {useSelector} from 'react-redux';
import {selectUserID} from '../../../../helpers/state/Global/globalSlice';
import WaitingModal from '../../../custom/ui/WaitingModal';
import OrderCard from '../../../custom/cards/OrderCard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AlertConfirm from '../../../custom/alerts/AlertConfirm';
import { showMessage } from 'react-native-flash-message';
import AlertMessage from '../../../custom/alerts/AlertMessage';

// const Tab = createMaterialTopTabNavigator();
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

const OrderManagement = () => {
  const userID = useSelector(selectUserID);
  const [order, setOrder] = useState<OrderItems[]>([]);
  const [resfresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

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
    if(response.status){
      setOrder(response.data);
    }
  };

  const cancelOrder = async(item: Items) => {
    const response = await AxiosInstance().post('/post-update-orderitems-status.php', {
      id: item.Id,
      status: 'Cancled',
    });
    console.log("cancel: ",response)
    if (response.status){
      const newOrder = order.map((orderItem) => {
        if (orderItem.Id === item.OrderID){
          orderItem.Items.map((items) => {
            if (items.Id === item.Id){
              items.Status = 'Cancled';
            }
          });
        }
        return orderItem;
      });
      setOrder(newOrder);
      setVisible(true);
      showMessage({
        message: 'Hủy đơn hàng thành công',
        type: 'success',
        icon: 'info',
      });
    }
  }

  useEffect(() => {
    if(isFocused) getOrders();
  }, [isFocused]);
  const navigation =
    useNavigation<NavigationProp<ParamList, 'OrderManagement'>>();
  const {width, height} = Dimensions.get('window');
  const [action, setAction] = useState(false);
  const [orderAction, setOrderAction] = useState<Items>({} as Items);
  const [visible, setVisible] = useState(false);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={[screenStyles.parent_container, {flexGrow: 1,}]}>
        <StatusBar backgroundColor={Colors.orange} barStyle="dark-content" />
        <TitleBar
          value="Quản lý đơn hàng"
          style={{paddingHorizontal: 20}}
          onLeftPress={() => {
            navigation.dispatch(DrawerActions.openDrawer());
          }}
          notify={0}
          onRightPress={() => {
            navigation.navigate('Notifications');
          }}
        />
        <AlertConfirm
          visible={action}
          title="Bạn muốn hủy đơn hàng ?"
          content={`Bạn có chắc chắn muốn hủy đơn hàng ${orderAction.FoodName} với số lượng ${orderAction.Quantity} không ?`}
          onPress={setAction}
          onConfirm={() => {
            cancelOrder(orderAction);
            setAction(false);
          }}
        />
        <AlertMessage
          visible={visible}
          title="Bạn muốn hủy đơn hàng ?"
          content={`Bạn sẽ được hoàn lại ${orderAction.Value}.000 đ giá tiền cho đơn hàng ${orderAction.FoodName} với số lượng ${orderAction.Quantity}`}
          onPress={setVisible}
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
          renderItem={({item, index}: {item: OrderItems, index: number}) => {
            // console.log("item:",item.Items);
            return (
              <OrderCard
                id={item.Id}
                totalValue={item.TotalValue}
                padding={20}
                style={{marginVertical: 10}}
                orderDate={item.CreateAt.slice(0, 10)}
                items={item.Items}
                onAlert={setAction}
                onGetInfor={setOrderAction}
                onPress={() => {
                  navigation.navigate('US_OrderDetail', {id: item.Id});
                }}
              />
            );
          }}
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default OrderManagement;
