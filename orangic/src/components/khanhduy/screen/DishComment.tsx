import { View, Text } from 'react-native'
import React from 'react'
import DishTopInfoCart from '../custom/carts/DishTopInfoCart'
import VoteStar from '../custom/button/VoteStar'
import TextArea from '../../anhtuan/custom/forms/TextArea'
import RectangularButton from '../custom/button/RectangularButton'
import Square_btn from '../../anhtuan/custom/buttons/Square_btn'
import BooleanButton from '../custom/button/BooleanButton'

type Prop = {
}

const DishComment = (props: Prop) => {
    return (
        <View style={[{ padding: 20, position: "relative" }]}>

            <DishTopInfoCart
                dishName="Dish Name :)))"
                rating={4.5}
                numberOfReviews={35}
                freeDelivery={true}
                deliveryfee={0}
                timeDelivery="10-15 min" />

            <VoteStar
                style={{ marginTop: 20 }}
                type='Dish'
                permission={true}
                onPress={(point) => {
                    console.log(point);
                }}
            />

            <TextArea
                style={{ marginTop: 20, height: 200 }}
                placeholder=" "
                onChange={(text) => {
                    console.log(text);
                }}
            />

            <RectangularButton
                style={{ marginTop: 20 }}
                title="Rate"
                onPress={() => {
                    console.log("Rate");
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

export default DishComment