import { View, Text, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { screenStyles } from '../../../custom/styles/ScreenStyle';
import Lost from '../../../../assets/images/Lost.svg';
import { fonts } from '../../../custom/styles/ComponentStyle';
import Fluid_btn from '../../../custom/buttons/Fluid_btn';

import { NavigationProp, useIsFocused, useNavigation } from '@react-navigation/native';
import { ParamList } from '../../../navigation/RootNavigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurant, selectRestaurantID, selectRestaurantName, selectRestaurantStatus } from '../../../../helpers/state/AppTab/storeSlice';
import { isLoading, selectLoading, selectUserID } from '../../../../helpers/state/Global/globalSlice';
import { AppDispatch } from '../../../../helpers/state/store';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import { showMessage } from 'react-native-flash-message';

const NoRestaurantScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamList, 'Store'>>();
  const resStatus = useSelector(selectRestaurantStatus);
  const resName = useSelector(selectRestaurantName);
  const userID = useSelector(selectUserID);
  const resID = useSelector(selectRestaurantID);

  const load = useSelector(selectLoading);
  const isFocused = useIsFocused();

  const dispatch = useDispatch<AppDispatch>();
  // // useEffect(() => {
  //   const getRestaurantID = async () => {
  //     // dispatch(isLoading(true));
  //     // await dispatch(fetchRestaurantID(userID));
  //     await dispatch(fetchRestaurant(userID));
  //     dispatch(isLoading(false));
  //   };
  //   if (isFocused)
  //     getRestaurantID();
  // // }, [isFocused]);

  const unremoveRestaurant = async () => {
    const response = await AxiosInstance().post('unremove-restaurant.php', { id: resID });

    if (response.status) {
      showMessage({
        message: "Mở cửa thành công",
        type: "success",
      });
      await dispatch(fetchRestaurant(userID));
    } else {
      console.log("response", response);
      showMessage({
        message: "Mở cửa không thành công",
        type: "danger",
      });
    }
  }

  const size = Dimensions.get('window').width;
  return (
    <View
      style={[
        screenStyles.parent_container,
        { alignItems: 'center', justifyContent: 'center', marginTop: -50, paddingHorizontal: 20 },
      ]}>
      <Lost width={size} height={size} />
      <Text style={[fonts.sublineBold, { marginVertical: 20 }]}>
        Nhà hàng của bạn ở đâu thế ?
      </Text>
      <Fluid_btn
        title="Hãy tạo một cái cho bạn nào!"
        style={{
          marginTop: 20,
        }}
        onPress={() => {
          navigation.navigate('CreateRestaurant');
        }}
      />
      {
        (resStatus === 'Removed' || resStatus === 'Remove') &&
        <View style={[{ display: "flex", justifyContent: "center" }]}>
          <Text
            style={[fonts.sublineBold, { marginVertical: 20, textAlign: "center" }]}
          >Hoặc</Text>
          <Fluid_btn
            title={`Mở cửa lại '${resName}'!`}
            style={{
              // marginTop: 20,
              paddingHorizontal: 10,
            }}
            onPress={() => {
              navigation.navigate('Store');
              unremoveRestaurant();
            }}
          />
        </View>

      }

    </View >
  );
};

export default NoRestaurantScreen;
