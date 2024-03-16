import { View, Text } from 'react-native'
import React from 'react'


import TextArea from '../../anhtuan/custom/forms/TextArea'
import RectangularButton from '../custom/button/RectangularButton'
import Square_btn from '../../anhtuan/custom/buttons/Square_btn'
import BooleanButton from '../custom/button/BooleanButton'
import { Colors, fonts } from '../custom/style/cpt'
import RestaurantTopInfoCart from '../custom/carts/RestaurantTopInfoCart'

type Prop = {
}

const RestaurantReport = (props: Prop) => {
    return (
        <View style={[{ padding: 20, position: "relative" }]}>

            <RestaurantTopInfoCart
                restaurantName="Restaurant Name"
                rating={4.5}
                numberOfReviews={35}
                countItems={80} />

            <Text style={[fonts.title, { textAlign: "center", color: Colors.orange , marginTop: 20}]}>
                {"Report "}
                <Text style={[fonts.titleBold, { textAlign: "center", color: Colors.orange }]}>
                    {
                        "Dish Name :)))"
                    }
                </Text>
            </Text>

            <TextArea
                style={{ marginTop: 20, height: 200 }}
                placeholder=" "
                onChange={(text) => {
                    console.log(text);
                }}
            />

            <RectangularButton
                style={{ marginTop: 20 }}
                title="Submit"
                onPress={() => {
                    console.log("Submit");
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

export default RestaurantReport