import {View, Text, TextInput, Image} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {font, styles, Colors} from '../../custom/Styles';
import Button from '../../custom/Button';
import InputIcon from '../../../anhtuan/custom/forms/InputIcon';
import AxiosInstance from '../../../../helper/AxiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserID, setUserID } from '../../../../helper/state/userStack/login/loginSlice';
import { RouteProp } from '@react-navigation/native';
import { ParamList } from '../../../../navigation/RootNavigation';
import { selectAddressFulfilled, selectAddressOwner, selectAddressPending } from '../../../../helper/state/appTab/addressSlice';
import { showMessage } from 'react-native-flash-message';


{/** Start of declare and define the type, state, action, and reducer for the address*/}
type AddressState = {
  city: string;
  district: string;
  ward: string;
  phone: string;
  userAddress: string;
};

type AddressAction = {
  field: keyof AddressState;
  value: string;
};

function handleAddress(state: AddressState, payload: AddressAction) {
  return {
    ...state,
    [payload.field]: payload.value,
  };
}

{/** End of declare and define the type, state, action, and reducer for the address*/}

const EnterAddress = () => {
  const [address, dispatchAddress] = useReducer(handleAddress, {
    city: 'city',
    district: 'district',
    ward: 'ward',
    phone: 'phone',
    userAddress: 'userAddress',
  });

  const addressOwner = useSelector(selectAddressOwner);
  // const addressOwner = useSelector(selectUserID);
  const addressPending = useSelector(selectAddressPending);
  const addressFulfilled = useSelector(selectAddressFulfilled);
  const addressReject = useSelector(selectAddressFulfilled);

  useEffect(() => {console.log("addressOwner", addressOwner)}, [addressOwner]);


  const handleAdressUpload = async (adr: AddressState, id : string) => {
    try{
      const {phone, userAddress, city, district, ward} = adr;
      if(!phone || !userAddress || !city || !district || !ward) {
        throw new Error('Chưa điền đầy đủ thông tin');
      }
      if(phone.length < 10) throw new Error('Số điện thoại không hợp lệ');
      if(userAddress.length < 5) throw new Error('Địa chỉ không hợp lệ');
      const data = {
        phone: phone,
        address: userAddress,
        city: city ,
        district: district,
        ward: ward ,
        ownerID: id
      }
      const response = await AxiosInstance().post('create-address.php', data);
      if(response.status) {
        console.log(response.statusText)
        // return true;
        storeID();
      }else{
        throw new Error(`Thêm địa chỉ thât bại: ${response.statusText}`);
      }
    }catch(err){
      console.log('EnterAddress handleAddress error', err)
    }
  };

  useEffect(() => {
    console.log(`EnterAddress useEffect addressOwner: ${addressOwner}`)
  },[])


  const dispatch = useDispatch();

  const storeID = () =>{
    dispatch(setUserID(addressOwner))
  }
  return (
    <View style={[styles.container]}>
      <View style={[styles.container1]}>
        <View style={[{marginVertical: 20}]}>
          <Text style={[font.skip]} onPress={(storeID)}>Bỏ qua</Text>
        </View>
        <Text style={[font.headline]}>Well done !</Text>
        <Text style={[font.subline, {}]}>
          Your account is ready, we only need a little bit more informations to
          help you have a better experience
        </Text>
        <View style={[{paddingTop: 10, gap: 10}]}>
          <InputIcon
          value={address.phone}
            onChangeText={text => dispatchAddress({field: 'phone', value: text})}
            placeholder="Số điện thoại của bạn"
          />
          <InputIcon
          value={address.city}
            onChangeText={text => dispatchAddress({field: 'city', value: text})}
            placeholder="Thành phố/Tỉnh thành của bạn ?"
          />
          <InputIcon
          value={address.district}
            onChangeText={text => dispatchAddress({field: 'district', value: text})}
            placeholder="Quận/Huyện của bạn"
          />
          <InputIcon
          value={address.ward}
            onChangeText={text => dispatchAddress({field: 'ward', value: text})}
            placeholder="Phường/Xã của bạn"
          />
          <InputIcon
          value={address.userAddress}
            onChangeText={text => dispatchAddress({field: 'userAddress', value: text})}
            placeholder="Địa chỉ của bạn ?"
          />
          {/* <Input1 
          showIcon={true} 
          placeholder='Your city'
          rightIcon={require('../../assets/icon/map.png')}
          ></Input1>
          
          <Input1 
          showIcon={true} 
          placeholder='Your state'
          rightIcon={require('../../assets/icon/gps.png')}
          ></Input1>

          <Input1 
          showIcon={true} 
          placeholder='Your address'
          rightIcon={require('../../assets/icon/routing.png')}
          ></Input1> */}
        </View>
        <Button title="Let's go" style={{marginTop: 20}} onPress={()=> handleAdressUpload(address, addressOwner)}></Button>
      </View>
    </View>
  );
};

export default EnterAddress;
