import {
  View,
  Dimensions,
  PermissionsAndroid,
  Image,
  Touchable,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useCallback, useMemo, useReducer, useRef, useState} from 'react';
import Avatar from '../../../assets/images/avatar.svg';
import FastFood from '../../../assets/images/fast-food.svg';
import {Colors} from '../../custom/styles/ScreenStyle';
import Input from '../../custom/textinput/Input';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import Icons, {IconName} from '../../../assets/icons/Icons';
import {showMessage} from 'react-native-flash-message';
import AxiosInstance from '../../../helpers/AxiosInstance';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../navigation/RootNavigation';
import {generateID} from '../app/Store/CreateRestaurant';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height * 0.4;

/** Declaring state of reducer */

type RegisterState = {
  email: string;
  password: string;
};

type RegisterAction = {
  type: keyof RegisterState;
  payload: RegisterState[keyof RegisterState];
};

const initialState: RegisterState = {
  email: 'anhtt676@gmail.com',
  password: '123456',
};

const reducer = (state: RegisterState, action: RegisterAction) => {
  return {...state, [action.type]: action.payload};
};

const Register = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigation = useNavigation<NavigationProp<ParamList>>();
  const [showPass, setShowPass] = useState(false);

  const isEmailValid = (email: string) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
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

  const registerAccount = async () => {
    const {email, password} = state;
    const name = email.slice(0, email.indexOf('@'));
    showMessage({
      message: 'Đang đăng ký tài khoản',
      type: 'info',
      icon: 'info',
    });
    if (!checkField(email, name, password)) return;
    const body = {
      name,
      email,
      password,
    };
    const response = await AxiosInstance().post('/register-user.php', body);
    console.log(response);
    if (response.status) {
      showMessage({
        message: 'Đăng ký thành công',
        type: 'success',
        icon: 'success',
      });
      const formData = new FormData();
      const id = generateID('IMG');
      formData.append('image', {
        uri: './../../../assets/images/avatart.jpg',
        name: `${id}.jpg`,
        type: 'image/jpg',
      });
      const result = await AxiosInstance('multipart/form-data').post(
        '/upload-file.php',
        formData,
      );
      console.log(result);
      const data = {
        id: id,
        ownerID: response.data,
      };
      const upload: any = await AxiosInstance().post('/insert-image.php', data);
      console.log(upload);

      navigation.navigate('Login');
    } else {
      showMessage({
        message: response.statusText,
        type: 'danger',
        icon: 'warning',
      });
      console.log(response.statusText);
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <FastFood width={width} height={height} />

      <View
        style={{
          flex: 1,
          marginTop: 30,
          paddingTop: 20,
          paddingHorizontal: 20,
        }}>
        <Input
          placeholder="Email"
          onChange={text => {
            dispatch({type: 'email', payload: text});
          }}
          value={state.email}
          SVG={IconName.send}
        />

        <Input
          onChange={text => {
            dispatch({type: 'password', payload: text});
          }}
          value={state.password}
          placeholder="Password"
          secureTextEntry={!showPass}
          showButton={true}
          SVG={showPass ? IconName.eye : IconName.eyeClose}
          color={Colors.black}
          onPress={() => {
            setShowPass(!showPass);
          }}
        />

        <Text
          style={[
            {color: Colors.orange, marginVertical: 15, alignSelf: 'center'},
          ]}
          onPress={() => {
            navigation.navigate('Login');
          }}>
          Bạn đã có tài khoản?
        </Text>

        <Fluid_btn
          title="Đăng ký"
          style={{marginTop: 20}}
          onPress={() => {
            registerAccount();
          }}
        />
      </View>
    </View>
  );
};

export default Register;
