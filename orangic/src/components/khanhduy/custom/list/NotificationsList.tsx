import { View, Text, FlatList, ViewStyle } from 'react-native'
import React from 'react'
import FavoriteRestaurantCart from '../carts/FavoriteRestaurantCart';
import RestaurantFeaturedPartnerCart from '../carts/RestaurantFeaturedPartnerCart';
import NotificationCart from '../carts/NotificationCart';

type Prop = {
    horizontal?: boolean;
    style?: ViewStyle | ViewStyle[];
    onItemPress?: () => void;
};

const NotificationsList = (props: Prop) => {
    const { style } = props;

    const data = [
        {
            name: "Partner 1",
            id: "1"
        },
        {
            name: "Partner 2",
            id: "2"
        },
        {
            name: "Partner 3",
            id: "3"
        },
        {
            name: "Partner 4",
            id: "4"
        },
        {
            name: "Partner 5",
            id: "5"
        },
        {
            name: "Partner 6",
            id: "6"
        },
        {
            name: "Partner 7",
            id: "7"
        },
        {
            name: "Partner 8",
            id: "8"
        },
        {
            name: "Partner 9",
            id: "9"
        },
        {
            name: "Partner 10",
            id: "10"
        }];

    const handleRenderItem = (item: any) => {
        return (
            <NotificationCart
                key={item.id}
                onPress={() => {
                    console.log("NotificationsList item ", item.id)
                }}
            />
        )
    }



    return (
        <FlatList
            data={data}
            renderItem={handleRenderItem}
            keyExtractor={item => item.id}
            horizontal={props.horizontal}
            style={[style]}
        />

    )
}

export default NotificationsList