import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React, { useState } from 'react'
import { Colors, buttons, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';

type Prop = {
    nameList?: string[];
    onItemPress?: (name: string) => void;
    style?: ViewStyle | ViewStyle[]; 
}

const HorizontalTypeButton = (props: Prop) => {

    const { nameList , style} = props;

    const [pressIndex, setPressIndex] = useState(0);

    const handleItemPress = (name: string) => {
        props.onItemPress && props.onItemPress(name);
        console.log("HorizontalTypeButton handleItemPress button: " + name);
    }

    return (
        <View style={[flexBox.rowFlexBox, flexBox.justifyContentFlexStart, flexBox.flexWrap, {gap: 10}, style]}>
            {
                nameList && nameList.map((value, index) => {
                    return (
                        <TouchableOpacity
                            key={index}
                            style={[index === pressIndex ? buttons.typeButton_ContActive : buttons.typeButton_Cont]}
                            onPress={() => {
                                handleItemPress(value);
                                setPressIndex(index);
                            }}
                        >
                            <Text style={[fonts.textBold, index === pressIndex ? { color: Colors.white } : { color: Colors.black }]}>
                                {value}
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    )
}

export default HorizontalTypeButton