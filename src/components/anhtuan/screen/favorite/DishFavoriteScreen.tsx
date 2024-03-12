import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {screens} from '../../custom/style/scn';
import {Colors} from '../../custom/style/cpt';
import HomeCardSmall from '../../custom/cards/HomeCardSmall';
import AxiosInstance from '../../../../helper/AxiosInstance';
import {set} from 'mongoose';

{
  /** Declare favorite foods type */
}

type FoodDisplayType = {
  Id: string;
  Name: string;
  TimeMade: string;
  FeatureItem: number;
  Price: number;
  Discount: number;
};

{
  /** Declare favorite foods type */
}

{
  /** Declare favorite foods repsonse type */
}

type FoodResponseType = {
  data: FoodDisplayType[];
  status: boolean;
  statusText: string;
};

{
  /** Declare favorite foods repsonse type */
}

const DishFavoriteScreen = () => {
  const [fav, setFav] = useState<FoodDisplayType[]>([]);
  const [lazyPage, setLazyPage] = useState(1);
  {
    /** Start of getting favorite foods */
  }

  const getFavoriteFoods = async (userID: string) => {
    const host = 'http://172.16.120.209:8686';

    const id = 'USR0BTKPMCW2MQ257BQM';
    const response: FoodResponseType = await AxiosInstance().post(
      '/get-all-favorite-foods.php',
      {id},
    );
    const cal = response.data.length * 7;
    if (response.status) {
      setFav(response.data.slice(0, cal));
    }
  };

  const loadmoreFavoriteFoods = async () => {
    setLazyPage(lazyPage + 1);
    getFavoriteFoods('i');
  };

  useEffect(() => {
    getFavoriteFoods('i');
  }, []);

  {
    /** End of getting favorite foods */
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
  return (
    <View style={[screens.parent_Cont, {backgroundColor: Colors.white}]}>
      <FlatList
        style={{
          flex: 1,
          marginTop: 20,
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}
        data={fav}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{justifyContent: 'space-around'}}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <>
              <HomeCardSmall
                key={item.Id}
                name={item.Name}
                price={Math.round(item.Price * (1 - item.Discount / 100))}
                time={converTime(item.TimeMade)}
                style={{marginBottom: 25}}
                favorite={true}
              />
            </>
          );
        }}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
};

export default DishFavoriteScreen;
