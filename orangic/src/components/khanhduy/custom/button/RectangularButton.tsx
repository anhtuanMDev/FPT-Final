import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, buttons, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';


type Prop = {
    onPress?: () => void;
    title?: string;
    style?: ViewStyle | ViewStyle[];
}


const RectangularButton = (props: Prop) => {
    const { onPress, title, style } = props;
    return (
        <TouchableOpacity
        activeOpacity={0.5}
            style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentCenter,
            { backgroundColor: Colors.orange }, buttons.fluid_Cont,
                style]}
                onPress={onPress}
                >
            <Text style={[fonts.button]}>
                {
                    title ? title : "Button"
                }
            </Text>
        </TouchableOpacity>
    )
}

export default RectangularButton