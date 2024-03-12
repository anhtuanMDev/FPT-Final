import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import BooleanButton from '../button/BooleanButton';
import { flexBox } from '../style/flexBox';
import { Colors, fonts, forms } from '../style/cpt';
import Star from '../../../../assets/ics/star.svg';
import TimeMade from '../../../../assets/ics/timeMade.svg';

type Prop = {
    onPress?: () => void;

    style?: ViewStyle | ViewStyle[];

    rating?: number;
    numberOfReviews?: number;
    dishName?: string;

    price?: number;
    timeDelivery?: string;
    onBooleanButtonPress?: (value: boolean) => void;
    favorite?: boolean;
}

const FavoriteDishCart = (props: Prop) => {
    const { onPress, rating, dishName, numberOfReviews, price, timeDelivery, favorite, style } = props;

    const [valueTemp, setValueTemp] = useState(favorite ? favorite : false);

    const handleBooleanButtonPress = (value: boolean) => {
        setValueTemp(value);
        props.onBooleanButtonPress && props.onBooleanButtonPress(value);
        console.log("FavoriteDishCart handleBooleanButtonPress: ", value);
    }

    const handlePress = () => {
        onPress && onPress();
    }


    return (
        <TouchableOpacity
            style={[{ display: "flex", borderRadius: 20, elevation: 5, backgroundColor: Colors.white }, style]}
            onPress={handlePress}
        >
            <View>
                <Image source={require("../../../../assets/imgs/foodPoster1.jpg")}
                    style={{ width: "100%", height: 200, borderRadius: 20, objectFit: "cover" }} />

                <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentFlexStart
                    , forms.capsule_Cont,
                { position: "absolute", bottom: -15, left: 15 }]}>

                    <Text style={[fonts.sublineBold, { textAlign: "center" }]}>
                        {
                            rating ? rating : "__"
                        }
                    </Text>

                    <Star fill={Colors.yellow} width={17} height={17} />

                    <Text style={[fonts.text, { color: Colors.slate, textAlign: "center" }]}>
                        {
                            numberOfReviews ?
                                numberOfReviews > 0 ?
                                    numberOfReviews > 30 ? "(30+)" : `(${numberOfReviews})`
                                    : "(0)" : "(0)"

                        }
                    </Text>
                </View>

                <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentFlexStart
                    , forms.capsule_Cont,
                { position: "absolute", top: 15, left: 15 }]}>
                    <Text style={[fonts.subline, { textAlign: "center" }]}>
                        <Text style={[fonts.subline, { textAlign: "center", color: Colors.orange }]}>
                            $
                        </Text>
                        {
                            price ? price : "__"
                        }
                    </Text>
                </View>

                <TouchableWithoutFeedback>
                    <View style={{ position: "absolute", top: 10, right: 10 }}>
                        <BooleanButton
                            svg="Heart"
                            value={true}
                            style={{ position: "absolute", top: 10, right: 10 }}
                            onPress={handleBooleanButtonPress} />
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={{ gap: 10, marginTop: 20, padding: 10 }}>
                <Text style={[fonts.sublineBold]}>
                    {
                        dishName ? dishName : "Dish Name"
                    }
                </Text>
                <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentFlexStart]}>
                    <TimeMade fill={Colors.orange} width={20} height={20} />
                    <Text style={[fonts.text, { color: Colors.slate }]}>
                        {
                            timeDelivery ? timeDelivery : 'Time Delivery'
                        }

                    </Text>
                </View>
            </View>


        </TouchableOpacity>
    )
}

export default FavoriteDishCart
