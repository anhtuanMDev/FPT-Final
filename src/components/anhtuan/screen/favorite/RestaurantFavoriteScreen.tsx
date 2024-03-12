import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {screens} from '../../custom/style/scn';
import {Colors} from '../../custom/style/cpt';
import HomeCardSmall from '../../custom/cards/HomeCardSmall';
import AxiosInstance from '../../../../helper/AxiosInstance';
import HomeCardBig from '../../custom/cards/HomeCardBig';

{
  /** Start of declare restaurants type */
}

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

{
  /** End of declare restaurants type */
}

{
  /** Start of declare restaurants response type */
}

type RestaurantResponseType = {
  data: RestaurantType[];
  status: boolean;
  statusText: string;
};

{
  /** End of declare restaurants response type */
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

const RestaurantFavoriteScreen = () => {
  const host = 'http://172.16.120.209:8686';

  const [fav, setFav] = useState<RestaurantType[]>([]);
  const [lazyPage, setLazyPage] = useState(1);

  {
    /** Start of getting favorite restaurants */
  }

  const getFavoriteRestaurants = async (userID: string) => {
    // is using id as data not userID
    const id = 'USR0BTKPMCW2MQ257BQM';
    const response: RestaurantResponseType = await AxiosInstance().post(
      '/get-all-favorite-restaurants.php',
      {id},
    );
    const cal = response.data.length * 7;
    if (response.status) {
      setFav(response.data.slice(0, cal));
    }
  };

  const loadmoreFavoriteRestaurants = async () => {
    setLazyPage(lazyPage + 1);
    getFavoriteRestaurants('i');
  };

  {
    /** End of getting favorite restaurants */
  }
  useEffect(() => {
    getFavoriteRestaurants('i');
  }, []);

  return (
    <View style={[screens.parent_Cont, {backgroundColor: Colors.white}]}>
      
      <FlatList
                data={fav as RestaurantType[]}
                keyExtractor={(item, index) => index.toString()}
                // onEndReached={loadmoreRestaurants}
                onEndReachedThreshold={0.4}
                renderItem={({item}) => (
                  <HomeCardBig
                    name={item.Name}
                    favorite={true}
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

      {/* <FlatList
        style={{
          flex: 1,
          marginTop: 20,
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}
        data={fav}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <>
              <HomeCardSmall
                name={item.Name}
                style={{marginBottom: 25}}
                favorite={true}
              />
            </>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      /> */}
    </View>
  );
};

export default RestaurantFavoriteScreen;
