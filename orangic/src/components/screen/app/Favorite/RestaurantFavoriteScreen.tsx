import {View, Text, Modal} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  selectHost,
  selectUserID,
} from '../../../../helpers/state/Global/globalSlice';
import AxiosInstance from '../../../../helpers/AxiosInstance';
import {Colors, screenStyles} from '../../../custom/styles/ScreenStyle';
import RestaurantEmptyFav from '../../../../assets/images/EmptyRestaurantFav.svg';
import {fonts} from '../../../custom/styles/ComponentStyle';
import BigCard from '../../../custom/cards/BigCard';
import {FlatList} from 'react-native';
import WaitingModal from '../../../custom/ui/WaitingModal';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ParamList} from '../../../navigation/RootNavigation';
import {set} from 'mongoose';

type RestaurantType = {
  Id: string;
  Name: string;
  Introduction: string;
  Image: string;
  Point: number;
  TotalReview: number;
  Status: string;
  OwnerID: string;
};

const RestaurantFavoriteScreen = () => {
  const [restaurant, setRestaurant] = useState<RestaurantType[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProp<ParamList>>();

  const host = useSelector(selectHost);
  const userID = useSelector(selectUserID);
  const getFavoriteRestaurants = async () => {
    setRefresh(true);
    if (!userID) return;
    const response = await AxiosInstance().post(
      '/get-all-favorite-restaurants.php',
      {
        id: userID,
      },
    );
    console.log(response)
    if (response.status) setRestaurant(response.data);
    setRefresh(false);
  };

  useEffect(() => {
    getFavoriteRestaurants();
  }, []);

  const ModalLoad = () => {
    return (
      <Modal animationType="fade" transparent={true} visible={refresh}>
        <WaitingModal />
      </Modal>
    );
  };

  return (
    <FlatList
      data={restaurant}
      style={screenStyles.container}
      refreshing={refresh}
      onRefresh={async () => {
        await getFavoriteRestaurants();
      }}
      ItemSeparatorComponent={() => <View style={{height: 15}} />}
      ListEmptyComponent={
        <View
          style={[
            screenStyles.container,
            {alignContent: 'center', justifyContent: 'center'},
          ]}>
          <ModalLoad />
          <View style={{alignItems: 'center'}}>
            <RestaurantEmptyFav width={300} height={300} />
            <Text style={[fonts.sublineBold, {lineHeight: 20}]}>
              Xin lỗi, chúng tôi không tìm thấy nhà hàng yêu thích của bạn{' '}
              <Text
                style={[
                  fonts.sublineBold,
                  {color: Colors.orange, lineHeight: 20},
                ]}
                onPress={async () => {
                  await getFavoriteRestaurants();
                }}>
                Tìm lại lần nữa ?
              </Text>
            </Text>
          </View>
        </View>
      }
      renderItem={({item}: {item: RestaurantType}) => (
        <BigCard
          key={item.Id}
          name={item.Name}
          image={item.Image ? `${host}/uploads/${item.Image}.jpg` : undefined}
          rate={item.Point}
          onPress={() => navigation.navigate('US_Restaurant', {id: item.Id})}
          rateCount={item.TotalReview}
          favorite={1}
          intro={item.Introduction.length > 50 ? item.Introduction.slice(0, 50) + '...' : item.Introduction}
          onFavoritePress={async () => {
            const body = {
              target: item.Id,
              user: userID,
            };
            console.log(body)
            const response = await AxiosInstance().post(
              '/post-remove-favorite.php',
              body,
            );
            console.log(response)
            await getFavoriteRestaurants();
          }}
          style={{
            marginLeft: 20,
            marginRight: 20,
          }}
        />
      )}
    />
  );
};

export default RestaurantFavoriteScreen;
