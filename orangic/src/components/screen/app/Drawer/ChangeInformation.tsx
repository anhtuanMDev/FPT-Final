import {
  View,
  Text,
  Image,
  Dimensions,
  Modal,
  PermissionsAndroid,
  BackHandler,
} from 'react-native';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {NavigationProp, RouteProp, useIsFocused, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../../navigation/RootNavigation';
import {fonts} from '../../../custom/styles/ComponentStyle';
import {Colors, screenStyles} from '../../../custom/styles/ScreenStyle';
import {
  Gesture,
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import Input from '../../../custom/textinput/Input';
import {Information, initialState} from './Profile';
import Fluid_btn from '../../../custom/buttons/Fluid_btn';
import Icons, {IconName} from '../../../../assets/icons/Icons';
import {showMessage} from 'react-native-flash-message';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import WaitingModal from '../../../custom/ui/WaitingModal';
import {useSelector} from 'react-redux';
import {selectHost} from '../../../../helpers/state/Global/globalSlice';
import {BottomSheetProvider} from '@gorhom/bottom-sheet/lib/typescript/contexts';
import BottomSheet from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheet';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

type Props = {
  route: RouteProp<ParamList, 'ChangeInformation'>;
};

const isEmailValid = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return regex.test(email);
};

const {width, height} = Dimensions.get('window');
const ChangeInformation = (props: Props) => {
  const infor = props.route.params?.infor;
  const host = useSelector(selectHost);
  const [state, setState] = useState<Information>(infor || initialState);
  const [img, setImg] = useState<string>('');
  const [confirm, setConfirm] = useState('');
  const [request, setRequest] = useState(false);
  const snapPoints = useMemo(() => ['15%', '25%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const isFocused = useIsFocused();
  const navigate = useNavigation<NavigationProp<ParamList, 'ChangeInformation'>>();

  const handleBackPress = () => {
    navigate.reset({
      index: 0,
      routes: [{ name: 'Profile' }],
    });
    return true;
  };

  useEffect(() => {
    // Add event listener when the component mounts
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Remove event listener when the component unmounts
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, []);

  /** Create OTP */
  const createOTP = async () => {
    const email = infor?.Email as string;
    showMessage({
      message: 'Đang gửi mã xác thực',
      type: 'info',
      icon: 'info',
    });
    if (!isEmailValid(email))
      return showMessage({
        message: 'Email không hợp lệ',
        type: 'danger',
        icon: 'warning',
      });
    const response = await AxiosInstance().post('post-send-email.php', {
      email,
      token: '757346',
      type: 'Đổi Thông Tin',
    });
    // console.log(response);
    if (response.status) {
      showMessage({
        message: 'Mã xác thực đã được gửi',
        type: 'success',
        icon: 'info',
      });
    } else {
      showMessage({
        message: response.statusText,
        type: 'danger',
        icon: 'warning',
      });
    }
  };

  const checkField = (email: string, ...fields: string[]) => {
    if (email.length === 0) {
      showMessage({
        message: 'Email không được để trống',
        type: 'danger',
        icon: 'warning',
      });
      return false;
    }

    if (!isEmailValid(email)) {
      showMessage({
        message: 'Email không hợp lệ',
        type: 'danger',
        icon: 'warning',
      });
      return false;
    }

    for (const field of fields) {
      if (field.length === 0) {
        showMessage({
          message: 'Xin hãy điền đầy đủ thông tin',
          type: 'danger',
          icon: 'warning',
        });
        return false;
      }
    }

    return true;
  };

  const changeInfor = async () => {
    const email = infor?.Email as string;
    const {Password, Name, Email} = state;
    if (!checkField(Email, Name, Password, confirm)) {
      return showMessage({
        message: 'Xin hãy điền đầy đủ thông tin',
        type: 'danger',
        icon: 'warning',
      });
    }
    setRequest(true);
    const body = {
      name: Name,
      email: email,
      newEmail: Email,
      password: Password,
      confirm,
    };
    const response = await AxiosInstance().post(
      'post-update-user-informations.php',
      body,
    );
    setRequest(false);

    if (response.status) {
      showMessage({
        message: 'Đổi Thông tin thành công',
        type: 'success',
        icon: 'success',
      });
      if (img.length != 0) {
        let formData = new FormData();
        formData.append('file', {
          uri: img,
          type: 'image/jpeg',
          name: `${infor?.Image}.jpg`,
        });
        const result = await AxiosInstance('multipart/form-data').post(
          '/upload-file.php',
          formData,
        );
        if (result.status) {
          setImg('');
        }
      }
    } else {
      showMessage({
        message: response.statusText,
        type: 'danger',
        icon: 'warning',
      });
    }
  };

  useEffect(()=>{
    if(isFocused) setState(infor || initialState)
  },[isFocused])

  const ModalLoad = () => {
    return (
      <Modal animationType="fade" transparent visible={request}>
        <WaitingModal />
      </Modal>
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchCamera({
          mediaType: 'photo',
          cameraType: 'front',
        });

        if (result.didCancel) {
          console.log('User cancelled image picker');
        }

        // Kiểm tra nếu `result` không phải null và `result.assets` có ít nhất một phần tử
        if (result && result.assets && result.assets.length > 0) {
          setImg(result.assets[0].uri);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestLibaryPermission = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 1,
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = launchImageLibrary(
          options,
          (response: ImagePickerResponse) => {
            if (response.didCancel || response.errorCode) {
              return;
            }
            // Process the selected images
            if (response && response.assets && response.assets.length > 0) {
              const uris: any = response.assets.map(asset => asset.uri);
              setImg(uris);
            }
          },
        );
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={[screenStyles.container]}>
        <ModalLoad />
        <Text
          style={[
            fonts.captionBold,
            {textAlign: 'center', marginVertical: 15},
          ]}>
          Thay đổi thông tin
        </Text>

        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.present();
            }}>
            <Image
              source={
                img.length > 0
                  ? {uri: img}
                  : infor?.Image
                  ? {uri: `${host}/uploads/${infor?.Image}.jpg`}
                  : require('../../../../assets/images/baseImage.png')
              }
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </TouchableOpacity>

          <View style={{marginLeft: 15}}>
            <Text style={{paddingVertical: 10}}>
              Tạo ngày: {state.CreateAt}
            </Text>
            <Text style={{paddingVertical: 10}}>
              Cập nhật ngày: {state.UpdateAt}
            </Text>
          </View>
        </View>

        <Input
          placeholder="Họ và tên"
          value={state.Name}
          style={{width: width - 40, height: 50, marginVertical: 15}}
          onChange={text => {
            setState({...state, Name: text});
          }}
        />

        <Input
          placeholder="Mật khẩu"
          value={state.Password}
          style={{width: width - 40, height: 50}}
          onChange={text => {
            setState({...state, Name: text});
          }}
        />

        <Input
          placeholder="Email"
          showButton={true}
          SVG={IconName.send}
          onPress={() => {
            console.log(state)
            if (state.Status == 'Not Confirm') {
              showMessage({
                message:
                  'Xin lỗi, bạn cần xác thực email để thực hiện hành động này',
                type: 'danger',
                icon: 'warning',
              });
            } else createOTP();
          }}
          value={state.Email}
          style={{width: width - 40, height: 50}}
          onChange={text => {
            setState({...state, Email: text});
          }}
        />

        <Input
          placeholder="Mã xác nhận"
          value={confirm}
          type="number-pad"
          style={{width: width - 40, height: 50}}
          onChange={text => {
            setConfirm(text);
          }}
        />

        <Fluid_btn
          title="Lưu"
          style={{marginTop: 40}}
          onPress={() => {
            changeInfor();
          }}
        />

        <BottomSheetModalProvider>
          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={1}
            style={{
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: 'white',
                height: 100,
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  requestCameraPermission();
                  bottomSheetRef.current?.close();
                }}>
                <Icons name={IconName.camera} size={30} color={Colors.orange} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  requestLibaryPermission();
                  bottomSheetRef.current?.close();
                }}>
                <Icons
                  name={IconName.library}
                  size={30}
                  color={Colors.orange}
                />
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default ChangeInformation;
