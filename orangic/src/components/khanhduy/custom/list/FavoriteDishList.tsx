import { View, Text, FlatList } from 'react-native'
import React from 'react'

import FavoriteDishCart from '../carts/FavoriteDishCart';

type Prop = {

};

const FavoriteDishList = (props: Prop) => {

    const data = [
        {
            name: "Dish 1",
            id: "1"
        },
        {
            name: "Dish 2",
            id: "2"
        },
        {
            name: "Dish 3",
            id: "3"
        },
        {
            name: "Dish 4",
            id: "4"
        },
        {
            name: "Dish 5",
            id: "5"
        },
        {
            name: "Dish 6",
            id: "6"
        },
        {
            name: "Dish 7",
            id: "7"
        },
        {
            name: "Dish 8",
            id: "8"
        },
        {
            name: "Dish 9",
            id: "9"
        },
        {
            name: "Dish 10",
            id: "10"
        }];

    const handleRenderItem = (item: any) => {
        return (
            <FavoriteDishCart
                key={item.item.id}
                dishName={item.item.name}
                rating={4.5}
                numberOfReviews={100}
                price={100}
                timeDelivery={"30 mins"}
                favorite={true}
                style={{ margin: "1%", width: "48%" }}
            />
        )
    }



    return (

        <FlatList
            data={data}
            renderItem={handleRenderItem}
            keyExtractor={(item) => item.id}
            horizontal={false}
            numColumns={2}
            style={{ alignSelf: "center", width: "100%" }}
        />



    )
}

export default FavoriteDishList