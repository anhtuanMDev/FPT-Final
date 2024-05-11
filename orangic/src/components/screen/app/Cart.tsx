import { View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  isLoading,
  selectHost,
  selectLoading,
  selectUserID,
} from '../../../helpers/state/Global/globalSlice';
import AxiosInstance from '../../../helpers/AxiosInstance';
import { showMessage } from 'react-native-flash-message';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import { fonts } from '../../custom/styles/ComponentStyle';
import { Colors, screenStyles } from '../../custom/styles/ScreenStyle';
import CartBar from '../../custom/cards/CartBar';
import CartItems from '../../custom/cards/CartItems';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WaitingModal from '../../custom/ui/WaitingModal';
import { useIsFocused } from '@react-navigation/native';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import AddressItemCart from '../../custom/cards/AddressItemCart';
import { ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

/** Declaring order's item data */

type Data = {
  Id: string;
  FoodID: string;
  Quantity: number;
  Name: string;
  Price: number;
  Discount: number;
  Description: string;
  Pick: boolean;
  Image: string[];
};


enum PaymentMethodsEnum {
  COD = 'COD',
  Stripe = 'Stripe',
}

/** Declare reducer state and action */

type CartState = {
  data: Data[];
  Id: string;
  AddressID: string;
  Address: string;
  Status: string;
};

type CartAction = {
  type: keyof CartState;
  payload: any;
};

type AddressItem = {
  Id: string,
  Address: string,
  City: string,
  District: string,
  Ward: string,
  Phone: string,
  Priority: number,
  Status: string,
  OwnerID: string
}

function handleCartItem(state: CartState, payload: CartAction) {
  return {
    ...state,
    [payload.type]: payload.payload,
  };
}

const Cart = () => {
  const host = useSelector(selectHost);
  const id = useSelector(selectUserID);
  const load = useSelector(selectLoading);

  const dispatch = useDispatch();
  const [check, setCheck] = useState(false);
  const [locate, setLocate] = useState('');
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  const [allAddress, setAllAddress] = useState<AddressItem[]>([]);

  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useReducer(handleCartItem, {
    data: [],
    AddressID: '',
    Id: '',
    Status: '',
    Address: '',
  });

  /** Delete item in order */

  const deleteItem = async (foodID: string, orderItemID: string) => {
    const body = {
      foodID,
      orderItemID,
    };
    const repsonse = await AxiosInstance().post('/post-delete-items.php', body);
    if (repsonse.status) {
      showMessage({
        message: 'Xóa thành công',
        description: 'Xóa sản phẩm thành công',
        type: 'success',
        icon: 'success',
      });
    } else {
      showMessage({
        message: 'Lỗi xóa sản phẩm',
        description: 'Lỗi hệ thống, vui lòng thử lại sau',
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  /** Get cart item */

  const getCartItem = async (id: string) => {
    try {
      const response = await AxiosInstance().post('/get-waiting-order.php', {
        id,
      });
      let infor = await response.data;
      if (response.status) {
        if (infor.length != 0) {
          const item: Data[] = infor.data.map((item: Data) => {
            return { ...item, Pick: !!item.Pick };
          });
          setData({ type: 'data', payload: item });
          setData({ type: 'Id', payload: response.data.Id });
          setData({ type: 'AddressID', payload: response.data.AddressID });
          console.log(response.data)
        } else {
          setData({ type: 'data', payload: [] });
          setData({ type: 'Id', payload: '' });
          setData({ type: 'AddressID', payload: [] });
        }
      } else {
        setData({ type: 'data', payload: [] });
        setData({ type: 'Id', payload: '' });
        setData({ type: 'AddressID', payload: [] });
      }
    } catch (error) {
      showMessage({
        message: `Lỗi ấy dữ liệu ${error}`,
        description: 'Lỗi hệ thống, vui lòng thử lại sau',
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  useEffect(() => {
    if (isFocused) getCartItem(id as string);
  }, [isFocused]);

  useEffect(() => {
    if (data.data) {
      if (check) {
        const arr = data.data.map((item: Data) => {
          return { ...item, Pick: true };
        });
        setData({ type: 'data', payload: arr });
      }
    }
  }, [check]);

  useEffect(() => {
    if (Array.isArray(data.data) && data.data.length != 0) {
      const allCheck = data.data.every((item: Data) => item.Pick);
      setCheck(allCheck);
    }
  }, [data]);

  const checkingItemInPayment = () => {
    if (
      /** if no item got check */
      !data.data.every((item: Data) => {
        return !item.Pick;
      })
    ) {
      const item = data.data
        .filter(item => {
          if (item.Pick) return item;
        })
        .map(item => ({
          id: item.Id,
          quantity: item.Quantity,
        }));
      // await updateItemInPaymentPick(data.Id, item);
      handlePayment();
    } else {
      showMessage({
        type: 'warning',
        message: 'Bạn phải chọn ít nhất 1 món ăn để thanh toán',
        icon: 'warning',
      });
    }
  };

  const updateItemInPaymentPick = async (
    orderID: string,
    item: { id: string; quantity: number }[],
  ) => {
    const body = {
      orderID: orderID,
      item: item,
    };
    const response = await AxiosInstance().post(
      '/post-confirm-payment.php',
      body,
    );
    const c = response.status;
    if (c) {
      showMessage({
        message: response.statusText,
        type: 'success',
        icon: 'success',
      });
      handlePayment();
    } else {
      showMessage({
        message: response.statusText,
        type: 'danger',
        icon: 'danger',
      });
    }
  };

  /* Initialise payment Sheet*/

  const [ready, setReady] = useState(false);

  const publicKey =
    'pk_test_51OsaA1AFTGMMMmVwNrZ2DZJ0yFvXYpW16C4oaCwwuVROBuJMgoFCefRGy77C8YMlFpIAx02m6Uaq8EYcpb52GgUR006Tg9Wjh6';
  const { initPaymentSheet, presentPaymentSheet, loading } = usePaymentSheet();

  useEffect(() => {
    initialisePaymentSheet();
  }, []);

  const initialisePaymentSheet = async () => {
    const { paymentIntent, emphermeralKey, customer } =
      await fetchPaymentIntentClientSecret();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: emphermeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      returnURL: 'stripe-example://stripe-redirect',
      merchantDisplayName: 'Example Inc.',
    });

    if (error) {
      console.log('initialisePaymentSheet', error);
    } else {
      setReady(true);
      console.log('Initialize payment success');
      // const body = {
      //   orderID: data.Id,
      //   userID: id as string,
      //   addressID: data.AddressID,
      // };

      // const response = await AxiosInstance().post(
      //   '/post-handle-after-payment.php',
      //   body,
      // );
      // if (response.status) {
      //   setRefresh(true);
      //   getCartItem(id as string);
      //   setRefresh(false);
      //   showMessage({
      //     type: 'success',
      //     icon: 'success',
      //     message: response.statusText,
      //   });
      //   setReady(false);
      //   setRefresh(false);
      //   return;
      // }

      // showMessage({
      //   type: 'danger',
      //   icon: 'danger',
      //   message: response.statusText,
      // });
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const response = await fetch(`${host}/index.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { paymentIntent, emphermeralKey, customer } = await response.json();
      return {
        paymentIntent,
        emphermeralKey,
        customer,
      };
    } catch (error) {
      console.error('fetchPaymentIntentClientSecret Error:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!ready) {
      await initialisePaymentSheet();
    }

    const { error } = await presentPaymentSheet();
    if (error) {
      console.log(
        `handlePayment error: ${error.code}, Error message: ${error.message}`,
      );
    } else {
      // setReady(false);
      const body = {
        orderID: data.Id,
        userID: id as string,
        addressID: data.AddressID,
      };

      const response = await AxiosInstance().post(
        '/post-handle-after-payment.php',
        body,
      );
      if (response.status) {
        setRefresh(true);
        getCartItem(id as string);
        setRefresh(false);
        showMessage({
          type: 'success',
          icon: 'success',
          message: response.statusText,
        });
        setReady(false);
        setRefresh(false);
        return;
      }

      showMessage({
        type: 'danger',
        icon: 'danger',
        message: response.statusText,
      });

    }
  };

  const ModalProcess = () => {
    return (
      <Modal animationType="slide" transparent={true} visible={refresh}>
        <WaitingModal />
      </Modal>
    );
  };

  const getMainAddress = async (userID: string) => {
    const response = await AxiosInstance().post('/get-user-main-address.php', {
      id: userID,
    });
    if (response.status) {
      if (response.data[0]) {
        setData({ type: 'Address', payload: response.data[0].Address });
        setData({ type: 'AddressID', payload: response.data[0].Id });
      }

    }
  };

  useEffect(() => {
    if (id) {
      getMainAddress(id as string);
    }
  }, [id]);

  const getAllAddress = async () => {
    const response = await AxiosInstance().post('/get-user-all-address.php', { id: id });

    if (response.status) {
      const address: AddressItem[] = response.data;
      setAllAddress(address)
    } else {
      showMessage({
        message: 'Lỗi lấy dữ liệu',
        description: 'Lỗi hệ thống, vui lòng thử lại sau',
        type: 'danger',
        icon: 'danger',
      });
    }

  }

  useEffect(() => {
    if (isFocused) {
      getAllAddress();
    }
  }, [isFocused])

  const ChooseAddressModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{ borderRadius: 10 }}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(!modalVisible)}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
          </TouchableWithoutFeedback>
          <View style={{ maxHeight: 500, width: '80%', backgroundColor: '#fff', borderRadius: 20, padding: 20 }}>
            <Text style={[fonts.captionBold, { marginVertical: 20, textAlign: "center" }]}>Chọn địa chỉ</Text>
            <FlatList
              data={allAddress}
              style={{ borderRadius: 20 }}
              renderItem={({ item }) => {
                return (
                  <AddressItemCart
                    address={item.Address}
                    style={{ marginVertical: 6, backgroundColor: item.Id == data.AddressID ? Colors.unselected : Colors.white, borderRadius: 10 }}
                    detail={`${item.Ward}, ${item.District}, ${item.City}`}
                    onPress={() => {
                      // setLocate(item.Address);
                      setData({ type: 'Address', payload: item.Address })
                      setData({ type: 'AddressID', payload: item.Id })

                      setModalVisible(!modalVisible);
                    }}
                  />
                );
              }}
              keyExtractor={item => item.Id}
            />
          </View>
        </View>
      </Modal>
    )
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StripeProvider publishableKey={publicKey}>
        <View style={screenStyles.parent_container}>
          {/* <ModalProcess /> */}
          {modalVisible && (
            <View
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1,
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <View style={{ maxHeight: 300, backgroundColor: "#000" }}>
                <ChooseAddressModal />
              </View>
            </View>
          )}
          <CartBar
            value={check}
            title="Cart"
            style={{ paddingHorizontal: 20, marginTop: 10 }}
            onPress={() => {
              setCheck(!check);
              if (check) {
                const arr = data.data.map((item: Data) => {
                  return { ...item, Pick: false };
                });
                setData({ type: 'data', payload: arr });
              }
            }}
          />

          <FlatList
            refreshing={refresh}
            onRefresh={() => {
              getCartItem(id as string);
            }}
            ItemSeparatorComponent={() => {
              return <View style={{ height: 10 }} />;
            }}
            data={data.data}
            showsVerticalScrollIndicator={false}
            style={{ paddingHorizontal: 20, marginTop: 20, marginBottom: 20 }}
            renderItem={({ item }) => (
              <CartItems
                image={
                  item.Image.length > 0
                    ? { uri: `${host}/uploads/${item.Image}.jpg` }
                    : undefined
                }
                onDel={async () => {
                  setRefresh(true);
                  await deleteItem(item.FoodID, item.Id);
                  await getCartItem(id as string);
                  setRefresh(false);
                }}
                key={item.Id}
                name={
                  item.Name.length > 16
                    ? item.Name.slice(0, 16) + '...'
                    : item.Name
                }
                price={Math.round(item.Price * (1 - item.Discount / 100))}
                quantity={item.Quantity}
                intro={
                  item.Description.length > 50
                    ? item.Description.slice(0, 50) + '...'
                    : item.Description
                }
                value={item.Pick}
                onPress={() => {
                  setData({
                    type: 'data',
                    payload: data.data.map(i => {
                      if (i.Id === item.Id) i.Pick = !i.Pick;
                      return i;
                    }),
                  });
                }}
                add={() => {
                  data.data &&
                    setData({
                      type: 'data',
                      payload: data.data.map(i => {
                        if (i.Id === item.Id) i.Quantity++;
                        return i;
                      }),
                    });
                }}
                minus={() => {
                  data.data &&
                    setData({
                      type: 'data',
                      payload: data.data.map(i => {
                        if (i.Id === item.Id && i.Quantity > 1) i.Quantity--;
                        return i;
                      }),
                    });
                }}
              />
            )}
          />

          <View style={{ marginTop: 10, paddingHorizontal: 20 }}>
            <View style={{ marginBottom: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  // getAllAddress();
                  setModalVisible(true);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  // justifyContent: 'space-between',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  height: 50,
                  borderWidth: 1,
                  borderColor: Colors.slate,
                  // marginTop: 5,
                  padding: 10,
                  borderRadius: 10,
                  // marginHorizontal: 20,
                  // flex: 1,
                  backgroundColor: Colors.white,
                }}>
                <Text style={[fonts.captionBold]}>Địa chỉ: </Text>
                <Text style={[fonts.caption]}>
                  {data.Address.length > 25
                    ? data.Address.slice(0, 25) + '...'
                    : data.Address}
                </Text>
              </TouchableOpacity>

              <View style={[ { paddingVertical: 10, paddingTop: 20 }]}>
                <Text style={[fonts.captionBold]}>Phương thức thanh toán: </Text>
                <Dropdown
                  data={[
                    { label: 'COD - Thanh toán khi nhận', value: PaymentMethodsEnum.COD},
                    { label: 'Stripe - Thanh toán trực tuyến', value: PaymentMethodsEnum.Stripe },
                  ]}
                  maxHeight={200}
                  placeholder="Chọn"
                  labelField={'label'}
                  valueField={'value'}
                  value={PaymentMethodsEnum.COD}
                  onChange={text => { }}
                  selectedTextStyle={{ color: Colors.black   }}
                  style={{
                    height: 50,
                    borderWidth: 1,
                    borderColor: Colors.slate,
                    marginTop: 5,
                    padding: 10,
                    borderRadius: 10,
                    // marginHorizontal: 20,
                    // flex: 1,
                    backgroundColor: Colors.white,
                  }}
                />
              </View>

              <View
                style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={[fonts.captionBold]}>Tổng vật phẩm: </Text>
                  <Text style={[fonts.caption]}>
                    {Array.isArray(data.data)
                      ? data.data
                        .map(item => {
                          if (item.Pick) return item.Quantity;
                        })
                        .reduce((acc: number, item) => acc + (item || 0), 0)
                      : 0}
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingVertical: 20,
                    paddingHorizontal: 10,
                  }}>
                  <Text style={[fonts.captionBold]}>Tổng tiền: </Text>
                  <Text style={[fonts.caption]}>
                    {Array.isArray(data.data) &&
                      data.data
                        .map(item => {
                          if (item.Pick)
                            return (
                              Math.round(
                                item.Price * (1 - item.Discount / 100),
                              ) * item.Quantity
                            );
                        })
                        .reduce((acc: number, item) => acc + (item || 0), 0) +
                      ' $'}
                  </Text>
                </View>
              </View>
            </View>
            <Fluid_btn
              style={{ marginBottom: 25 }}
              title="Thanh toán"
              enable={loading || !ready}
              onPress={async () => {
                // setRefresh(true);
                await checkingItemInPayment();
                // handlePayment();
              }}
            />
          </View>
        </View>
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default Cart;