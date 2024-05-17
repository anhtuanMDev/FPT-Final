import { View, Text, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, RefreshControl } from 'react-native';
import React, { useEffect, useReducer, useRef, useState } from 'react';
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
import { buttons, fonts } from '../../custom/styles/ComponentStyle';
import { Colors, screenStyles } from '../../custom/styles/ScreenStyle';
import CartBar from '../../custom/cards/CartBar';
import CartItems from '../../custom/cards/CartItems';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import WaitingModal from '../../custom/ui/WaitingModal';
import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { StripeProvider, usePaymentSheet } from '@stripe/stripe-react-native';
import AddressItemCart from '../../custom/cards/AddressItemCart';
import { ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icons, { IconName } from '../../../assets/icons/Icons';
import { ParamList } from '../../navigation/RootNavigation';
import CouponUserList from '../../custom/cards/CouponUserList';
import ViewShot from 'react-native-view-shot';

import axios from 'axios';


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

type CouponFood = {
  FoodID: string;
  Quantity: number;
  Name: string;
  Price: number;
  FoodDiscount: number;
};


enum PaymentMethodsEnum {
  COD = 'COD',
  Stripe = 'Stripe',
}

/** Declare reducer state and action */

type CartState = {
  data: Data[],
  selectedCouponFood: CouponFood[],
  Id: string,
  AddressID: string,
  Address: string,
  AddressDetail: string,
  Status: string,

  CouponID: string,
  CouponDiscount: number,
  CouponDetail: string
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
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const host = useSelector(selectHost);
  const id = useSelector(selectUserID);
  const load = useSelector(selectLoading);

  const dispatch = useDispatch();
  const [check, setCheck] = useState(true);
  const [locate, setLocate] = useState('');
  const [refresh, setRefresh] = useState(false);
  const isFocused = useIsFocused();

  const [allAddress, setAllAddress] = useState<AddressItem[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [couponModalVisible, setCouponModalVisible] = useState(false);


  const [exchangeRate, setExchangeRate] = useState<number>();



  useEffect(() => {
    getExchangeRate();
  }, []);

  const getExchangeRate = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      const rate = response.data.rates.VND;
      setExchangeRate(rate);
    } catch (error) {
      console.error('Error fetching the exchange rate:', error);
    }
  };

  const convertVNDtoUSD = (amountVND: number) => {
    if (!exchangeRate) return -1;

    return (amountVND / exchangeRate);
  };

  const [data, setData] = useReducer(handleCartItem, {
    data: [],
    selectedCouponFood: [],
    AddressID: '',
    Id: '',
    Status: '',
    Address: '',
    AddressDetail: "",

    CouponID: '',
    CouponDiscount: 0,
    CouponDetail: ""
  });

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const viewShotRef = useRef<ViewShot>(null);

  const generateID = (prefix: string) => {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = prefix;
    for (let i = 0; i < 17; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  };

  const captureScreen = async () => {
    try {
      if (viewShotRef.current) {
        const uri = await viewShotRef.current?.capture?.();
        if (uri) {
          console.log('Image captured:', uri);
          // Lưu trữ hoặc chia sẻ hình ảnh ở đây
          uploadImage(uri);
        } else {
          console.error('Failed to capture image');
        }
      } else {
        console.error('viewShotRef is not defined');
      }
    } catch (error) {
      console.error('Capture failed:', error);
    }

  };

  const uploadImage = async (uri: string) => {
    // lấy uri của hình ảnh và gửi nó lên server
    const id = generateID('IMG');

    const formData = new FormData();
    formData.append('image', {
      uri: uri,
      name: `${id}.jpg`,
      type: 'image/jpg',
    });
    const response = await AxiosInstance('multipart/form-data').post(
      '/upload-file.php',
      formData,
    );

    if (response.status) {
      console.log('Upload image success:', response.data);

      // const body = {
      //   id: id,
      //   ownerID: data.Id
      // };

      // const upload: any = await AxiosInstance().post('/insert-image.php', body);
    } else {
      console.error('Upload image failed:', response.statusText);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getCartItem(id as string).then(() => setRefresh(false));
  }, []);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsEnum>();

  const changePaymentMethods = (value: PaymentMethodsEnum) => {
    setPaymentMethods(value);
  }

  const [subtotal, setSubtotal] = useState(0);
  const [restaurantReduction, setRestaurantReduction] = useState(0);
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (Array.isArray(data.data) && data.data.length != 0) {
      const total = data.data.map(item => {
        if (item.Pick)
          return (Math.round(item.Price) * item.Quantity);
      }).reduce((prev: number, current) => prev + (current || 0), 0);

      setSubtotal(total);
    } else { setSubtotal(0) }
  }, [data.data]);

  useEffect(() => {
    if (Array.isArray(data.data) && data.data.length != 0) {
      const total = data.data.map(item => {
        if (item.Pick)
          return (Math.round(item.Price * (item.Discount / 100)) * item.Quantity);
      }).reduce((prev: number, current) => prev + (current || 0), 0);

      setRestaurantReduction(total);
    } else { setRestaurantReduction(0) }
  }, [data.data]);

  useEffect(() => {
    if (Array.isArray(data.data) && data.data.length != 0) {
      const total = data.data.map(item => {
        if (item.Pick)
          if (data.selectedCouponFood.find(i => i.FoodID === item.FoodID))
            return (Math.round(item.Price * (data.CouponDiscount / 100)) * item.Quantity)
          else
            return (Math.round(item.Price * (item.Discount / 100)) * item.Quantity);
      }).reduce((prev: number, current) => prev + (current || 0), 0);
      setCouponDiscount(total);
    } else { setCouponDiscount(0) }
  }, [data.data, data.selectedCouponFood]);

  useEffect(() => {
    if (data.CouponID.length === 0) {
      setCouponDiscount(0);
    }

    const discount = data.CouponID.length !== 0 ? couponDiscount : restaurantReduction;
    const total = subtotal - discount;
    setTotal(total);

  }, [subtotal, restaurantReduction, couponDiscount, data.CouponID]);

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
            return { ...item, Pick: !item.Pick };
          });
          setData({ type: 'data', payload: item });
          setData({ type: 'Id', payload: response.data.Id });
          // setCheck(true);
          console.log(response.data)
        } else {
          setData({ type: 'data', payload: [] });
          setData({ type: 'Id', payload: '' });
        }
      } else {
        setData({ type: 'data', payload: [] });
        setData({ type: 'Id', payload: '' });
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
      data.data.every((item: Data) => {
        return !item.Pick;
      })
    ) {
      showMessage({
        type: 'warning',
        message: 'Bạn phải chọn ít nhất 1 món ăn để thanh toán',
        icon: 'warning',
      });
      return false;
    }

    if (data.AddressID.length === 0) {
      showMessage({
        type: 'warning',
        message: 'Bạn phải chọn địa chỉ giao hàng',
        icon: 'warning',
      });
      return false;
    }

    if (!paymentMethods) {
      showMessage({
        type: 'warning',
        message: 'Bạn phải chọn phương thức thanh toán',
        icon: 'warning',
      });
      return false;
    }

    if (paymentMethods === PaymentMethodsEnum.COD) {
      console.log('COD');
      handleAfterPayment();
      return true;

    } else if (paymentMethods === PaymentMethodsEnum.Stripe) {
      console.log('Stripe')
      handlePayment();
      return true;

    }
    return false;
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
      // handlePayment();
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
  const { initPaymentSheet, presentPaymentSheet, loading, confirmPaymentSheetPayment } = usePaymentSheet();

  const initialisePaymentSheet = async () => {
    try {
      const { paymentIntent, emphermeralKey, customer } =
        await fetchPaymentIntentClientSecret();

      const { error } = await initPaymentSheet({
        customerId: customer,
        customerEphemeralKeySecret: emphermeralKey,
        paymentIntentClientSecret: paymentIntent,
        allowsDelayedPaymentMethods: true,
        returnURL: 'stripe-example://stripe-redirect',
        merchantDisplayName: 'Example Inc.',
        // customFlow: true,
      });

      if (error) {
        setReady(false);
        console.log('initialisePaymentSheet', error);
      } else {
        setReady(true);
        console.log('Initialize payment success');
      }
    } catch (error) {
      setReady(false);
      console.log("initialisePaymentSheet Error:", error);
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const amount = Math.floor(convertVNDtoUSD(total * 1000) * 100);
      const response = await fetch(`${host}/index.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
        }),
      });

      const { paymentIntent, emphermeralKey, customer } = await response.json();
      return {
        paymentIntent,
        emphermeralKey,
        customer,
      };
    } catch (error) {
      console.log('fetchPaymentIntentClientSecret Error:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    console.log('ready', ready)
    if (!ready) {
      setRefresh(true);
      await initialisePaymentSheet();
      setRefresh(false);
    }

    const { error: presentError } = await presentPaymentSheet();

    if (presentError) {
      setReady(false);
      console.log(
        `handlePayment presentError: ${presentError.code}, presentError message: ${presentError.message}`,
      );
    } else {
      await setPaymentSuccess(true);
      setReady(false);
      console.log(
        `handlePayment present susscess`,
      );
      captureScreen();

      handleAfterPayment();
    }

  };

  const handleAfterPayment = async () => {
    try {

      await handleUpdateItemInPaymentPick();
      // captureScreen();
      setPaymentSuccess(false);
      const body = {
        orderID: data.Id,
        userID: id as string,
        addressID: data.AddressID,
        paymentMethod: paymentMethods,
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
        // setReady(false);
        setRefresh(false);
        return;
      }

      console.log('handlePayment', response.statusText);
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: "Thanh toán thất bại",
      });
    } catch (error) {
      console.log('handleAfterPayment', error);
      showMessage({
        type: 'danger',
        icon: 'danger',
        message: "Thanh toán thất bại",
      });

    }
  }

  const handleUpdateItemInPaymentPick = async () => {
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
      await updateItemInPaymentPick(data.Id, item);
    }
  }

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
        let addressDeatil = response.data[0].Phone + " - " + response.data[0].Ward + ", " + response.data[0].District + ", " + response.data[0].City;

        setData({ type: 'Address', payload: response.data[0].Address });
        setData({ type: 'AddressID', payload: response.data[0].Id });
        setData({ type: 'AddressDetail', payload: addressDeatil });
      } else {
        setData({ type: 'Address', payload: '' });
        setData({ type: 'AddressID', payload: '' });
        setData({ type: 'AddressDetail', payload: '' });
      }

    }
  };

  useEffect(() => {
    if (id) {
      getMainAddress(id as string);
    }
  }, [id, isFocused]);

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

  const getSelectedCouponFoodsInCart = async (couponID: string) => {
    const response = await AxiosInstance().post('/get-selected-coupon-foods-in-cart.php', {
      couponId: couponID,
      userId: id
    });

    // console.log(id, couponID)
    // console.log('response', response);

    if (response.status) {
      const data = response.data;
      if (data.length !== 0) {
        setData({ type: 'selectedCouponFood', payload: data });
        // console.log('selectedCouponFood', data.selectedCouponFood);
      }
    }
  }

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
                      let addressDeatil = item.Phone + " - " + item.Ward + ", " + item.District + ", " + item.City;

                      setData({ type: 'Address', payload: item.Address })
                      setData({ type: 'AddressID', payload: item.Id })
                      setData({ type: 'AddressDetail', payload: addressDeatil });

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

  const ChooseCouponModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={couponModalVisible}
        style={{ borderRadius: 10 }}
        onRequestClose={() => {
          setCouponModalVisible(!couponModalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <TouchableWithoutFeedback onPress={() => setCouponModalVisible(!couponModalVisible)}>
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
          </TouchableWithoutFeedback>
          <View style={{ maxHeight: 500, width: '90%', backgroundColor: '#fff', borderRadius: 20, padding: 20 }}>
            <Text style={[fonts.captionBold, { marginVertical: 20, textAlign: "center" }]}>Chọn phiếu mua hàng</Text>
            <CouponUserList
              itemsStyle={{ elevation: 5, shadowColor: Colors.black }}
              selectedItem={{ Id: data.CouponID }}
              selectedItemStyle={{ backgroundColor: Colors.unselected }}
              onItemPress={(item) => {
                let couponDetail = item.Code + ", Giảm: " + item.Discount + "%";

                item.CouponID && getSelectedCouponFoodsInCart(item.CouponID);
                // setData({ type: 'Coupon', payload: item.Coupon })
                setData({ type: 'CouponID', payload: item.Id })
                setData({ type: 'CouponDetail', payload: couponDetail });
                setData({ type: 'CouponDiscount', payload: item.Discount });


                setCouponModalVisible(!couponModalVisible);
              }}
            />
          </View>
        </View>
      </Modal>
    )
  }

  const rightAction = (onDel: () => void) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onDel && onDel();
        }}
        style={{
          width: 110,
          backgroundColor: Colors.ember,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={[
            fonts.titleBold,
            {
              color: Colors.white,
            },
          ]}>
          Xóa
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: "#54545411" }}>

      <StripeProvider publishableKey={publicKey} >
        <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }} style={{ flex: 1 }}>
          <View style={[screenStyles.parent_container, { backgroundColor: "#54545411" }]}>
            <ModalProcess />
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
                <View style={{ maxHeight: 300 }}>
                  <ChooseAddressModal />
                </View>
              </View>
            )}

            {couponModalVisible && (
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
                <View style={{ maxHeight: 500 }}>
                  <ChooseCouponModal />
                </View>
              </View>
            )}
            <CartBar
              value={check}
              title="Cart"
              style={{ padding: 20, backgroundColor: Colors.white }}
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
            <ScrollView style={{ flex: 1, gap: 10 }}
              refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
              showsVerticalScrollIndicator={false}
            >
              <Swipeable renderRightActions={() => rightAction(
                () => {
                  setData({ type: 'Address', payload: '' });
                  setData({ type: 'AddressID', payload: '' });
                  setData({ type: 'AddressDetail', payload: '' });
                }
              )}>
                <TouchableOpacity
                  onPress={() => {
                    data.AddressID.length === 0 && allAddress.length === 0 ?
                      navigation.navigate("Address")
                      : setModalVisible(true);
                  }}

                  style={{
                    padding: 20,
                    backgroundColor: Colors.white,
                    paddingTop: 15,
                  }}>
                  <View style={[{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                    <View style={[{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }]}>
                      <Icons name={IconName.delivery} size={16} color={Colors.orange} />
                      <Text style={[fonts.captionBold, { marginVertical: 5 }]}>
                        Địa chỉ giao hàng
                      </Text>
                    </View>
                    <Icons name={IconName.next} size={20} color={Colors.orange} />
                  </View>
                  {
                    data.AddressID.length == 0 ?
                      <Text style={[fonts.subline, { lineHeight: 22, opacity: 0.5 }]}>(Chưa có địa chỉ)</Text>
                      :
                      <View>
                        <Text style={[fonts.subline, { lineHeight: 22 }]}>{data.Address}</Text>
                        <Text style={[fonts.subline, { lineHeight: 22 }]}>{data.AddressDetail}</Text>
                      </View>
                  }
                </TouchableOpacity>
              </Swipeable>

              {/* <View style={{ borderColor: Colors.orange, borderWidth: 2, borderStyle: "dotted", marginVertical: 20 }} /> */}

              <View style={{ padding: 20, backgroundColor: Colors.white, marginVertical: 10 }}>
                <Text style={[fonts.captionBold, { marginVertical: 5 }]}>
                  Đanh sách món
                </Text>

                <FlatList
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => {
                    return <View style={{ height: 10 }} />;
                  }}
                  data={data.data}
                  ListEmptyComponent={() => {
                    return (
                      <View style={{ alignItems: 'center', justifyContent: 'center', padding: 20 }}>
                        <Text style={[fonts.subline, { color: Colors.slate }]}>
                          Chưa có sản phẩm nào trong giỏ hàng
                        </Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  style={{ marginTop: 20, marginBottom: 20 }}
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
                      originalPrice={Math.round(item.Price)}
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
              </View>

              <View style={{ gap: 10 }}>
                <Swipeable renderRightActions={() => rightAction(
                  () => {
                    setData({ type: 'CouponID', payload: '' })
                    setData({ type: 'CouponDetail', payload: '' });
                    setData({ type: 'CouponDiscount', payload: '' });
                  }
                )}
                >
                  <TouchableOpacity
                    onPress={() => {
                      setCouponModalVisible(!couponModalVisible);
                    }}

                    style={{
                      padding: 20,
                      backgroundColor: Colors.white
                    }}>
                    <View style={[{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
                      <View style={[{ display: "flex", flexDirection: "row", alignItems: "center", gap: 10 }]}>
                        <Text style={[fonts.captionBold, { marginVertical: 5 }]}>
                          Phiếu mua hàng
                        </Text>
                      </View>
                      <Icons name={IconName.next} size={20} color={Colors.orange} />
                    </View>

                    {
                      data.CouponID.length !== 0 &&
                      <View
                        style={[{
                          flexDirection: 'row',
                          paddingHorizontal: 10,
                          alignItems: 'center',
                          gap: 5
                        }]}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 10,
                            position: 'relative'
                          }}>
                          <Icons name={IconName.tag} size={30} color={Colors.orange} />
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 10,
                              position: 'absolute',
                              left: 0, right: 0,
                              top: 0, bottom: 0,
                              justifyContent: 'center',
                            }}>
                            <Icons name={IconName.percent} size={12} color={Colors.white} />
                          </View>
                        </View>

                        <View style={[{ gap: 10, paddingHorizontal: 10 }]}>

                          <Text style={[fonts.sublineBold, { color: Colors.slate }]}>Phiếu: {data.CouponID}</Text>
                          <Text style={[fonts.sublineBold]}>{data.CouponDetail}</Text>

                        </View>
                      </View>
                    }

                  </TouchableOpacity>
                </Swipeable>

                <View style={[{ paddingVertical: 10, paddingTop: 20, gap: 10, padding: 20, backgroundColor: Colors.white }]}>
                  <Text style={[fonts.captionBold]}>Tóm tắt yêu cầu</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      justifyContent: "space-between",
                      paddingBottom: 8,
                      borderBottomWidth: 1,
                      borderColor: Colors.slate,
                    }}>
                    <Text style={[fonts.sublineBold, { color: Colors.slate }]}>Tổng vật phẩm: </Text>
                    <Text style={[fonts.subline, { color: Colors.slate }]}>
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
                      paddingHorizontal: 10,
                      justifyContent: 'space-between'
                    }}>
                    <Text style={[fonts.sublineBold, { color: Colors.slate }]}>Tổng phụ: </Text>
                    <Text style={[fonts.subline, { color: Colors.slate }]}>
                      {
                        subtotal ? subtotal + '.000 đ' : 0 + ' đ'
                      }
                    </Text>
                  </View>

                  {
                    data.CouponID.length === 0 &&
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        justifyContent: 'space-between',
                        // textDecorationLine: 'line-through'
                      }}>
                      <Text style={[fonts.sublineBold, { color: Colors.slate }]}>Giảm giá của các nhà hàng: </Text>
                      <Text style={[fonts.subline, { color: Colors.slate }]}>
                        {restaurantReduction ? "- " + restaurantReduction + '.000 đ' : 0 + ' đ'}
                      </Text>
                    </View>
                  }
                  {
                    data.CouponID.length !== 0 &&
                    <View
                      style={{
                        flexDirection: 'row',
                        paddingHorizontal: 10,
                        justifyContent: 'space-between'
                      }}>
                      <Text style={[fonts.sublineBold, { color: Colors.slate }]}>Giảm giá của phiếu MH: </Text>
                      <Text style={[fonts.subline, { color: Colors.slate }]}>
                        {
                          couponDiscount ? "- " + couponDiscount + '.000 đ' : 0 + ' đ'
                        }
                      </Text>
                    </View>
                  }
                  <View
                    style={{
                      flexDirection: 'row',
                      paddingHorizontal: 10,
                      justifyContent: 'space-between',
                      paddingTop: 10,
                      borderTopWidth: 1,
                      borderColor: Colors.slate,
                    }}>
                    <Text style={[fonts.captionBold]}>Tổng: </Text>
                    <Text style={[fonts.captionBold]}>
                      {
                        total ? total + '.000 đ' : 0 + ' đ'
                      }
                    </Text>
                  </View>


                </View>

                <View style={[{ paddingVertical: 10, paddingTop: 20, padding: 20, backgroundColor: Colors.white }]}>
                  <Text style={[fonts.captionBold]}>Phương thức thanh toán </Text>
                  <Dropdown
                    data={[
                      { label: 'COD - Thanh toán khi nhận', value: PaymentMethodsEnum.COD },
                      { label: 'Stripe - Thanh toán trực tuyến', value: PaymentMethodsEnum.Stripe },
                    ]}
                    maxHeight={200}
                    placeholder="Chọn"
                    labelField={'label'}
                    valueField={'value'}
                    value={paymentMethods}
                    onChange={(item) => {
                      changePaymentMethods(item.value as PaymentMethodsEnum);
                    }}
                    selectedTextStyle={{ color: Colors.black }}
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

              </View>
            </ScrollView>
            <View style={{ paddingHorizontal: 20, backgroundColor: Colors.white }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                  justifyContent: 'space-between'
                }}>
                <Text style={[fonts.captionBold]}>Tổng:</Text>
                <Text style={[fonts.caption]}>
                  {
                    total ? total + '.000 đ' : 0 + ' đ'
                  }
                </Text>
              </View>
              {
                paymentSuccess ?
                  <View
                    style={[buttons.fluid_Cont, { marginBottom: 25, backgroundColor: Colors.green, flexDirection: 'row', gap: 10 }]}>
                    <Text style={[fonts.caption, { color: Colors.white, marginLeft: 5 }]}>Thanh toán thành công</Text>

                    <View
                      style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 300, borderColor: Colors.white, borderWidth: 3, padding: 5 }}
                    >
                      <Icons name={IconName.check} size={15} color={Colors.white} />
                    </View>
                  </View>
                  :
                  <Fluid_btn
                    style={{ marginBottom: 25 }}
                    title="Đặt hàng"
                    // enable={loading || !ready}
                    onPress={async () => {
                      await checkingItemInPayment();
                    }}
                  />
              }

            </View>

          </View>
        </ViewShot>
      </StripeProvider>
    </GestureHandlerRootView>
  );
};

export default Cart;