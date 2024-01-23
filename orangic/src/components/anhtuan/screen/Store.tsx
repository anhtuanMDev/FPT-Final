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

type State = {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  districts: string;
  states: string;
  city: string;
};

interface MyApiResponse {
  response: any;
  status: boolean;
  message: string;
}

type Action = {field: keyof State; value: string};

function reducer(state: State, action: Action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

const Store = () => {
  const [res, setRes] = useState();
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [img, setImg] = useState<any[]>([]);
  const [image, setImage] = useState<any>();

  const rest = useSelector((state: RootState) => state.checkRes);
  const dispatReschState = useDispatch<AppDispatch>();

  // Fetch data user's restaurant from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: MyApiResponse = await AxiosInstance().get(
          '/get-res.php',
          {params: {ownerID: 'USRn4mvj6776oj233r5p'}},
        );
        setRes(response.response);
        console.log(response.response);
      } catch (error) {
        console.log('Failed to fetch data: ', error);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(image)
  // }, [show]);

  const [state, dispatch] = useReducer(reducer, {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    districts: '',
    states: '',
    city: '',
  });

  const handleChange = (name: keyof State) => (value: string) => {
    dispatch({field: name, value});
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

  const createRes = () => {
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

          <ScrollView style={[{marginTop: 20}]}>
            <Input
              placeholder="Restaurant Name"
              onChange={handleChange('name')}
            />

            <Input
              placeholder="Restaurant Phone"
              onChange={handleChange('phone')}
            />

            <Input
              placeholder="Restaurant Email"
              onChange={handleChange('email')}
            />

            <ImagePicker
              data={img}
              uploadPress={() => requestCameraPermission(1)}
              imagePress={() => {
                setImage;
                setShow(true);
              }}
            />

            <Input
              placeholder="Restaurant Address"
              onChange={handleChange('address')}
            />

            <Input
              placeholder="Restaurant District"
              onChange={handleChange('districts')}
            />

            <Input
              placeholder="Restaurant State"
              onChange={handleChange('states')}
            />

            <Input
              placeholder="Restaurant City"
              onChange={handleChange('city')}
            />
            <TextArea
              placeholder="Restaurant Description"
              onChange={handleChange('description')}
            />
          </ScrollView>
          <View style={{flex: 1}} />
          <Fluid_btn />
        </View>
      </Modal>
    );
  };

  const createFood = () => {
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
              onChange={handleChange('name')}
            />
            <Input
              placeholder="Restaurant Address"
              onChange={handleChange('address')}
            />
            <Input
              placeholder="Restaurant Phone"
              onChange={handleChange('phone')}
            />
            <Input
              placeholder="Restaurant Email"
              onChange={handleChange('email')}
            />
            <Input
              placeholder="Restaurant Description"
              onChange={handleChange('description')}
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
                btnStyle: {position: 'absolute', top: -50, right: -15, zIndex: 2},
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
      {res ? createFood() : createRes()}
      {res ? hasRes() : noRes()}
      {showImage()}
    </View>
  );
};

export default Store;
