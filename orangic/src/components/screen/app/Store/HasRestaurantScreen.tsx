import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectHost } from '../../../../helpers/state/Global/globalSlice';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import { selectRestaurantID, setRestaurantID } from '../../../../helpers/state/AppTab/storeSlice';
import { showMessage } from 'react-native-flash-message';
import {
  NavigationProp,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import { ParamList } from '../../../navigation/RootNavigation';
import { Colors, screenStyles } from '../../../custom/styles/ScreenStyle';
import { fonts } from '../../../custom/styles/ComponentStyle';
import Icons, { IconName } from '../../../../assets/icons/Icons';
import Shop from '../../../../assets/images/Shop.svg';
import SectionBar from '../../../custom/topbars/SectionBar';
import Empty from '../../../../assets/images/Food.svg';
import RestaurantSmallCart from '../../../custom/cards/RestaurantSmallCart';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetFlatList, BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import TextArea from '../../../custom/textinput/TextArea';
import CustomRating from '../../../custom/ui/CustomRating';
import ReviewCard from '../../../custom/cards/ReviewCard';
import { convertPoint } from '../../../navigation/AppTabNavigation';
import EmptyReviews from '../../../../assets/images/EmptyRestaurantFav.svg';

/** Declaring reducer state */

type Item = {
  Id: string;
  Name: string;
  Price: string;
  TimeMade: string;
  Discount: number;
  FeatureItem: boolean;
  Image: { Id: string };
};

type Comment = {
  Id: string;
  Point: number;
  UserID: string;
  TargetID: string;
  Comment: string;
  Status: string;
  CreateAt: string;
  UpdateAt: string;
  ImageID: string;
  UserName: string;
  UserRank: number;
};

export type InforState = {
  Name: string;
  Rating: number;
  Address: string | null;
  City: string | null;
  District: string | null;
  Ward: string | null;
  Email: string;
  Phone: string;
  Orders: number;
  Foods: Item[];
  Reviews: Comment[];
  Images: { Id: string }[];
  SpecialFood: Item[];
  Introduction: string;
};

const initialState: InforState = {
  Name: '',
  Address: null,
  City: '',
  District: '',
  Ward: '',
  Email: '',
  Phone: '',
  Rating: 0,
  Orders: 0,
  Foods: [],
  Reviews: [],
  Images: [],
  SpecialFood: [],
  Introduction: '',
};

const HasRestaurantScreen = () => {
  const size = Dimensions.get('window').width;
  const host = useSelector(selectHost);
  // const userID = useSelector(selectUserID);
  const resID = useSelector(selectRestaurantID);
  // const setResID = useSelector(setRestaurantID);
  const dispatch = useDispatch();
  const [infor, setInfor] = useState<InforState>(initialState);
  const naviagtion = useNavigation<NavigationProp<ParamList, 'Store'>>();
  const foucsed = useIsFocused();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '65%'], []);
  const [modalVisible, setModalVisible] = useState(false);

  const getDetail = async () => {
    try {
      // console.log(resID);
      const response = await AxiosInstance().post(
        'get-user-restaurant-details.php',
        { id: resID },
      );

      // console.log("res detail",response)
      const array: InforState = response.data;
      if (array) {
        array.SpecialFood = array.Foods.filter((item: Item) => item.FeatureItem) // Filter out undefined values
          .map((item: Item) => item); // Map to Item type
      }
      // console.log("response", response);
      // console.log("array", array)
      setInfor(array);
      // console.log(response.data);
    } catch (error) {
      console.log('has restaurants screen get detail error: ', error);
    }
  };

  useEffect(() => {
    if (foucsed) getDetail();
  }, [foucsed]);

  const checkAddress = () => {
    // console.log('address', infor.Address);
    if (!infor.Address) {
      showMessage({
        message: 'Không đủ thông tin',
        description:
          'Xin lỗi, bạn chỉ được phép bán hàng khi đã điền đầy đủ thông tin',
        type: 'warning',
        icon: 'warning',
      });
      return false;
    }
    return true;
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const removeRestaurant = async () => {
    try {
      const response = await AxiosInstance().post('remove-restaurant.php', {
        id: resID,
      });
      if (response.status) {
        showMessage({
          message: 'Đóng cửa nhà hàng thành công',
          type: 'success',
          icon: 'success',
        });

        dispatch(setRestaurantID(''));

        naviagtion.navigate('Home');
      } else {
        showMessage({
          message: 'Đóng cửa nhà hàng thất bại',
          type: 'danger',
          icon: 'warning',
        });
      }
    } catch (error) {
      console.log('remove restaurant error: ', error);
    }
  }

  const handleRemoveRestaurant = () => {
    setModalVisible(!modalVisible);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[screenStyles.parent_container]}>
        {modalVisible && (
          <View style={{
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
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >

              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                  backgroundColor: Colors.white,
                  width: '80%',
                  padding: 20,
                  borderRadius: 10,
                  elevation: 5
                }}>
                  <Text style={[fonts.captionBold, { textAlign: 'center' }]}>Xác nhận xóa</Text>
                  <Text style={[fonts.text, { marginTop: 10, textAlign: 'center' }]}>Bạn có chắc chắn muốn đóng cửa cửa hàng không?</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 20 }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.white,
                        borderColor: Colors.ember,
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 10
                      }}
                      onPress={() => {
                        removeRestaurant();
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={[fonts.text, { color: Colors.ember }]}>Xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        backgroundColor: Colors.ember,
                        padding: 10,
                        borderRadius: 10
                      }}
                      onPress={() => {
                        setModalVisible(!modalVisible);
                      }}>
                      <Text style={[fonts.text, { color: Colors.white }]}>Hủy</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        )}

        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={{ height: size - 150 }}>
          <FlatList
            data={infor.Images}
            contentContainerStyle={{ flexGrow: 0, justifyContent: 'center' }}
            horizontal
            snapToAlignment="center"
            decelerationRate={'fast'}
            pagingEnabled
            snapToInterval={size}
            disableIntervalMomentum={true}
            showsHorizontalScrollIndicator={false}
            ListEmptyComponent={<Shop width={size} height={size - 150} />}
            renderItem={({ item, index }) => {
              return (
                <Image
                  key={index}
                  source={{ uri: `${host}/uploads/${item.Id}.jpg` }}
                  style={{
                    width: size,
                    height: 'auto',
                    resizeMode: 'contain',
                  }}
                />
              );
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginVertical: 10,
          }}>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.black,
              }}>
              {infor.Rating || 0}
            </Text>
            <Text style={[fonts.captionBold, { color: Colors.blue }]}>
              Đánh giá
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.black,
              }}>
              {infor.Foods.length || 0}
            </Text>
            <Text style={[fonts.captionBold, { color: Colors.orange }]}>
              Món ăn
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: Colors.black,
              }}>
              {infor.Orders || 0}
            </Text>
            <Text style={[fonts.captionBold, { color: Colors.green }]}>
              Đơn hàng
            </Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          <View>
            <SectionBar
              name="Món ăn đặc sản"
              style={{
                marginLeft: 10,
                marginRight: 10,
              }}
              showAction={infor.SpecialFood.length > 10}
              actionStyle={{ color: Colors.green }}
              onPress={() => { }}
            />
            <FlatList
              data={infor.SpecialFood}
              style={{ marginVertical: 10, paddingLeft: 20 }}
              contentContainerStyle={{ flexGrow: 0, justifyContent: 'center' }}
              horizontal
              ListEmptyComponent={
                <View style={{ marginLeft: -15, marginVertical: 50 }}>
                  <Empty width={size} height={150} />
                </View>
              }
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <RestaurantSmallCart
                    key={item.Id}
                    image={
                      item.Image ? `${host}/uploads/${item.Image.Id}.jpg` : ''
                    }
                    name={
                      item.Name.length > 10
                        ? item.Name.slice(0, 11) + '...'
                        : item.Name
                    }
                    style={{ marginRight: 10, marginVertical: 10 }}
                    onPress={() => {
                      naviagtion.navigate('SS_FoodDetail', { id: item.Id });
                    }}
                  />
                );
              }}
            />
          </View>

          <View>
            <SectionBar
              name="Tất cả món ăn"
              showAction={infor.Foods.length > 0}
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
              }}
              actionStyle={{ color: Colors.green }}
              onPress={() => { }}
            />
            <FlatList
              data={infor.Foods}
              style={{ marginVertical: 10, paddingLeft: 20 }}
              ListEmptyComponent={
                <View style={{ marginLeft: -15, marginVertical: 50 }}>
                  <Empty width={size} height={150} />
                </View>
              }
              contentContainerStyle={{ flexGrow: 0, justifyContent: 'center' }}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => {
                return (
                  <RestaurantSmallCart
                    key={item.Id}
                    image={
                      item.Image ? `${host}/uploads/${item.Image.Id}.jpg` : ''
                    }
                    name={
                      item.Name.length > 10
                        ? item.Name.slice(0, 11) + '...'
                        : item.Name
                    }
                    style={{ marginRight: 10, marginVertical: 10 }}
                    onPress={() => {
                      naviagtion.navigate('SS_FoodDetail', { id: item.Id });
                    }}
                  />
                );
              }}
            />
          </View>

          <View style={{ height: 150 }} />
        </ScrollView>
        <View
          style={{
            width: size / 1.2,
            position: 'absolute',
            flexDirection: 'row',
            paddingVertical: 10,
            alignItems: 'center',
            alignSelf: 'center',
            bottom: 40,
            marginLeft: 'auto',
            marginRight: 'auto',
            borderRadius: 10,
            justifyContent: 'space-evenly',
            backgroundColor: Colors.orange,
          }}>
          <TouchableOpacity
            onPress={() => {
              naviagtion.navigate('AllFood');
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.food} size={20} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              naviagtion.navigate('RestaurantStatistic');
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.rank} size={20} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              handlePresentModalPress();
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.star} size={20} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              naviagtion.navigate('ChangeRestaurantInfor', { infor });
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.setting} size={20} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              naviagtion.navigate('RestaurantOrders');
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.box} size={20} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              checkAddress() && naviagtion.navigate('CreateFood', { id: resID });
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.add} size={20} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              naviagtion.navigate('JoinEvent');
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.calendar} size={20} color={Colors.white} />
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => {
              handleRemoveRestaurant();
            }}
            style={{
              borderWidth: 1,
              borderRadius: 20,
              borderColor: Colors.white,
              padding: 5,
            }}>
            <Icons name={IconName.lock} size={20} color={Colors.white} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderRadius: 10,
              borderColor: Colors.white,
              padding: 5,
              backgroundColor: Colors.white,
            }}>
            <Icons name={IconName.warning} size={20} color={Colors.orange} />
          </TouchableOpacity>
        </View>
        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            style={{
              backgroundColor: Colors.white,
              elevation: 5,
              paddingHorizontal: 20,
            }}
            snapPoints={snapPoints}>
            <BottomSheetFlatList
              data={infor.Reviews}
              ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
              ListEmptyComponent={() => {
                return (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <EmptyReviews width={size} height={150} />
                    <Text style={[fonts.caption, { color: Colors.orange }]}>
                      Chưa có đánh giá nào
                    </Text>
                  </View>
                );
              }}
              contentContainerStyle={{ paddingVertical: 20 }}
              renderItem={({ item }) => (
                <ReviewCard
                  name={item.UserName}
                  point={item.Point}
                  rank={convertPoint(item.UserRank)}
                  createAt={item.CreateAt}
                  content={item.Comment}
                />
              )}
            />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default HasRestaurantScreen;
