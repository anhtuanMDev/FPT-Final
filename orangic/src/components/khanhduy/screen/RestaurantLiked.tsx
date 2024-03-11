import { View, Text } from 'react-native'
import React from 'react'
import VoteStar from '../custom/button/VoteStar'
import RectangularButton from '../custom/button/RectangularButton'
import Square_btn from '../../anhtuan/custom/buttons/Square_btn'
import BooleanButton from '../custom/button/BooleanButton'
import RestaurantTopInfoCart from '../custom/carts/RestaurantTopInfoCart'
import RestaurantFeaturedPartnerList from '../custom/list/RestaurantFeaturedPartnerList'
import RestaurantFeaturedPartnerSeeMore from '../custom/button/RestaurantFeaturedPartnerSeeMore'
import { Colors, fonts } from '../custom/style/cpt'

type Prop = {
}

const RestaurantLiked = (props: Prop) => {
    return (
        <View style={[{ padding: 20, position: "relative" }]}>

            <RestaurantTopInfoCart
                restaurantName="Restaurant Name"
                rating={4.5}
                numberOfReviews={35}
                countItems={80} />

            <Text style={[fonts.text, { marginTop: 20, color: Colors.slate }]}>
                Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh  chopped. Spices – chili powder, cumin, onion powder.
            </Text>


            <VoteStar
                style={{ marginTop: 20 }}
                type='Restaurant'
                permission={false}
                onPress={(point) => {
                    console.log(point);
                }}
            />

            <RestaurantFeaturedPartnerSeeMore
                style={{ marginTop: 20 }}
                onPress={() => {
                    console.log("DishLiked RestaurantFeaturedPartnerSeeMore");
                }}
            />

            <RestaurantFeaturedPartnerList
                style={{ marginTop: 20 }}
                horizontal={true}
                onItemPress={() => {
                    console.log("DishLiked RestaurantFeaturedPartnerList Item Press");
                }}
            />

            <RectangularButton
                style={{ marginTop: 20 }}
                title="None"
                onPress={() => {
                    console.log("None");
                }}
            />

            <Square_btn
                svg="Back"
                color="black"
                button={{
                    btnStyle: {
                        position: "absolute",
                        top: 40,
                        left: 30,
                        borderRadius: 15,
                        zIndex: 1000
                    },
                    onPress: () => {
                        console.log("Back");
                    }
                }}
            />

            <BooleanButton
                style={{ position: "absolute", top: 40, right: 40, zIndex: 1000 }}
                onPress={(value) => {
                    console.log(value);
                }}
                svg="Heart"
                value={false}
            />


        </View>
    )
}

export default RestaurantLiked

