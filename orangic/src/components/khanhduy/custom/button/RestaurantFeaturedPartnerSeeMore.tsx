import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';

type Prop = {
    style?: ViewStyle | ViewStyle[];
    onPress?: () => void;
}


const RestaurantFeaturedPartnerSeeMore = (props: Prop) => {
    const { onPress, style } = props;
    return (
        <View style={[flexBox.rowFlexBox, flexBox.justifyContentSpaceBetween, style]}>
            <Text style={[fonts.sublineBold]}>Restaurant's Featured Partner</Text>
            <TouchableOpacity onPress={onPress}>
                <Text style={[fonts.link, { color: Colors.green }]}>See all</Text>
            </TouchableOpacity>
        </View>
    )

}

export default RestaurantFeaturedPartnerSeeMore