import { Text, View, Image, ViewStyle } from 'react-native'
import React from 'react'
import Star from '../../../../assets/ics/star.svg';
import Item from '../../../../assets/ics/item.svg';
import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';


type Prop = {

    style?: ViewStyle | ViewStyle[];

    rating?: number;
    numberOfReviews?: number;
    restaurantName?: string;


    countItems?: number;
};

const RestaurantTopInfoCart = (props: Prop) => {

    const { style, rating, restaurantName, numberOfReviews, countItems } = props;

    return (
        <View style={[flexBox.columnFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentCenter, { gap: 20 }, style]}>
            <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentCenter]}>
                <Image source={require('../../../../assets/imgs/foodPoster1.jpg')} style={{ width: "100%", height: 198, borderRadius: 8 }} />
            </View>


            <View style={[flexBox.columnFlexBox, flexBox.alignItemsFlexStart, flexBox.justifyContentCenter, { width: '100%', gap: 15 }]}>
                <Text style={[fonts.titleBold]}>
                    {
                        restaurantName ? restaurantName : "Dish Name"
                    }
                </Text>

                <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentSpaceBetween, { width: '100%' }]}>
                    <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentFlexStart]}>
                        <Star fill={Colors.yellow} width={28} height={28} />
                        <Text style={[fonts.sublineBold, { textAlign: "center" }]}>
                            {
                                rating ? rating : "__"
                            }
                        </Text>
                        <Text style={[fonts.text, { color: Colors.slate, textAlign: "center" }]}>
                            {
                                numberOfReviews ?
                                    numberOfReviews > 0 ?
                                        numberOfReviews > 30 ? "(30+)" : `(${numberOfReviews})`
                                        : "(0)" : "(0)"

                            }
                        </Text>
                    </View>
                    <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentSpaceBetween]}>

                        <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentFlexEnd]}>
                            <Item fill={Colors.orange} width={20} height={20} />
                            <Text style={[fonts.text, { color: Colors.slate }]}>
                                {
                                    countItems ? 
                                    countItems > 0 ? countItems + " items": "0" + " items"
                                    : "0" + " items"
                                }

                            </Text>
                        </View>
                    </View>


                </View>

            </View>
        </View>
    )
}

export default RestaurantTopInfoCart
