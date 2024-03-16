import { View, Text, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import HoldButton from '../button/HoldButton';
import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';

type Prop = {
    price?: number;
    style?: ViewStyle | ViewStyle[];
    quantity?: number;
    onChange?: (value: number) => void;
};

const EnterItemQuantity = (props: Prop) => {
    const { price, style } = props;
    const [quantity, setQuantity] = useState(props.quantity ? props.quantity : 1);

    const handleOnChange = (value: number) => {
        if (value < 1) {
            value = 1;
        }
        setQuantity(value);
        props.onChange && props.onChange(value);
    }

    return (
        <View style={[flexBox.rowFlexBox, flexBox.justifyContentSpaceBetween, style]}>
            <Text style={[fonts.sublineBold, { color: Colors.green }]}>
                {price + " $"}
            </Text>
            <View style={[flexBox.rowFlexBox, { gap: 10 }]}>
                < HoldButton

                    svg="Minus"
                    onPress={() => handleOnChange(quantity - 1)}
                    onHold={() => handleOnChange(quantity - 1)}
                // onRelease={() => handleOnChange(quantity - 1)}
                />

                <Text style={[fonts.subline]}>{quantity}</Text>

                <HoldButton
                    svg="Plus"
                    onPress={() => handleOnChange(quantity + 1)}
                    onHold={() => handleOnChange(quantity + 1)}
                // onRelease={() => handleOnChange(quantity + 1)}
                />


            </View>
        </View>
    )
}

export default EnterItemQuantity