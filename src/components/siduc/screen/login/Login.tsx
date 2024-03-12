import {View, Text, TextInput, Image, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {font, styles, Colors} from '../../custom/Styles';
import Button from '../../custom/Button';
import User from '../../../../assets/ics/user.svg';
import Key from '../../../../assets/ics/key.svg';
import AxiosInstance from '../../../../helper/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch, useSelector} from 'react-redux';
import {
  selectIsLogin,
  selectIsLoginPending,
  selectIsLoginFulfilled,
  selectIsLoginReject,
  isLoginPending,
  isLoginFulfilled,
  setUserID,
} from '../../../../helper/state/userStack/login/loginSlice';
import Loading from '../../../anhtuan/custom/others/Loading';
import { NavigateProp, ParamList } from '../../../../navigation/RootNavigation';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const Login = (props: NavigateProp) => {
  const {id} = props;

  const login = useSelector(selectIsLogin);
  const pending = useSelector(selectIsLoginPending);
  const fulfilled = useSelector(selectIsLoginFulfilled);
  const reject = useSelector(selectIsLoginReject);

  const dispatch = useDispatch();

  // const [email, setEmail] = useState('OliviaRamirez@gmail.com');
  // const [password, setPassword] = useState('123456');
  const [email, setEmail] = useState('jburley2a@army.mil');
  const [password, setPassword] = useState('nX3=r+f<hjO8UT}');

  const navigation = useNavigation<NavigationProp<ParamList>>();
  const NavitgateTo = (name: keyof ParamList) => {
    navigation.navigate(name);
  }

  const isValidEmail = (email: any) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    try {
      dispatch(isLoginPending(true));
      if (email === '' || password === '')
        throw new Error('Email and password are required');
      // using regex to check email
      if (!isValidEmail(email)) throw new Error('the email must be valid');
      const body = {email, password};
      const result = await AxiosInstance().post('/login-user.php', body);
      if (result.status) {
        dispatch(isLoginPending(false));
        dispatch(isLoginFulfilled(true));
        dispatch(setUserID(result.data.id));
        console.log("login result id", result.data.Id)
      }
    } catch (error) {
      console.log('Failed to login', error);
    }
  };

  useEffect(() => {
    if (fulfilled) {
      // navigate('Home');
      console.log("navigate to home")
    }
  },[pending]);

  return pending ? (
    <Loading
      message="We are doing some progress !"
      progressColor={Colors.active}
      background={Colors.white}
    />
  ) : (
    <View style={[styles.container]}>
      <View style={[styles.container1]}>
        <StatusBar barStyle="dark-content" backgroundColor={'white'} />
        <Text style={[font.headline]}>Well hello there !</Text>
        <Text style={[font.subline, {marginTop: 10}]}>
          Enter your Email and Password to login, or{' '}
          <Text
            style={[{color: Colors.active}]}
            onPress={() => {
              NavitgateTo('Register');
            }}>
            Create new account.
          </Text>
        </Text>
        <View style={[{paddingTop: 46}]}>
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: Colors.Main,
                borderWidth: 1,
                borderRadius: 15,
              },
            ]}>
            <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              style={[
                {
                  flex: 1,
                  marginLeft: 20,
                  height: 44,
                },
              ]}
              placeholder="Email"
            />
            <User
              fill={'black'}
              width={25}
              height={25}
              style={{marginRight: 30}}
            />
          </View>

          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderColor: Colors.Main,
                borderWidth: 1,
                borderRadius: 15,
                marginTop: 20,
              },
            ]}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              style={[
                {
                  flex: 1,
                  marginLeft: 20,
                  height: 44,
                },
              ]}
              placeholder="Password"
            />
            <Key
              fill={'black'}
              width={25}
              height={25}
              style={{marginRight: 30}}
            />
          </View>
        </View>
        <Text style={[font.link, {marginTop: 10, width: '100%'}]}>
          Forgot Password?
        </Text>
        <Button
          title="Login"
          onPress={handleLogin}
          style={{marginTop: 20}}></Button>
      </View>
    </View>
  );
};

export default Login;
