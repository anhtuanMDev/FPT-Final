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
import Titlebar from '../custom/actionbars/Titlebar';
import {screens} from '../custom/style/scn';
import Logo from '../../../assets/imgs/emptyStore.svg';
import {Colors, fonts} from '../custom/style/cpt';
import Fluid_btn from '../custom/buttons/Fluid_btn';
import SliderCarousel from '../custom/sliders/SliderCarousel';
import StoreRate from '../custom/lists/StoreRate';
import Input from '../custom/forms/Input';
import AxiosInstance from '../../../helper/AxiosInstance';

import {set} from 'mongoose';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../helper/state/store';
import {launchCamera} from 'react-native-image-picker';
import ImagePicker from '../custom/forms/ImagePicker';
import TextArea from '../custom/forms/TextArea';
import Square_btn from '../custom/buttons/Square_btn';
import Location from '../data/location.json';
import Dropdown from '../custom/forms/Dropdown';

import {
  Response,
  checkResAsync,
  isCheckRes,
} from '../../../helper/state/restaurants/checkResSlice';
import {
  CreateRes,
  createResAsync,
} from '../../../helper/state/restaurants/createResSlice';

type LocationState = {
  cityIndex: number;
  wardIndex: number;
  districtIndex: number;
};

interface apiGetResResponse {
  response: any;
  status: boolean;
  message: string;
}

type ResAction = {field: keyof CreateRes; value: string};

function resReducer(createRes: CreateRes, action: ResAction) {
  return {
    ...createRes,
    [action.field]: action.value,
  };
}

type LocationAction = {field: keyof LocationState; value: number};

function locationReducer(location: LocationState, action: LocationAction) {
  return {
    ...location,
    [action.field]: action.value,
  };
}

const Store = () => {
  const [res, setRes] = useState<Response | null>(null);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [img, setImg] = useState<any[]>([]);
  const [image, setImage] = useState<any>();

  const resCheck = useSelector((state: RootState) => state.checkRes);
  const dispatResState = useDispatch<AppDispatch>();

  const [location, dispatchLocation] = useReducer(locationReducer, {
    cityIndex: 0,
    wardIndex: 0,
    districtIndex: 0,
  });

  const map = Location.data;

  const [createRes, dispatchCreateRes] = useReducer(resReducer, {
    name: 'Mericano Expresco',
    introduction: 'This is a restaurant name Mericano Expresco',
    email: 'meri@gmail.com',
    phone: '0586842685',
    address: 'mericano expresco address ',
    district: map[location.cityIndex].name,
    ward: map[location.cityIndex].level2s[location.wardIndex].name,
    city: map[location.cityIndex].level2s[location.wardIndex].level3s[
      location.districtIndex
    ].name,
    status: 'OPEN',
    ownerID: 'USRIM4TLCSI0EHZHMU2U',
  });

  const handleChangeRes = (name: keyof CreateRes) => (value: string) => {
    dispatchCreateRes({field: name, value});
  };

  const handleChangeLocation =
    (name: keyof LocationState) => (value: number) => {
      dispatchLocation({field: name, value});
    };

  // Fetch data user's restaurant from API
  useEffect(() => {
    const fetchData = async () => {
      await dispatResState(checkResAsync('USRIM4TLCSI0EHZHMU2U'));
    };
  
    fetchData();
  
    return () => {
      // Cleanup function
      console.log("1",resCheck)
      if (resCheck.response) {
        setRes(resCheck.response);
        console.log('have set response', resCheck.response);
      } else {
        setRes(null);
        console.log('have set null');
      }
      console.log("2",resCheck)
      console.log('current res:', res);
    };
  }, [resCheck.response]);
  

  const city: string[] = map.map(item => item.name);
  let ward: string[] = map[location.cityIndex].level2s.map(item => item.name);
  let district: string[] = map[location.cityIndex].level2s[
    location.districtIndex
  ].level3s.map(item => item.name);

  useEffect(() => {
    ward = map[location.cityIndex].level2s.map(item => item.name);
    district = map[location.cityIndex].level2s[
      location.districtIndex
    ].level3s.map(item => item.name);

    dispatchCreateRes({
      field: 'city',
      value: map[location.cityIndex].name,
    });
    dispatchCreateRes({
      field: 'ward',
      value: map[location.cityIndex].level2s[location.wardIndex].name,
    });
    dispatchCreateRes({
      field: 'district',
      value:
        map[location.cityIndex].level2s[location.wardIndex].level3s[
          location.districtIndex
        ].name,
    });
  }, [location]);

  const checkCreateInfor = async (createRes: CreateRes) => {
    const arr = Object.values(createRes);
    console.log(arr);
    arr.forEach(data => {
      if (data.length <= 10 && data != 'Open') {
        console.log(data, data.length);
        return {message: 'Please fill all information'};
      }
    });

    const data: CreateRes = {
      name: createRes.name,
      introduction: createRes.introduction,
      email: createRes.email,
      phone: createRes.phone,
      address: createRes.address,
      district: createRes.district,
      ward: createRes.ward,
      city: createRes.city,
      status: createRes.status,
      ownerID: createRes.ownerID,
    };

    dispatResState(createResAsync(data));
    if (resCheck.isCheckFulfilled) {
      setVisible(false);
    } else {
      console.log(resCheck.isCheckError);
    }
  };

  const requestCameraPermission = async (number: number) => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (number > 5) number = 5;
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Camera permission given');
        // const result:any = await launchCamera({mediaType:'photo',cameraType:'front'})
        // setImg(result.assets[0].uri);
        const images = [];

        for (let i = 0; i < number; i++) {
          const result: any = await launchCamera({
            mediaType: 'photo',
            cameraType: 'front',
          });
          images.push(result.assets[0].uri);
        }

        setImg(images);
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  // Show user that they have no restaurant
  const noRes = () => {
    return (
      <View style={[screens.main_Cont]}>
        <Titlebar
          title={{text: 'Your Restaurant'}}
          left={{btnStyle: {opacity: 0}}}
          right={{btnStyle: {opacity: 0}}}
        />
        <View style={[screens.noRes_Cont]}>
          <Logo width={312} height={332} />
          <Text style={[fonts.sublineBold, {marginVertical: 20}]}>
            We can’t seem to find your Restaurant.
          </Text>
          <Fluid_btn
            text={{
              text: 'Let create one',
            }}
            button={{onPress: () => setVisible(true)}}
          />
        </View>
      </View>
    );
  };

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

  const createResModal = () => {
    return (
      <Modal visible={visible} animationType="slide">
        <View style={[screens.main_Cont]}>
          <Titlebar
            title={{text: 'Create Restaurant'}}
            left={{
              btnStyle: {borderWidth: 0},
              onPress: () => console.log('Rules'),
            }}
            right={{
              onPress: () => setVisible(false),
            }}
            svgRight="Close"
            svgLeft="Like"
          />

          <View style={[{marginTop: 20}]}>
            <Input
              placeholder="Restaurant Name"
              onChange={handleChangeRes('name')}
            />

            <Input
              placeholder="Restaurant Phone"
              onChange={handleChangeRes('phone')}
              style={{marginVertical: 10}}
            />

            <Input
              placeholder="Restaurant Email"
              onChange={handleChangeRes('email')}
            />

            <ImagePicker
              data={img}
              style={{marginVertical: 10}}
              uploadPress={() => requestCameraPermission(1)}
              imagePress={() => {
                setImage;
                setShow(true);
              }}
            />

            <Input
              placeholder="Restaurant Address"
              onChange={handleChangeRes('address')}
            />

            <Dropdown
              dataList={city}
              style={{marginVertical: 10}}
              value={createRes.city}
              placeholder="Restaurant City"
              onPick={index => {
                handleChangeLocation('cityIndex')(index);
              }}
            />

            <Dropdown
              dataList={ward}
              placeholder="Restaurant Ward"
              value={createRes.ward}
              onPick={index => {
                handleChangeLocation('wardIndex')(index);
              }}
            />

            <Dropdown
              dataList={district}
              style={{marginVertical: 10}}
              value={createRes.district}
              placeholder="Restaurant District"
              onPick={index => {
                handleChangeLocation('districtIndex')(index);
              }}
            />
            <TextArea
              placeholder="Restaurant Description"
              onChange={handleChangeRes('introduction')}
            />
          </View>
          <View style={{flex: 1}} />
          <Fluid_btn
            button={{
              btnStyle: {
                zIndex: 5,
              },
              onPress: () => checkCreateInfor(createRes),
            }}
          />
        </View>
      </Modal>
    );
  };

  const createFoodModal = () => {
    return (
      <Modal visible={visible}>
        <View style={[screens.main_Cont]}>
          <Titlebar
            title={{text: 'Create Foods'}}
            left={{
              btnStyle: {borderWidth: 0},
              onPress: () => console.log('Rules'),
            }}
            right={{
              onPress: () => console.log('Close'),
            }}
            svgRight="Close"
            svgLeft="Like"
          />

          <ScrollView style={[{marginTop: 20}]}>
            <Input
              placeholder="Restaurant Name"
              onChange={handleChangeRes('name')}
            />
            <Input
              placeholder="Restaurant Address"
              onChange={handleChangeRes('address')}
            />
            <Input
              placeholder="Restaurant Phone"
              onChange={handleChangeRes('phone')}
            />
            <Input
              placeholder="Restaurant Email"
              onChange={handleChangeRes('email')}
            />
            <Input
              placeholder="Restaurant Introduction"
              onChange={handleChangeRes('introduction')}
            />
            <Fluid_btn />
          </ScrollView>
        </View>
      </Modal>
    );
  };

  const showImage = () => {
    return (
      <Modal visible={show} animationType="fade" transparent>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View>
            <Square_btn
              svg="Close"
              button={{
                btnStyle: {
                  position: 'absolute',
                  top: -50,
                  right: -15,
                  zIndex: 2,
                },
                onPress: () => setShow(false),
              }}
            />

            <Square_btn
              svg="Back"
              button={{
                btnStyle: {position: 'absolute', top: 70, left: 5, zIndex: 2},
                onPress: () => setShow(false),
              }}
            />
            <Image
              source={
                image
                  ? {uri: image}
                  : require('../../../assets/imgs/foodPoster1.jpg')
              }
              style={{width: 300, height: 168.75}}
            />
            <Square_btn
              svg="Next"
              button={{
                btnStyle: {position: 'absolute', top: 70, right: 5, zIndex: 2},
                onPress: () => setShow(false),
              }}
            />
          </View>

          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: Colors.nox,
              opacity: 0.7,
              position: 'absolute',
              zIndex: -1,
            }}
          />
        </View>
      </Modal>
    );
  };

  return (
    <View style={[screens.parent_Cont]}>
      {res != null ? createFoodModal() : createResModal()}
      {res != null ? hasRes() : noRes()}
      {showImage()}
    </View>
  );
};

export default Store;
