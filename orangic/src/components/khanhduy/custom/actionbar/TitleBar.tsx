import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import Square_btn from '../../../anhtuan/custom/buttons/Square_btn';
import { flexBox } from '../style/flexBox';
import { fonts } from '../style/cpt';

type Prop = {
    title?: string;
    style?: ViewStyle | ViewStyle[];
    onLeftButtonPress?: () => void;
}

const TitleBar = (props: Prop) => {
    const { title, style } = props;
    const handleLeftButtonPress = () => {
        props.onLeftButtonPress && props.onLeftButtonPress()
    }

    return (
        <View style={[flexBox.rowFlexBox, flexBox.justifyContentSpaceBetween, { height: 50 }, style]}>

            <Text
                numberOfLines={1}
                style={[fonts.titleBold, { marginLeft: 55 }]}>
                {
                    title ? title : "Title"
                }
            </Text>

            <Square_btn
                svg="Back"
                color="black"
                button={{
                    btnStyle: {
                        position: "absolute",
                        left: 0,
                        borderRadius: 15,
                        zIndex: 1000
                    },
                    onPress: () => {
                        handleLeftButtonPress();
                        console.log("TitleBar Back Press");
                    }
                }}
            />
        </View>
    )
}

export default TitleBar