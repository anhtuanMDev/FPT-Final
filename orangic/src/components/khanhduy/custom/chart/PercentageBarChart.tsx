import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';

type Prop = {
    value?: number;
    total?: number;
    title?: string;
    style?: ViewStyle | ViewStyle[];
}

const PercentageBarChart = (props: Prop) => {
    const { value, total, style, title } = props;

    const percent = total ?
        total > 0 ?
            (value && value > 0) ? (value / total * 100) : 0
            : 100 : 100;

    return (
        <View style={[ flexBox.rowFlexBox, style]}>
            {
                title &&
                <Text style={[fonts.textBold, {width: "6%"}]}>
                    {
                        title
                    }
                </Text>
            }


            <View style={[{ position: "relative" ,  width: "94%", marginTop: 1}]}>
                <View style={{ height: 6, borderRadius: 10, backgroundColor: Colors.slate, opacity: 0.4, width: "100%" }} />
                <View style={[{ height: 6, borderRadius: 10, backgroundColor: Colors.orange, width: `${percent || 0}%` },
                { position: "absolute" }]} />
            </View>
        </View>
    )
}

export default PercentageBarChart