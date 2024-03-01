import { Text, View, Image, ViewStyle } from 'react-native'
import React from 'react'
import { Delivery, Star, Time, TimeMade } from '../../../../assets/ics';
import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';


type Prop = {

    style?: ViewStyle | ViewStyle[];

    rating?: number;
    numberOfReviews?: number;
    dishName?: string;

    freeDelivery?: boolean;
    deliveryfee?: number;
    timeDelivery?: string;
};

const DishTopInfoCart = (props: Prop) => {

    const { style, rating, dishName, numberOfReviews, freeDelivery, deliveryfee, timeDelivery } = props;

    return (
        <View style={[flexBox.columnFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentCenter, { gap: 20 }, style]}>
            <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentCenter]}>
                <Image source={require('../../../../assets/imgs/foodPoster1.jpg')} style={{ width: "100%", height: 198, borderRadius: 8 }} />
            </View>


            <View style={[flexBox.columnFlexBox, flexBox.alignItemsFlexStart, flexBox.justifyContentCenter, { width: '100%', gap: 15 }]}>
                <Text style={[fonts.titleBold]}>
                    {
                        dishName ? dishName : "Dish Name"
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
                        <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentFlexStart]}>
                            <Delivery fill={Colors.orange} width={25} height={25} />
                            <Text style={[fonts.text, { color: Colors.slate }]}>
                                {
                                    deliveryfee ?
                                        deliveryfee > 0 ?
                                            freeDelivery ? "Free Delivery" : `Delivery fee: ${deliveryfee}`
                                            : "Free Delivery"
                                        : "Free Delivery"
                                }
                            </Text>
                        </View>
                        <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentFlexEnd]}>
                            <TimeMade fill={Colors.orange} width={25} height={25} />
                            <Text style={[fonts.text, { color: Colors.slate }]}>
                                {
                                    timeDelivery ? timeDelivery : 'Time Delivery'
                                }

                            </Text>
                        </View>
                    </View>


                </View>

            </View>
        </View>
    )
}

export default DishTopInfoCart
