import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {Colors, screenStyles} from '../../custom/styles/ScreenStyle';
import {StatusBar} from 'react-native';
import NoRestaurantScreen from './Store/NoRestaurantScreen';
import {useDispatch, useSelector} from 'react-redux';
import {
  isLoading,
  selectLoading,
  selectUserID,
} from '../../../helpers/state/Global/globalSlice';
import {
  fetchRestaurant,
  fetchRestaurantID,
  selectRestaurantID,
  selectRestaurantStatus,
} from '../../../helpers/state/AppTab/storeSlice';
import {AppDispatch} from '../../../helpers/state/store';
import HasRestaurantScreen from './Store/HasRestaurantScreen';
import Loading from '../../custom/ui/Loading';
import { useIsFocused } from '@react-navigation/native';

const Store = () => {
  const userID = useSelector(selectUserID);
  const resID = useSelector(selectRestaurantID);
  const resStatus = useSelector(selectRestaurantStatus);
  const load = useSelector(selectLoading);
  const isFocused = useIsFocused();

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const getRestaurantID = async () => {
      dispatch(isLoading(true));
      // await dispatch(fetchRestaurantID(userID));
      await dispatch(fetchRestaurant(userID));
      dispatch(isLoading(false));
    };
    if(isFocused)
    getRestaurantID();
  }, [isFocused]);

  // console.log("(resID && resStatus === 'Active')", (resStatus === 'Active'))
  // console.log("(resID && resStatus === 'Active')", (resStatus))
  // console.log("(resID && resStatus === 'Active')", (resID ))
  // console.log("(resID && resStatus === 'Active')", (resID && resStatus === 'Active'))
  return load ? (
    <Loading />
  ) : (
    <View style={[screenStyles.parent_container]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      { !(resID && resStatus === 'Active')
      ? <NoRestaurantScreen /> : <HasRestaurantScreen />}
    </View>
  );
};

export default Store;
