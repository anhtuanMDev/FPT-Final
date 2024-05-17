import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import AxiosInstance from '../../helpers/AxiosInstance';
import {useDispatch, useSelector} from 'react-redux';
import {
  isLoading,
  selectHost,
  selectUserID,
} from '../../helpers/state/Global/globalSlice';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {screenStyles} from '../custom/styles/ScreenStyle';
import {fonts} from '../custom/styles/ComponentStyle';
import {FoodDisplayType} from '../../helpers/state/AppTab/homeSlice';
import {FlatList} from 'react-native';
import {ParamList} from '../navigation/RootNavigation';
import SmallCart from '../custom/cards/SmallCart';

const AllFeature = () => {
  const navigation =
    useNavigation<NavigationProp<ParamList, 'AllFeature'>>();
  const userID = useSelector(selectUserID);
  const isFocused = useIsFocused();
  const host = useSelector(selectHost);
  const dispatch = useDispatch();
  const [data, setData] = useState<FoodDisplayType[]>([]);

  const addFavorite = async (target: string) => {
    const body = {
      target,
      user: userID,
    };
    const response = await AxiosInstance().post('/post-add-favorite.php', body);
    console.log('add favorite', response);
  };

  const removeFavorite = async (target: string) => {
    const body = {
      target,
      user: userID,
    };
    const response = await AxiosInstance().post(
      '/post-remove-favorite.php',
      body,
    );
    console.log('remove favorite', response);
  };

  const getFoods = async () => {
    const response = await AxiosInstance().post(
      '/get-20-feature-foods.php',
      {id: userID},
    );
    console.log(response);
    if (response.status) {
      setData(response.data);
    }
  };

  useEffect(() => {
    if (isFocused) getFoods();
  }, [isFocused]);

  return (
    <View style={[screenStyles.parent_container]}>
      <Text
        style={[
          fonts.captionBold,
          {textAlign: 'center', marginTop: 15, marginBottom: 20},
        ]}>
        {`Tất cả món ăn đặc sản nổi tiếng (${data.length})`}
      </Text>
      <FlatList
        data={data}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <SmallCart
            image={item.Image ? `${host}/uploads/${item.Image}.jpg` : undefined}
            name={item.Name}
            favorite={item.UserFavorite}
            rate={item.Point}
            rateCount={item.TotalReview}
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginBottom: 25,
            }}
            onFavoritePress={() => {
              item.UserFavorite ? removeFavorite(item.Id) : addFavorite(item.Id);
              setData(
                data.map(value => {
                  if (value.Id === item.Id) {
                    value.UserFavorite = value.UserFavorite ? 0 : 1;
                  }
                  return value;
                }),
              );
            }}
            onPress={() => {
              dispatch(isLoading(true));
              navigation.navigate('US_FoodDetail', {id: item.Id});
            }}
          />
        )}
      />
    </View>
  );
};

export default AllFeature;
