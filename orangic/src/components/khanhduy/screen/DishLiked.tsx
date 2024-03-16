import { View, Text } from 'react-native'
import React from 'react'
import DishTopInfoCart from '../custom/carts/DishTopInfoCart'
import VoteStar from '../custom/button/VoteStar'
import RectangularButton from '../custom/button/RectangularButton'
import Square_btn from '../../anhtuan/custom/buttons/Square_btn'
import BooleanButton from '../custom/button/BooleanButton'
import SquareReportButton from '../custom/button/SquareReportButton'
import { flexBox } from '../custom/style/flexBox'
import EnterItemQuantity from '../custom/form/EnterItemQuantity'
import { Colors, fonts } from '../custom/style/cpt'
import RestaurantFeaturedPartnerSeeMore from '../custom/button/RestaurantFeaturedPartnerSeeMore'
import RestaurantFeaturedPartnerList from '../custom/list/RestaurantFeaturedPartnerList'

type Prop = {

}

const DishLiked = (props: Prop) => {
    return (
        <View style={[{ padding: 20, position: "relative" }]}>

            <DishTopInfoCart
                dishName="Dish Name :)))"
                rating={4.5}
                numberOfReviews={35}
                freeDelivery={true}
                deliveryfee={0}
                timeDelivery="10-15 min" />

            <EnterItemQuantity
                price={10}
                style={{ marginTop: 20 }}
            />

            <Text style={[fonts.text, {marginTop: 20, color: Colors.slate}]}>
                Brown the beef better. Lean ground beef – I like to use 85% lean angus. Garlic – use fresh  chopped. Spices – chili powder, cumin, onion powder.
            </Text>

    
            <VoteStar
                style={{ marginTop: 20 }}
                type='Dish'
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


            <View style={[flexBox.rowFlexBox, flexBox.justifyContentSpaceBetween, { gap: 20 }]}>
                <RectangularButton
                    style={{ marginTop: 20, width: "80%" }}
                    title="Add to Cart"
                    onPress={() => {
                        console.log("DishLiked Add to Cart");
                    }}
                />
                <SquareReportButton
                    style={{ marginTop: 20 }}
                    title="Report"
                    onPress={() => {
                        console.log("DishLiked Report");
                    }}
                />
            </View>


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
                        console.log("DishLiked Back");
                    }
                }}
            />

            <BooleanButton
                style={{ position: "absolute", top: 40, right: 40, zIndex: 1000 }}
                onPress={(value) => {
                    console.log("DishLiked BooleanButton:", value);
                }}
                svg="Heart"
                value={false}
            />


        </View>
    )
}

export default DishLiked