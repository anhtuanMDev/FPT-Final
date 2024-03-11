import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import TitleBar from '../custom/actionbar/TitleBar';
import ReviewInformation from '../custom/carts/ReviewInformation';
import CommentCart from '../custom/carts/CommentCart';
import { Colors, fonts } from '../custom/style/cpt';
import { flexBox } from '../custom/style/flexBox';

type Prop = {
    style?: ViewStyle | ViewStyle[];
}

const RestaurantReview = (props: Prop) => {
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

    return (
        <View style={[{ padding: 20 }]}>
            <TitleBar
                title='Restaurant Name' />

            <ReviewInformation
                point={4.8}
                countReviews={37}
                countReviewsArray={[1, 2, 3, 4, 27]}
                style={[{ marginVertical: 20 }]}
            />

            <View style={[{ gap: 8, paddingHorizontal: 10, height: 50, backgroundColor: Colors.slate }, flexBox.rowFlexBox, flexBox.justifyContentFlexStart, style]}>
                <Text style={[fonts.subline, { color: Colors.navy }]}>
                    {
                        // // type === "Dish" ? 
                        // "You haven’t rate this dish" 
                        // : type === "Restaurant" ? 
                        "You haven’t rate this restaurant"
                        // :
                        //     "You haven’t rate this"
                    }
                </Text>
            </View>

            <View>
                {
                    data.map((value, index) => {
                        return (
                            <CommentCart
                                style={{ marginTop: 10, backgroundColor: "transparent", elevation: 0 }}
                            />
                        )
                    })
                }
            </View>

        </View>
    )
}

export default RestaurantReview