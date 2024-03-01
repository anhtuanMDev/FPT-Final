import { View, Text, FlatList } from 'react-native'
import React from 'react'
import FavoriteRestaurantCart from '../carts/FavoriteRestaurantCart';

type Prop = {

};

const FavoriteRestaurantList = (props: Prop) => {

    const data = [
        {
            name: "Restaurant 1",
            id: "1"
        },
        {
            name: "Restaurant 2",
            id: "2"
        },
        {
            name: "Restaurant 3",
            id: "3"
        },
        {
            name: "Restaurant 4",
            id: "4"
        },
        {
            name: "Restaurant 5",
            id: "5"
        },
        {
            name: "Restaurant 6",
            id: "6"
        },
        {
            name: "Restaurant 7",
            id: "7"
        },
        {
            name: "Restaurant 8",
            id: "8"
        },
        {
            name: "Restaurant 9",
            id: "9"
        },
        {
            name: "Restaurant 10",
            id: "10"
        }];

    const handleRenderItem = (item: any) => {
        return (
            <FavoriteRestaurantCart
                key={item.item.id}
                restaurantName={item.item.name}
                rating={4.5}
                numberOfReviews={100}
                description={"This is a description"}
                favorite={true}
                style={{ margin: 10 }}
            />
        )
    }



    return (
        <FlatList
            data={data}
            renderItem={handleRenderItem}
            keyExtractor={item => item.id}
        />

    )
}

export default FavoriteRestaurantList