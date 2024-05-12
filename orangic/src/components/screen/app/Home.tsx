import {
  View,
  Text,
  ScrollView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {Colors, screenStyles} from '../../custom/styles/ScreenStyle';
import HomeBar from '../../custom/topbars/HomeBar';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../../../helpers/state/store';
import Loading from '../../custom/ui/Loading';
import SectionBar from '../../custom/topbars/SectionBar';
import {
  DrawerActions,
  NavigationProp,
  useNavigation,
  useIsFocused,
} from '@react-navigation/native';
import {ParamList} from '../../navigation/RootNavigation';
import SmallCart from '../../custom/cards/SmallCart';
import {
  fetchHomeItem,
  RestaurantDisplayType,
  selectEventArray,
  selectFeatureArray,
  selectNewItemsArray,
  selectPopularItemsArray,
  selectRecommendedItemsArray,
  selectRestaurantsArray,
} from '../../../helpers/state/AppTab/homeSlice';
// import {set} from 'mongoose';
import BigCard from '../../custom/cards/BigCard';
import {
  isLoading,
  selectHost,
  selectLoading,
  selectUserID,
} from '../../../helpers/state/Global/globalSlice';
import {showMessage} from 'react-native-flash-message';
import {fonts} from '../../custom/styles/ComponentStyle';

export function converTime(time: string): string {
  const parts = time.split(':');
  const hours = parseInt(parts[0]);
  let minutes = parseInt(parts[1]);
  const secs = parseInt(parts[2]);

  if (secs > 30) minutes++;

  if (hours === 0) {
    return `${minutes} phút`;
  } else {
    return `${hours}giờ ${minutes} phút`;
  }
}

const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamList, 'HomeDrawer'>>();
  const [search, setSearch] = useState('');
  const isFocused = useIsFocused();

  const userID = useSelector(selectUserID);
  const host = useSelector(selectHost);

  /** check if the section has data */
  const load = useSelector(selectLoading);

  const featureArray = useSelector(selectFeatureArray);
  const popularArray = useSelector(selectPopularItemsArray);
  const recommendArray = useSelector(selectRecommendedItemsArray);
  const eventArray = useSelector(selectEventArray);
  const newArray = useSelector(selectNewItemsArray);
  const restaurantArray = useSelector(selectRestaurantsArray);

  const dispatched = useDispatch<AppDispatch>();
  const [refreshing, setRefreshing] = useState(false);

  const searchFood = () => {
    if (search === '') {
      showMessage({
        message: 'Bạn muốn tìm gì vậy ?',
        type: 'warning',
      });
      return;
    } else {
      navigation.navigate('Search', {search: search});
    }
  };

  const fetchAlldata = async () => {
    await dispatched(fetchHomeItem(userID));
  };

  useEffect(() => {
    if (isFocused) fetchAlldata();
    else setSearch('');
  }, [isFocused]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAlldata().then(() => setRefreshing(false));
  }, []);

  return load ? (
    <Loading />
  ) : (
    <View style={[screenStyles.parent_container]}>
      <StatusBar backgroundColor={Colors.orange} barStyle="dark-content" />
      <HomeBar
        notify={0}
        onChange={value => setSearch(value)}
        value={search}
        searchContainStyle={{
          marginVertical: 10,
          marginHorizontal: 25,
        }}
        onLeftPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        onRightPress={() => {
          navigation.navigate('Notifications');
        }}
        onSearch={() => searchFood()}
        style={{
          paddingHorizontal: 20,
          backgroundColor: Colors.orange,
        }}
        textStyle={{color: Colors.black}}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {recommendArray && (
          <View
            style={{
              marginTop: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 20,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: 10,
                  marginBottom: 15,
                  marginRight: 15,
                }}>
                Gợi ý hôm nay
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {eventArray.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={item.Id}
                      style={{paddingHorizontal: 10, paddingVertical: 5}}>
                      <Text style={[fonts.button, {color: Colors.green}]}>
                        {item.Title}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
            <FlatList
              data={recommendArray}
              horizontal
              extraData={featureArray.length > 0}
              ListEmptyComponent={() => <View></View>}
              showsHorizontalScrollIndicator={false}
              style={{paddingLeft: 15}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                <SmallCart
                  time={converTime(item.TimeMade)}
                  rate={item.Point}
                  rateCount={item.TotalReview}
                  name={item.Name.slice(0, 10) + '...'}
                  favorite={item.UserFavorite == 1}
                  onPress={() => {
                    dispatched(isLoading(true));
                    navigation.navigate('US_FoodDetail', {id: item.Id});
                  }}
                  image={
                    item.Image ? `${host}/uploads/${item.Image}.jpg` : undefined
                  }
                  style={{
                    marginRight: 20,
                    marginBottom: 5,
                  }}
                />
              )}
            />
          </View>
        )}

        {featureArray && featureArray.length > 0 && (
          <View
            style={{
              marginTop: 20,
            }}>
            <SectionBar
              name="Món ăn đặc sản"
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
              }}
              actionStyle={{color: Colors.green}}
              onPress={() => {}}
            />
          </View>
        )}
        <FlatList
          data={featureArray}
          horizontal
          extraData={featureArray.length > 0}
          ListEmptyComponent={() => <View></View>}
          showsHorizontalScrollIndicator={false}
          style={{paddingLeft: 15}}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <SmallCart
              time={converTime(item.TimeMade)}
              rate={item.Point}
              rateCount={item.TotalReview}
              name={item.Name.slice(0, 10) + '...'}
              favorite={item.UserFavorite == 1}
              onPress={() => {
                dispatched(isLoading(true));
                navigation.navigate('US_FoodDetail', {id: item.Id});
              }}
              image={
                item.Image ? `${host}/uploads/${item.Image}.jpg` : undefined
              }
              style={{
                marginRight: 20,
                marginBottom: 5,
              }}
            />
          )}
        />
        {popularArray.length > 0 && (
          <View
            style={{
              marginTop: 20,
            }}>
            <SectionBar
              name="Món ăn Nổi tiếng"
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
              }}
              actionStyle={{color: Colors.green}}
              onPress={() => {}}
            />
          </View>
        )}

        <FlatList
          data={popularArray}
          horizontal
          extraData={popularArray.length > 0}
          style={{paddingLeft: 15}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <SmallCart
              name={item.Name.slice(0, 10) + '...'}
              image={
                item.Image ? `${host}/uploads/${item.Image}.jpg` : undefined
              }
              time={converTime(item.TimeMade)}
              rate={item.Point}
              favorite={item.UserFavorite == 1}
              rateCount={item.TotalReview}
              onPress={() => {
                dispatched(isLoading(true));
                navigation.navigate('US_FoodDetail', {id: item.Id});
              }}
              style={{
                marginRight: 20,
                marginBottom: 5,
              }}
            />
          )}
        />

        {newArray.length > 0 && (
          <View
            style={{
              marginTop: 20,
            }}>
            <SectionBar
              name="Món ăn mới"
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
              }}
              actionStyle={{color: Colors.green}}
              onPress={() => {}}
            />
          </View>
        )}

        <FlatList
          data={newArray}
          horizontal
          extraData={newArray.length > 0}
          style={{paddingLeft: 15}}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <SmallCart
              name={item.Name.slice(0, 10) + '...'}
              image={
                item.Image ? `${host}/uploads/${item.Image}.jpg` : undefined
              }
              time={converTime(item.TimeMade)}
              rate={item.Point}
              rateCount={item.TotalReview}
              favorite={item.UserFavorite == 1}
              onPress={() => {
                dispatched(isLoading(true));
                navigation.navigate('US_FoodDetail', {id: item.Id});
              }}
              style={{
                marginRight: 20,
                marginBottom: 5,
              }}
            />
          )}
        />
        {restaurantArray.length > 0 && (
          <View
            style={{
              marginTop: 20,
              marginBottom: 50,
            }}>
            <SectionBar
              name="Nhà hàng nổi tiếng"
              style={{
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
              }}
              actionStyle={{color: Colors.green}}
              onPress={() => {
                navigation.navigate('AllRestaurants');
              }}
            />

            {restaurantArray.map((item: RestaurantDisplayType, index) => (
              <BigCard
                key={index}
                image={
                  item.Image ? `${host}/uploads/${item.Image}.jpg` : undefined
                }
                rate={item.Point}
                rateCount={item.TotalReview}
                name={item.Name}
                intro={item.Introduction.slice(0, 80) + '...'}
                favorite={item.UserFavorite}
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 25,
                }}
                onPress={() => {
                  dispatched(isLoading(true));
                  navigation.navigate('US_Restaurant', {id: item.Id});
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
