import {View, Text, Image, Alert, PermissionsAndroid} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {font, styles, Colors} from '../../custom/Styles';
import Button from '../../custom/Button';
import Password from '../../../anhtuan/custom/forms/Password';
import Input from '../../../anhtuan/custom/forms/Input';
import AxiosInstance from '../../../../helper/AxiosInstance';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera} from 'react-native-image-picker';

import Avatar from '../../../../assets/imgs/avatar.svg';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectUpload,
  selectUploadFulfilled,
  selectUploadReject,
  selectUploadPending,
  uploadPending,
  uploadFulfilled,
  uploadReject,
} from '../../../../helper/state/userStack/register/uploadFileSlice';
import {
  registerFulfilled,
  registerPending,
  registerReject,
  selectRegisterFulfilled,
  selectRegisterPending,
  selectRegisterReject,
} from '../../../../helper/state/userStack/register/registerSlice';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NavigateProp, ParamList} from '../../../../navigation/RootNavigation';
import Loading from '../../../anhtuan/custom/others/Loading';
import { selectAddressOwner, setAddressOwner } from '../../../../helper/state/appTab/addressSlice';

type CreateAccountState = {
  name: string;
  email: string;
  password: string;
};
type CreateAccountAction = {
  field: keyof CreateAccountState;
  value: string;
};

function CreateAccount(
  state: CreateAccountState,
  payload: CreateAccountAction,
) {
  return {
    ...state,
    [payload.field]: payload.value,
  };
}

const isValidEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Register = () => {
  const [img, setImg] = useState<any>();
  const [account, dispatchAcount] = useReducer(CreateAccount, {
    name: 'Elizebeth',
    email: 'Elizebeth@gmail.com',
    password: '123456',
  });

  const navigation = useNavigation<NavigationProp<ParamList>>();
  const NavitgateTo = (name: keyof ParamList) => {
    navigation.navigate(name);
  };

  const rd_uploadFulfilled = useSelector(selectUploadFulfilled);
  const rd_addressOwner = useSelector(selectAddressOwner);

  const rd_registerFulfilled = useSelector(selectRegisterFulfilled);
  const rd_registerPending = useSelector(selectRegisterPending);
  const rd_registerReject = useSelector(selectRegisterReject);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uploadFulfilled(false));
    dispatch(uploadPending(false));
  }, []);

  useEffect(() => {console.log("rd_addressOwner", rd_addressOwner)}, [rd_addressOwner]);

  const generateID = (prefix: string) => {
    let randomString = prefix;
    const c = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 17; i++) {
      randomString += c[Math.floor(Math.random() * c.length)];
    }
    return randomString;
  };

  const uploadImgToFolder = async (imagePath: string, id: string) => {
    const formData = new FormData();
    formData.append('image', {
      uri: imagePath,
      name: `${id}.jpg`,
      type: 'image/jpg',
    });
    const result = await AxiosInstance('multipart/form-data').post(
      '/upload-file.php',
      formData,
    );

    dispatch(uploadPending(false));
    if (!result.status) {
      dispatch(uploadReject(result.statusText));
      return;
    }
    dispatch(uploadFulfilled(true));
  };
  const handleInfor = async (account: CreateAccountState) => {
    dispatch(registerPending(true));
    const {name, email, password} = account;
    const uri = img;

    if (!uri) {
      dispatch(registerPending(false));
      dispatch(registerReject('Hãy cho chúng tôi một tấm ảnh nào'));
      return;
    }

    if (!name || !email || !password) {
      dispatch(registerPending(false));
      dispatch(registerReject('Bạn cần phải điền vào mọi khoảng trống'));
      return;
    }

    if (!isValidEmail(email)) {
      dispatch(registerPending(false));
      dispatch(registerReject('Email sai cú pháp'));
      return;
    }

    const body = {
      name: account.name,
      email: account.email,
      password: account.password,
    };

    const response = await AxiosInstance().post('/register-user.php', body);
    console.log('handleInfor -> response', response);
    if (response.status) {
      await dispatch(setAddressOwner(response.data));
      dispatch(registerFulfilled(true));
      dispatch(uploadPending(true));
      const send = {
        id: generateID('IMG'),
        ownerID: response.data,
      };
      const upload = await AxiosInstance().post('/insert-image.php', send);
      uploadImgToFolder(uri, send.id);
      dispatch(registerPending(false));
    } else {
      dispatch(registerPending(false));
      dispatch(registerReject(response.statusText));
      return;
    }
  };

  useEffect(() => {
    console.log(`\n >>>> navigate`);
    console.log('rd_registerFulfilled', rd_registerFulfilled);
    console.log('rd_uploadFulfilled', rd_uploadFulfilled);
    if (rd_registerFulfilled && rd_uploadFulfilled) {
      navigation.navigate('EnterAddress');
    }
  }, [rd_registerReject, rd_uploadFulfilled]);

  useEffect(() => {
    if (rd_registerReject) {
      Alert.alert(rd_registerReject);
      dispatch(setAddressOwner(''));
      dispatch(registerReject(''));
    }
  }, [rd_registerReject]);

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
          console.log('User cancelled image picker in register');
        }

        // Kiểm tra nếu `result` không phải null và `result.assets` có ít nhất một phần tử
        if (result && result.assets && result.assets.length > 0) {
          setImg(result.assets[0].uri);
        }
      }
    } catch (err) {
      console.warn('request camera in register', err);
    }
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.container1]}>
        <Text style={[font.headline]}>Create Account</Text>
        <Text style={[font.subline, {}]}>
          Enter your Email and Password to sign up.{' '}
          <Text style={[{color: Colors.active}]}>
            Already have an account?.
          </Text>
        </Text>

        <TouchableOpacity
          style={{alignSelf: 'center', marginTop: 30, marginBottom: 20}}
          onPress={() => {
            requestCameraPermission();
          }}>
          {img ? (
            <Image source={{uri: img}} style={{width: 120, height: 120}} />
          ) : (
            <Avatar width={120} height={120} />
          )}
        </TouchableOpacity>

        <View style={[{paddingTop: 10, gap: 10}]}>
          <Input
            placeholder="Your name"
            value={account.name}
            onChange={text => {
              dispatchAcount({field: 'name', value: text});
            }}
          />
          <Input
            placeholder="Your Email"
            value={account.email}
            onChange={text => {
              dispatchAcount({field: 'email', value: text});
            }}
          />
          <Password
            placeholder="Your Password"
            value={account.password}
            onChangeText={text => {
              dispatchAcount({field: 'password', value: text});
            }}
          />
        </View>
        <Button
          title="Đăng ký"
          style={{marginTop: 20}}
          onPress={() => {
            handleInfor(account);
          }}></Button>
      </View>
      {rd_registerPending && (
        <Loading
          message="Làm ơn hãy đợi 1 chút, chúng tôi đang tạo tài khoản cho bạn"
          progressColor={Colors.active}
          background={Colors.white}
          style={{
            position: 'absolute',
            flex: 1,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        />
      )}
    </View>
  );
};

export default Register;
