import {
  View,
  Text,
  PermissionsAndroid,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import {Dropdown} from 'react-native-element-dropdown';

import Titlebar from '../../custom/actionbars/Titlebar';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import Input from '../../custom/forms/Input';
import Locations from '../../data/location.json';
import TextArea from '../../custom/forms/TextArea';
import ImagePicker from '../../custom/forms/ImagePicker';
import Camera from '../../../../assets/ics/camera.svg';
import Libary from '../../../../assets/ics/libary.svg';
import {
  CreateRes,
  CreateResResponse,
  createResFulFilled,
  createResPending,
  createResResponse,
  selectCreateResError,
  selectCreateResFulFilled,
  selectCreateResPending,
  selectCreateResReject,
  selectCreateResResponse,
} from '../../../../helper/state/restaurants/createResSlice';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import {screens} from '../../custom/style/scn';
import {fonts, forms, Colors} from '../../custom/style/cpt';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../../App';
import {useDispatch, useSelector} from 'react-redux';
import AxiosInstance from '../../../../helper/AxiosInstance';
import Loading from '../../custom/others/Loading';

type checkResponse = {
  id: string;
  name: string;
  introduction: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  ward: string;
  district: string;
  status: string;
  ownerID: string;
}

type CheckResOwner = {
  response: checkResponse | null;
  status: boolean;
  message: string;
}

type ImageUpload = {
  error: string;
  message: string;
  path: string;
};

// Declaring types for the navigation

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateRestaurant'
>;

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

{
  /** The begining of CreateRestaurant*/
}

const CreateRestaurant = () => {
  const [img, setImg] = useState<any[]>([]);

  const navigation = useNavigation<ScreenNavigationProp>();

  {
    /** Redux selector */
  }
  let restaurantVar = useSelector(selectCreateResResponse);
  const createResPendingVar = useSelector(selectCreateResPending);
  const createResFullfilledVar = useSelector(selectCreateResFulFilled);
  const createResRejectVar = useSelector(selectCreateResReject);
  const createResErrorVar = useSelector(selectCreateResError);

  const dispatch = useDispatch();

  {
    /** Bottom Sheet */
  }
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['5%', '20%'], []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

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

    {/** Upload Image */}

    const generateID = (length: number = 20) => {
      let result = 'IMG';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i < length - 3; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    };

    const requestCameraPermission = async () => {
      try {
        if (img.length == 5) {
          // How to cancel image picker
          Alert.alert('Alert', 'You can only upload 5 images');
          return;
        }
  
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  
          const result: any = await launchCamera({
            mediaType: 'photo',
            cameraType: 'front',
          });
  
          if(result.didCancel) {
            console.log("User cancelled image picker");
          }
  
          // Kiểm tra nếu `result` không phải null và `result.assets` có ít nhất một phần tử
          if (result && result.assets && result.assets.length > 0) {
            setImg([...img ,result.assets[0].uri]);
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const requestLibaryPermission = async () => {
      if(img.length == 5) {
        Alert.alert('Alert', 'You can only upload 5 images');
        return;
      }
      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        selectionLimit: 5 - img.length,
      };
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Libary permission given');
          const result: any = launchImageLibrary(
            options,
            (response: ImagePickerResponse) => {
              if (response.didCancel || response.errorCode) {
                return;
              }
              // Process the selected images
              if (response && response.assets && response.assets.length > 0) {
                const uris: any[] = response.assets.map(asset => asset.uri);
                setImg([...img, ...uris]);
              }
            },
          );
        } else {
          // console.log('Libary permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const insertImageDB = async (imgID: string, ownerID: string ) => {
      const data = {
        id: imgID,
        ownerID: ownerID
      }
      const result: any = await AxiosInstance().post('/insert-image.php', data);
      console.log(result);
    }
  
    const handleManyImage = async (imagePath: string[], id: string) => {
      const formData = new FormData();
      if(imagePath.length == 0) {
        Alert.alert('Alert', 'Please select image');
        return;
      }
      for (let i = 0; i < imagePath.length; i++) {
        const identify = generateID();
        formData.append('image', {
          uri: imagePath[i],
          name: `${identify}.jpg`,
          type: 'image/jpg',
        });
        const result: ImageUpload = await AxiosInstance(
          'multipart/form-data',
        ).post('/upload-file.php', formData);
        insertImageDB(identify, id)
  
  
        console.log(result.path);
      }
    };
  
  {/** End upload */}

  {
    /** Check infor and call create Res API */
  }

  const checkCreateInfor = async (createRes: CreateRes) => {
    let empty = false;
    if (createRes.name.length < 7) empty = true;
    if (createRes.email.length < 12) empty = true;
    if (createRes.phone.length < 10) empty = true;
    if (createRes.address.length < 5) empty = true;
    if (createRes.city.length < 10) empty = true;
    if (createRes.ward.length < 10) empty = true;
    if (createRes.district.length < 10) empty = true;
    if (createRes.introduction.length < 10) empty = true;
    if (img.length == 0) empty = true;

    if (empty) {
      Alert.alert('Please fill all information');
      console.log(createRes);
      return;
    } else {
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

      try {
        dispatch(createResPending(true));
        const check: CreateResResponse = await AxiosInstance().get('/check-owner.php', {data: {id: "USRIM4TLCSI0EHZHMU2U"}});
        if(check.status){
          dispatch(createResPending(false));
          Alert.alert('You have already created a restaurant');
          return;
        }
        const response: CreateResResponse = await AxiosInstance().post(
          '/create-res.php',
          data,
        );
        if (response.id != null) {
          dispatch(createResResponse(response));
          restaurantVar = response;
          dispatch(createResPending(false));
          dispatch(createResFulFilled(true));
          handleManyImage(img, response.id);
        }
      } catch (error) {
        console.error('Error while creating information:', error);
        // Handle error here
      }
    }
  };

  {
    /** Upload image after create Restaurant */
  }

  useEffect(() => {
    if(restaurantVar!=null){
      if (img.length != 0) {
        let formData = new FormData();
        for (let i = 0; i < img.length; i++) {
          formData.append('file[]', {
            uri: img[i],
            type: 'image/jpeg',
            name: `image${i}.jpg`,
          });
        }
        AxiosInstance()
          .post(`/upload-file.php?id=${restaurantVar.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            console.log('Upload image response:', res);
          })
          .catch(err => {
            console.error('Error while uploading image:', err);
          });
      }
    }
  }, [restaurantVar]);

  const map = Locations.data;
  const fetchCity = () => {
    // console.log('City Index: ', location.cityIndex);
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
    // console.log('Page: ', location.cityPage);
    // console.log('>> >> >> ', location.cityData.length);
  };

  const fetchWard = () => {
    // console.log('Ward Index: ', location.wardIndex);
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
    // console.log('Page: ', location.wardPage);
    // console.log('>> >> >> ', location.wardData.length);
  };

  const fetchDistrict = (index: number) => {
    const district = map[location.cityIndex].level2s[index].level3s
      .slice(0, location.districtPage * 20)
      .map(item => ({
        label: item.name,
        value: item.name,
      }));
    // console.log('Ward index in fetch District', location.wardIndex);
    // console.log(`----------------`);
    dispatchLocation({field: 'districtData', value: district});
  };

  const loadDistrictMore = () => {
    dispatchLocation({field: 'districtPage', value: location.districtPage + 1});
    fetchDistrict(location.wardIndex);
    // console.log('Page: ', location.districtPage);
    // console.log('>> >> >> ', location.districtData.length);
  };

  useEffect(() => {
    fetchCity();
    fetchWard();
    fetchDistrict(location.wardIndex);
  }, []);

  useEffect(() => {
    // console.log('useEffect City: ', createRes.city);
    const cityIndex = map
      .map(item => item.name)
      .findIndex(item => item === createRes.city);
    if (cityIndex !== -1) {
      handleLocation('cityIndex')(cityIndex);
      // console.log('city index: ', cityIndex);
    }
  }, [createRes.city]);

  useEffect(() => {
    // console.log('useEffect Ward: ', createRes.ward);
    const wardIndex = map[location.cityIndex].level2s
      .map(item => item.name)
      .findIndex(item => item === createRes.ward);
    if (wardIndex !== -1) {
      handleLocation('wardIndex')(wardIndex);
      fetchDistrict(wardIndex);
      // console.log('ward index in useEffect Ward', wardIndex);
    }
  }, [createRes.ward]);

  useEffect(() => {
    fetchWard();
    fetchDistrict(0);
  }, [location.cityIndex]);

  useEffect(() => {
    fetchDistrict(0);
  }, [location.wardIndex]);

  useEffect(() => {
    if(createResFullfilledVar){
      navigation.replace('HasRestaurant');
    }
  },[createResFullfilledVar]);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.white}}>
      <BottomSheetModalProvider>
        <View style={screens.parent_Cont}>
          {createResPendingVar ? (
            <Loading
              message="Creating your restaurant"
              backgroundColor={Colors.orange}
            />
          ) : (
            <View style={screens.main_Cont}>
              <Titlebar
                title={{text: 'Create Restaurant'}}
                left={{
                  btnStyle: {borderWidth: 0},
                  // onPress: () => console.log('Rules'),
                }}
                right={{
                  onPress: () => {
                    // navigation.navigate('NoRestoScreen');
                    navigation.goBack();
                  },
                }}
                svgRight="Close"
                svgLeft="Like"
              />

              <View style={[{marginTop: 20}]}>
                <Input
                  placeholder="Restaurant Name"
                  onChange={handleCreateRes('name')}
                  value={createRes.name}
                />

                <Input
                  placeholder="Restaurant Phone"
                  onChange={handleCreateRes('phone')}
                  style={{marginVertical: 10}}
                  value={createRes.phone}
                />

                <Input
                  placeholder="Restaurant Email"
                  onChange={handleCreateRes('email')}
                  value={createRes.email}
                />

                <ImagePicker
                  data={img}
                  style={{marginVertical: 10}}
                  uploadPress={() => {
                    // console.log('press upload');
                    bottomSheetModalRef.current?.present();
                  }}
                  imagePress={(item: string, index: number) => {
                    const contain: string[] = img;
                    setImg(contain.filter((_, i) => i !== index));
                  }}
                />

                <Input
                  placeholder="Restaurant Address"
                  onChange={handleCreateRes('address')}
                  value={createRes.address}
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
                    dropdown.ward && {borderColor: Colors.orange},
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
                    dropdown.district && {borderColor: Colors.orange},
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
                  value={createRes.introduction}
                />
              </View>
              <View style={{flex: 1}} />
              <Fluid_btn
                button={{
                  onPress: () => {
                    checkCreateInfor(createRes);
                  },
                }}
              />

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                style={{zIndex: 1000}}>
                <BottomSheetView style={{flex: 1, alignItems: 'center'}}>
                  <Text>You want to import image from ?</Text>

                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        marginTop: 25,
                        justifyContent: 'space-around',
                        width: '100%',
                        paddingHorizontal: 20,
                      },
                    ]}>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        requestCameraPermission();
                        bottomSheetModalRef.current?.dismiss();
                      }}>
                      <Camera width={50} height={50} />
                      <Text style={[fonts.text, {marginTop: 5}]}>
                        Upload 1 pic
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        requestLibaryPermission();
                        bottomSheetModalRef.current?.dismiss();
                      }}>
                      <Libary width={50} height={50} />
                      <Text style={[fonts.text, {marginTop: 5}]}>
                        From libary
                      </Text>
                    </TouchableOpacity>
                  </View>
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          )}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default CreateRestaurant;
