import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, buttons, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';
import { Warning } from '../../../../assets/ics';


type Prop = {
    onPress?: () => void;
    title?: string;
    style?: ViewStyle | ViewStyle[];
}


const SquareReportButton = (props: Prop) => {
    const { onPress, title, style } = props;
    return (
        <TouchableOpacity
        activeOpacity={0.5}
            style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentCenter,
             buttons.fluid_Cont, { backgroundColor: Colors.white, width: 48, height: 48, borderRadius: 15, elevation: 5},
                style]}
                onPress={onPress}
                >
                <Warning fill={Colors.black} width={28} height={28} />
        </TouchableOpacity>
    )
}

export default SquareReportButton