import {
  View,
  Text,
  Modal,
  PermissionsAndroid,
  StyleSheet,
  Image,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';

import {Colors, fonts, forms} from '../../custom/style/cpt';
import {screens} from '../../custom/style/scn';
import {CreateRes} from '../../../../helper/state/restaurants/createResSlice';
import {launchCamera} from 'react-native-image-picker';

import Logo from '../../../../assets/imgs/emptyStore.svg';

import Titlebar from '../../custom/actionbars/Titlebar';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import Input from '../../custom/forms/Input';
import Locations from '../../data/location.json';
import TextArea from '../../custom/forms/TextArea';
import ImagePicker from '../../custom/forms/ImagePicker';
import Square_btn from '../../custom/buttons/Square_btn';
import {Dropdown} from 'react-native-element-dropdown';

// Declaring types for the state

type LocationState = {
  cityData: {label: string; value: string}[];
  cityIndex: number;
  cityPage: number;
  wardData: {label: string; value: string}[];
  wardIndex: number;
  wardPage: number;
  districtData: {label: string; value: string}[];
  districtPage: number;
};

type DropdownState = {
  city: boolean;
  ward: boolean;
  district: boolean;
};

// Declaring the reducers for the state

type LocationAction = {
  field: keyof LocationState;
  value: number | {label: string; value: string}[];
};

function locationReducer(location: LocationState, action: LocationAction) {
  return {
    ...location,
    [action.field]: action.value,
  };
}

type ResAction = {field: keyof CreateRes; value: string};
function resReducer(createRes: CreateRes, action: ResAction) {
  return {
    ...createRes,
    [action.field]: action.value,
  };
}

type DropdownAction = {field: keyof DropdownState; value: boolean};
function dropdownReducer(dropdown: DropdownState, action: DropdownAction) {
  return {
    ...dropdown,
    [action.field]: action.value,
  };
}

// <-*-- The Start of NoRestoScreen Component --*-> //

const NoRestoScreen = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<any>();
  const [visible, setVisible] = useState(false);
  const [img, setImg] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const map = Locations.data;

  const [location, dispatchLocation] = useReducer(locationReducer, {
    cityIndex: 0,
    cityData: [],
    cityPage: 1,
    wardIndex: 0,
    wardData: [],
    wardPage: 1,
    districtData: [],
    districtPage: 1,
  });

  const [createRes, dispatchCreateRes] = useReducer(resReducer, {
    name: 'Mericano Expresco',
    introduction: 'This is a restaurant name Mericano Expresco',
    email: 'meri@gmail.com',
    phone: '0586842685',
    address: 'mericano expresco address ',
    city: '',
    ward: '',
    district: '',
    status: 'OPEN',
    ownerID: 'USRIM4TLCSI0EHZHMU2U',
  });

  const [dropdown, dispatchDropdown] = useReducer(dropdownReducer, {
    city: false,
    ward: false,
    district: false,
  });

  const handleCreateRes = (name: keyof CreateRes) => (value: string) => {
    dispatchCreateRes({field: name, value});
  };

  const handleLocation = (name: keyof LocationState) => (value: number) => {
    dispatchLocation({field: name, value});
  };

  const handleChangeDropdown =
    (name: keyof DropdownState) => (value: boolean) => {
      dispatchDropdown({field: name, value});
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

    // dispatResState(createResAsync(data));
    // if (resCheck.isCheckFulfilled) {
    //   setVisible(false);
    // } else {
    //   console.log(resCheck.isCheckError);
    // }
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
                  : require('../../../../assets/imgs/foodPoster1.jpg')
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

  // Dùng Map để lấy dữ liệu từ file location.json không phải
  // từ location.data

  const fetchCity = () => {
    console.log('City Index: ', location.cityIndex);
    const city = map.slice(0, location.cityPage * 20).map(item => ({
      label: item.name,
      value: item.name,
    }));
    dispatchLocation({field: 'cityData', value: city});
    // console.log("City Data: ", city)
  };

  const loadCityMore = () => {
    dispatchLocation({field: 'cityPage', value: location.cityPage + 1});
    fetchCity();
    console.log('Page: ', location.cityPage);
    console.log('>> >> >> ', location.cityData.length);
  };

  const fetchWard = () => {
    console.log('Ward Index: ', location.wardIndex);
    const ward = map[location.cityIndex].level2s
      .slice(0, location.wardPage * 20)
      .map(item => ({
        label: item.name,
        value: item.name,
      }));
    dispatchLocation({field: 'wardData', value: ward});
    // console.log("ward data: ",ward);
  };

  const loadWardMore = () => {
    dispatchLocation({field: 'wardPage', value: location.wardPage + 1});
    fetchWard();
    console.log('Page: ', location.wardPage);
    console.log('>> >> >> ', location.wardData.length);
  };

  const fetchDistrict = (index: number) => {
    const district = map[location.cityIndex].level2s[index].level3s
      .slice(0, location.districtPage * 20)
      .map(item => ({
        label: item.name,
        value: item.name,
      }));
    console.log('Ward index in fetch District', location.wardIndex);
    console.log(`----------------`);
    dispatchLocation({field: 'districtData', value: district});
  };

  const loadDistrictMore = () => {
    dispatchLocation({field: 'districtPage', value: location.districtPage + 1});
    fetchDistrict(location.wardIndex);
    console.log('Page: ', location.districtPage);
    console.log('>> >> >> ', location.districtData.length);
  };

  useEffect(() => {
    fetchCity();
    fetchWard();
    fetchDistrict(location.wardIndex);
  }, []);

  useEffect(() => {
    console.log('useEffect City: ', createRes.city);
    const cityIndex = map
      .map(item => item.name)
      .findIndex(item => item === createRes.city);
    if (cityIndex !== -1) {
      handleLocation('cityIndex')(cityIndex);
      console.log('city index: ', cityIndex);
    }
  }, [createRes.city]);

  useEffect(() => {
    console.log('useEffect Ward: ', createRes.ward);
    const wardIndex = map[location.cityIndex].level2s
      .map(item => item.name)
      .findIndex(item => item === createRes.ward);
    if (wardIndex !== -1) {
      handleLocation('wardIndex')(wardIndex);
      fetchDistrict(wardIndex);
      console.log('ward index in useEffect Ward', wardIndex);
    }
  }, [createRes.ward]);

  useEffect(() => {
    fetchWard();
    fetchDistrict(0);
  }, [location.cityIndex]);

  useEffect(() => {
    fetchDistrict(0);
  }, [location.wardIndex]);

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
              onChange={handleCreateRes('name')}
            />

            <Input
              placeholder="Restaurant Phone"
              onChange={handleCreateRes('phone')}
              style={{marginVertical: 10}}
            />

            <Input
              placeholder="Restaurant Email"
              onChange={handleCreateRes('email')}
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
              onChange={handleCreateRes('address')}
            />

            {/* City */}

            <Dropdown
              placeholder="Restaurant City"
              style={[
                forms.dropdown_Cont,
                dropdown.city && {borderColor: Colors.orange},
              ]}
              data={location.cityData}
              placeholderStyle={fonts.text}
              selectedTextStyle={[fonts.textBold, {color: Colors.orange}]}
              value={createRes.city}
              labelField={'label'}
              valueField={'value'}
              onChange={item => {
                handleCreateRes('city')(item.value);
                handleCreateRes('ward')('');
                handleCreateRes('district')('');
              }}
              flatListProps={{
                onEndReachedThreshold: 0.5,
                onEndReached: () => {
                  loadCityMore();
                },
              }}
              onFocus={() => handleChangeDropdown('city')(true)}
              onBlur={() => {
                handleChangeDropdown('city')(false);
                handleLocation('cityPage')(1);
                fetchCity();
              }}
            />

            {/* Ward */}

            <Dropdown
              placeholder="Restaurant Ward"
              style={[
                forms.dropdown_Cont,
                dropdown.city && {borderColor: Colors.orange},
              ]}
              data={location.wardData}
              placeholderStyle={fonts.text}
              selectedTextStyle={[fonts.textBold, {color: Colors.orange}]}
              value={createRes.ward}
              labelField={'label'}
              valueField={'value'}
              onChange={item => {
                handleCreateRes('ward')(item.value);
                handleLocation('wardIndex')(
                  location.wardData
                    .map(item => item.value)
                    .findIndex(item => item === createRes.ward) || 0,
                );
                handleCreateRes('district')('');
              }}
              flatListProps={{
                onEndReachedThreshold: 0.5,
                onEndReached: () => {
                  loadWardMore();
                },
              }}
              onFocus={() => handleChangeDropdown('ward')(true)}
              onBlur={() => {
                handleChangeDropdown('ward')(false);
                handleLocation('wardPage')(1);
                fetchWard();
              }}
            />

            {/* District */}

            <Dropdown
              placeholder="Restaurant District"
              style={[
                forms.dropdown_Cont,
                dropdown.city && {borderColor: Colors.orange},
              ]}
              data={location.districtData}
              placeholderStyle={fonts.text}
              selectedTextStyle={[fonts.textBold, {color: Colors.orange}]}
              value={createRes.district}
              labelField={'label'}
              valueField={'value'}
              onChange={item => {
                handleCreateRes('district')(item.value);
              }}
              flatListProps={{
                onEndReachedThreshold: 0.5,
                onEndReached: () => {
                  loadDistrictMore();
                },
              }}
              onFocus={() => handleChangeDropdown('district')(true)}
              onBlur={() => {
                handleChangeDropdown('district')(false);
                handleLocation('districtPage')(1);
                fetchDistrict(location.wardIndex);
              }}
            />

            <TextArea
              placeholder="Restaurant Description"
              onChange={handleCreateRes('introduction')}
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

  return (
    <View style={[screens.main_Cont]}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      {createResModal()}
      <Titlebar
        title={{text: 'Your Restaurant'}}
        left={{btnStyle: {opacity: 0}}}
        right={{btnStyle: {opacity: 0}}}
      />
      <View style={[screens.noRes_Cont]}>
        <Logo width={312} height={332} />
        <Text style={[fonts.sublineBold, {marginVertical: 20}]}>
          We can't seem to find your Restaurant.
        </Text>
        <Fluid_btn
          text={{
            text: 'Let create one',
          }}
          button={{onPress: () => setVisible(true)}}
        />
      </View>
      {showImage()}
    </View>
  );
};

export default NoRestoScreen;
