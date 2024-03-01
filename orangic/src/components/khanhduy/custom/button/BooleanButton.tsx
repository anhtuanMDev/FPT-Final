import { View, ViewStyle, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { HeartFill } from '../../../../assets/ics';
import { Colors, buttons } from '../style/cpt';

type Prop = {
    onPress?: (value: boolean) => void;
    style?: ViewStyle | ViewStyle[];
    svg?: "Heart";
    value?: boolean;
    svgSize?: number;
}

const BooleanButton = (props: Prop) => {
    const { onPress, style, svg, value } = props;
    const svgSize = props.svgSize ? props.svgSize : 20;

    const [valueTemp, setValueTempt] = useState(value ? value : false);

    const handlePress = () => {
        onPress && onPress(!valueTemp);
        setValueTempt(!valueTemp);
    }

    return (
        <TouchableOpacity
        activeOpacity={0.5}
            style={[buttons.square_Cont , {borderRadius: 50, borderWidth: 0}, style]}
            onPress={handlePress}
        >
            <HeartFill fill={valueTemp ? Colors.orange : Colors.white} width={svgSize} height={svgSize} stroke={Colors.orange} />
        </TouchableOpacity>
    )
}

export default BooleanButton