import {View, Text, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import {NavigateProp} from '../../../../navigation/RootNavigation';
import {screens} from '../../custom/style/scn';
import Topbar from '../../custom/actionbars/Topbar';
import {TextInput} from 'react-native-gesture-handler';
import Square_btn from '../../custom/buttons/Square_btn';
import {Colors, fonts} from '../../custom/style/cpt';
import AxiosInstance from '../../../../helper/AxiosInstance';
import HomeCardSmall from '../../custom/cards/HomeCardSmall';
import HomeCardBig from '../../custom/cards/HomeCardBig';
{
  /** Start of declare type of food and restaurant data */
}
type FoodDisplayType = {
  Id: string;
  Name: string;
  TimeMade: string;
  FeatureItem: number;
  Image: string;
  Point: number;
  TotalReview: number;
  Price: number;
  Discount: number;
};

type RestaurantDisplayType = {
  Id: string;
  Name: string;
  Introduction: string;
  Image: string;
  Point: number;
  TotalReview: number;
  Status: string;
  ownerID: string;
};

{
  /** End of declare type of food and restaurant data */
}

{
  /** Start of declare type of response of image */
}

type ResponseImage = {
  data: string[];
  status: boolean;
  statusText: string;
};

{
  /** End of declare type of response of image */
}

{
  /** Start of declare type of food and restaurant response */
}
type ResponseFoods = {
  data: FoodDisplayType[];
  status: boolean;
  statusText: string;
};

type ResponseRestaurants = {
  data: RestaurantDisplayType[];
  status: boolean;
  statusText: string;
};

{
  /** End of declare type of food and restaurant response */
}

{
  /** Start of state and action reducer */
}
type LazyLoadState = {
  featureItem: FoodDisplayType[];
  featurePage: number;
  popularItem: FoodDisplayType[];
  popularPage: number;
  newItems: FoodDisplayType[];
  newPage: number;
  allrestaurant: RestaurantDisplayType[];
  allrestaurantPage: number;
};

type LazyLoadAction = {
  field: keyof LazyLoadState;
  value: any;
};

function handleLazyLoad(state: LazyLoadState, payload: LazyLoadAction) {
  return {
    ...state,
    [payload.field]: payload.value,
  };
}
{
  /** End of state and action reducer */
}

const Home = (prop: NavigateProp) => {
  const host = "http://192.168.1.6:8686"
  const [search, setSearch] = useState('');
  const nameTab = [
    'Món ăn đặc biệt',
    'Món ăn nổi tiếng',
    'Món ăn mới',
    'Tất cả nhà hàng',
  ];

  const [lazy, dispatchLazy] = useReducer(handleLazyLoad, {
    featureItem: [],
    featurePage: 1,
    popularItem: [],
    popularPage: 1,
    newItems: [],
    newPage: 1,
    allrestaurant: [],
    allrestaurantPage: 1,
  });

  {
    /** Start of get feature items */
  }

  const featureItems = async () => {
    const response = await AxiosInstance().get('/get-20-feature-foods.php');
    const data: FoodDisplayType[] = response.data;
    const cal = lazy.featurePage * 5;
    if (response.status) {
      dispatchLazy({field: 'featureItem', value: data.slice(0, cal)});
    }
  };

  const loadmoreFeatureItems = async () => {
    dispatchLazy({field: 'featurePage', value: lazy.featurePage + 1});
    featureItems();
  };

  {
    /** End of get feature items */
  }

  {
    /** Start of get new items */
  }

  const newFoodItems = async () => {
    const response = await AxiosInstance().get('/get-20-new-foods.php');
    const data: FoodDisplayType[] = response.data;
    const cal = lazy.newPage * 5;
    if (response.status) {
      dispatchLazy({field: 'newItems', value: data.slice(0, cal)});
    }
  };

  const loadmoreNewItem = async () => {
    dispatchLazy({field: 'newPage', value: lazy.newPage + 1});
    newFoodItems();
  };

  {
    /** End of get new items */
  }

  {
    /** Start of get popular items */
  }

  const popularItem = async () => {
    const response = await AxiosInstance().get('/get-20-popular-foods.php');
    const data: FoodDisplayType[] = response.data;
    const cal = lazy.popularPage * 5;
    if (response.status) {
      dispatchLazy({field: 'popularItem', value: data.slice(0, cal)});
    }
  };

  const loadmorePopularItem = async () => {
    dispatchLazy({field: 'popularPage', value: lazy.popularPage + 1});
    popularItem();
  };

  {
    /** End of get popular items */
  }

  {
    /** Start of get restaurants */
  }

  const restaurantItem = async () => {
    const response = await AxiosInstance().get('/get-20-restaurants.php');
    const data: RestaurantDisplayType[] = response.data;
    const cal = lazy.featurePage * 5;
    if (response.status) {
      dispatchLazy({field: 'allrestaurant', value: data.slice(0, cal)});
    }
  };

  const loadmoreRestaurants = async () => {
    dispatchLazy({
      field: 'allrestaurantPage',
      value: lazy.allrestaurantPage + 1,
    });
    restaurantItem();
  };

  {
    /** Start of get restaurants */
  }

  {
    /** Start of function convert time */
  }

  function converTime(time: string): string {
    const parts = time.split(':');
    const hours = parseInt(parts[0]);
    let minutes = parseInt(parts[1]);
    const secs = parseInt(parts[2]);

    if (secs > 30) minutes++;

    if (hours === 0) {
      return `${minutes} mins`;
    } else {
      return `${hours}hr ${minutes} mins`;
    }
  }

  {
    /** End of function convert time */
  }

  {
    /** Fetch data for the first time */
  }
  useEffect(() => {
    featureItems();
    restaurantItem();
    newFoodItems();
    popularItem();
  }, []);
  {
    /** */
  }

  return (
    <View style={[screens.main_Cont, {backgroundColor: Colors.white}]}>
      <View
        style={{
          flexDirection: 'row',
          borderWidth: 1,
          borderColor: Colors.black,
          borderRadius: 15,
          alignItems: 'center',
          marginTop: 20,
        }}>
        <TextInput
          style={{flex: 1, marginLeft: 10}}
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />
        <Square_btn
          svg="Search"
          button={{
            btnStyle: {
              borderWidth: 0,
              marginRight: 20,
            },
          }}
        />
      </View>

      <FlatList
        data={[
          lazy.featureItem,
          lazy.popularItem,
          lazy.newItems,
          lazy.allrestaurant,
        ]}
        style={{marginTop: 20}}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) =>
          index !== 3 ? (
            <React.Fragment>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 15,
                  marginTop: index !== 0 ? 30 : 0,
                }}>
                <Text style={[fonts.sublineBold, {flex: 1}]}>
                  {nameTab[index]}
                </Text>
                <Text style={[fonts.link, {color: Colors.green}]}>
                  Xem thêm
                </Text>
              </View>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={item as FoodDisplayType[]}
                onEndReached={() => {
                  switch (index) {
                    case 0:
                      loadmoreFeatureItems();
                    case 1:
                      loadmorePopularItem();
                    case 2:
                      loadmoreNewItem();
                  }
                }}
                onEndReachedThreshold={0.4}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <HomeCardSmall
                    key={item.Id}
                    name={
                      item.Name && item.Name.length > 17
                        ? `${item.Name.slice(0, 17)}...`
                        : item.Name
                    }
                    image={item.Image && {uri: `${host}/uploads/${item.Image}.jpg`}}
                    time={item.TimeMade && converTime(item.TimeMade)}
                    price={Math.round(item.Price * (1 - item.Discount / 100))}
                    favorite={false}
                    rate={item.Point || 0}
                    rateCount={item.TotalReview || 0}
                    style={{
                      marginVertical: 10,
                      marginLeft: 20,
                      marginRight: 10,
                    }}
                  />
                )}
              />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <View
                style={{flexDirection: 'row', marginBottom: 15, marginTop: 30}}>
                <Text style={[fonts.sublineBold, {flex: 1}]}>
                  {nameTab[index]}
                </Text>
                <Text style={[fonts.link, {color: Colors.green}]}>See all</Text>
              </View>
              <FlatList
                data={item as RestaurantDisplayType[]}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadmoreRestaurants}
                onEndReachedThreshold={0.4}
                renderItem={({item}) => (
                  <HomeCardBig
                    name={item.Name}
                    favorite={false}
                    image={item.Image && {uri: `${host}/uploads/${item.Image}.jpg`}}
                    rate={item.Point || 0}
                    rateCount={item.TotalReview || 0}
                    intro={
                      item.Introduction && item.Introduction.length > 70
                        ? item.Introduction.slice(0, 70) + '...'
                        : item.Introduction
                    }
                    style={{
                      marginHorizontal: 10,
                      marginTop: 20,
                      marginBottom: 10,
                    }}
                  />
                )}
              />
            </React.Fragment>
          )
        }
      />
    </View>
  );
};

export default Home;
