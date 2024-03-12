import {View, Text, StatusBar, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, fonts} from '../../custom/style/cpt';
import Titlebar from '../../custom/actionbars/Titlebar';
import TitleList from '../../custom/lists/TitleList';
import AddressList from '../../custom/lists/AddressList';
import AxiosInstance from '../../../../helper/AxiosInstance';

{
  /** Start of declare address type */
}

type AddressType = {
  Id: string;
  Address: string;
  City: string;
  District: string;
  Ward: string;
  Priority: string;
  OwnerID: string;
  Phone: string;
};

{
  /** End of declare address type */
}

const Address = () => {
  const [mainAddress, setMainAddress] = useState<AddressType>();
  const [otherAddress, setOtherAddress] = useState<AddressType[]>([]);

  {
    /** Start of get main address */
  }

  const getMainAddress = async (userID: string) => {
    const id = 'USR0BTKPMCW2MQ257BQM';
    const response = await AxiosInstance().post('/get-user-main-address.php', {
      id,
    });
    if (response.status) {
      setMainAddress(response.data);
    }
  };

  const getOtherAddress = async (userID: string) => {
    const id = 'USR0BTKPMCW2MQ257BQM';
    const response = await AxiosInstance().post('/get-user-other-address.php', {
      id,
    });
    if (response.status) {
      setOtherAddress(response.data);
    }
  };

  useEffect(() => {
    getMainAddress('USR0BTKPMCW2MQ257BQM');
    getOtherAddress('USR0BTKPMCW2MQ257BQM');
  }, []);

  {
    /** End of get main address */
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <Titlebar
        title={{
          text: 'Địa chỉ của bạn',
        }}
        barStyle={{
          marginTop: 10,
          marginBottom: 20,
        }}
        left={{btnStyle: {borderWidth: 0}}}
        right={{btnStyle: {borderWidth: 0}}}
      />

      <View style={{flex: 1, alignItems: 'center', paddingHorizontal: 20}}>
        <TitleList
          barStyle={{backgroundColor: Colors.orange}}
          title="Địa chỉ chính của bạn"
        />

        {!mainAddress?.Id ? (
          <View style={{width: '100%', paddingVertical: 30, paddingLeft: 20}}>
            <Text style={[fonts.subline, {color: Colors.slate}]}>
              Xin lỗi nhưng chúng tôi không tìm địa chỉ chính của bạn
            </Text>
          </View>
        ) : (
          <View style={{height: 100, marginTop: 20}}>
            <AddressList
              key={mainAddress.Id}
              address={mainAddress.Address}
              detail={`${mainAddress.Ward}, ${mainAddress.District}, ${mainAddress.City}`}
            />
          </View>
        )}
        <TitleList
          barStyle={{backgroundColor: Colors.slate}}
          title="Địa chỉ khác của bạn"
        />

        {otherAddress.length == 0 ? (
          <View style={{width: '100%', paddingVertical: 30, paddingLeft: 20}}>
            <Text style={[fonts.subline, {color: Colors.slate}]}>
              Xin lỗi nhưng chúng tôi không tìm địa chỉ phụ của bạn
            </Text>
          </View>
        ) : (
          <FlatList
            data={otherAddress}
            keyExtractor={item => item.Id}
            renderItem={({item}) => (
              <AddressList
                key={item.Id}
                address={item.Address}
                detail={`${item.Ward}, ${item.District}, ${item.City}`}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Address;
