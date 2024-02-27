import {
  View,
  Text,
  Modal,
  ScrollView,
  PermissionsAndroid,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import Titlebar from '../../custom/actionbars/Titlebar';
import {screens} from '../../custom/style/scn';
import Logo from '../../../assets/imgs/emptyStore.svg';
import {Colors, fonts} from '../../custom/style/cpt';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import SliderCarousel from '../../custom/sliders/SliderCarousel';
import StoreRate from '../../custom/lists/StoreRate';
import Input from '../../custom/forms/Input';
import AxiosInstance from '../../../../helper/AxiosInstance';

import {set} from 'mongoose';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../helper/state/store';
import {launchCamera} from 'react-native-image-picker';
import ImagePicker from '../../custom/forms/ImagePicker';
import TextArea from '../../custom/forms/TextArea';
import Square_btn from '../../custom/buttons/Square_btn';
import Location from '../../data/location.json';
import Dropdown from '../../custom/forms/Dropdown';

import {
  Response,
  checkResAsync,
  isCheckRes,
} from '../../../../helper/state/restaurants/checkResSlice';
import {
  CreateRes,
  createResAsync,
} from '../../../../helper/state/restaurants/createResSlice';
import RestoScreen from './RestoScreen';
import NoRestoScreen from './NoRestoScreen';

type LocationState = {
  cityIndex: number;
  wardIndex: number;
  districtIndex: number;
};

type LocationAction = {field: keyof LocationState; value: number};

function locationReducer(location: LocationState, action: LocationAction) {
  return {
    ...location,
    [action.field]: action.value,
  };
}

const Store = () => {
  const [res, setRes] = useState<Response | null>(null);
  const resCheck = useSelector((state: RootState) => state.checkRes);
  const dispatResState = useDispatch<AppDispatch>();



  // Fetch data user's restaurant from API
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatResState(checkResAsync('USRIM4TLCSI0EHZHMU2U'));
  //   };
  
  //   fetchData();
  
  //   return () => {
  //     // Cleanup function
  //     console.log("1",resCheck)
  //     if (resCheck.response && res!= resCheck.response) {
  //       setRes(resCheck.response);
  //       console.log('have set response', resCheck.response);
  //     }
  //     console.log("2",resCheck)
  //     console.log('current res:', res);
  //   };
  // }, [res]);

  // Render interface if user has restaurant
  const hasRes = () => {
    return (
      <View style={[screens.parent_Cont]}>
        <Titlebar
          title={{text: 'Your Restaurant'}}
          barStyle={{marginBottom: 20, paddingHorizontal: 20}}
          left={{btnStyle: {opacity: 0}}}
          right={{
            onPress: () => console.log('Create foods'),
          }}
          svgRight="Bread"
        />
        <SliderCarousel />

        <View style={[screens.main_Cont, {marginTop: 20}]}>
          <View>
            <StoreRate color={Colors.green} hasRate />
            <StoreRate svg="Food" color={Colors.orange} hasRate title="Foods" />
            <StoreRate svg="Order" color={Colors.blue} title="Your Order" />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[screens.parent_Cont]}>
      {res != null ? <RestoScreen/> : <NoRestoScreen/>}
    </View>
  );
};

export default Store;
