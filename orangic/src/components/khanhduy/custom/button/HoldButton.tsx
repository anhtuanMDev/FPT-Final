import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, buttons, svg } from '../style/cpt';
import { Add, Minus } from '../../../../assets/ics';

type Prop = {
    onPress?: () => void;
    onHold?: () => void;
    onRelease?: () => void;
    svg?: "Minus" | "Plus";
    style?: ViewStyle | ViewStyle[];
    svgSize?: number;
};

const HoldButton = (props: Prop) => {
    const { onPress, onHold, onRelease, svg, style } = props;

    const svgSize = props.svgSize ? props.svgSize : 20;

    const handlePress = () => {
        onPress && onPress();
    }

    const handleHold = () => {
        onHold && onHold();
    }

    const handleRelease = () => {
        onRelease && onRelease();
    }
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            style={[buttons.square_Cont, { borderRadius: 50, borderWidth: 2, borderColor: Colors.orange }, style]}
            onPress={handlePress}
            onLongPress={handleHold}
            onPressOut={handleRelease}
        >
            {
                svg === "Minus" ?
                    <Minus fill={Colors.orange} width={svgSize} height={svgSize} stroke={Colors.orange} />
                    :
                    svg === "Plus" ?
                        <Add fill={Colors.orange} width={svgSize} height={svgSize} stroke={Colors.orange} />
                        : null

            }
        </TouchableOpacity>
    )
}

export default HoldButton