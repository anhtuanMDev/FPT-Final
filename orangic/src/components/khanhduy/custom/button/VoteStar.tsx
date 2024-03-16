import { TouchableOpacity, Text, View, ViewStyle } from 'react-native'
import React, { useState } from 'react'

import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';
import { assessmentLevels } from '../data/assessmentLevels.json';
import Star from '../../../../assets/ics/star.svg';

type Prop = {
    onPress?: (point: number) => void;
    style?: ViewStyle | ViewStyle[];
    startStyle?: ViewStyle | ViewStyle[];
    btnStyle?: ViewStyle | ViewStyle[];
    disabled?: boolean;
    permission?: boolean;
    type?: "Dish" | "Restaurant";

};

// onPress?: (point: number) => void; trả về số sao khi click
const VoteStar = (props: Prop) => {
    const { style, startStyle, btnStyle, disabled, permission, type } = props;

    const [point, setPoint] = useState(0);
    const [permissionTemp, setPermissionTemp] = useState(permission ? permission : false);

    const starSize = 45;

    const assessmentLevelsArr: string[] = assessmentLevels;

    const handlePress = (point: number) => {
        setPoint(point);
        props.onPress && props.onPress(point);
    }

    return (
        <View >
            {
                permissionTemp ?
                    <View style={[style, { gap: 8 }]}>
                        <Text style={[fonts.title, { textAlign: "center", color: Colors.orange }]} >
                            {
                                point ? point > 0 ?
                                    assessmentLevels[point - 1] : "No rating"
                                    : "No rating"

                            }
                        </Text >
                        <View style={[flexBox.rowFlexBox, flexBox.alignItemsCenter, flexBox.justifyContentCenter]}>
                            {
                                assessmentLevelsArr.map((value, index) => {
                                    const indexPoint = index + 1;
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.5}
                                            style={[btnStyle]}
                                            onPress={() => {
                                                handlePress(indexPoint);
                                            }}>

                                            <Star
                                                fill={point >= indexPoint ? Colors.yellow : Colors.white}
                                                width={starSize}
                                                height={starSize}
                                                stroke={Colors.yellow}
                                                style={startStyle} />

                                        </TouchableOpacity>)
                                }

                                )
                            }

                        </View>

                    </View>
                    :

                    <View style={[ { gap: 8, paddingHorizontal: 10, height: 50 , backgroundColor: Colors.slate}, flexBox.rowFlexBox, flexBox.justifyContentFlexStart, style]}>
                        <Text style={[fonts.subline, { color: Colors.navy}]}>
                            {
                                type === "Dish" ? "You haven’t rate this dish" :
                                    type === "Restaurant" ? "You haven’t rate this restaurant" :
                                        "You haven’t rate this"
                            }
                        </Text>
                    </View>
            }

        </View >

    )
}

export default VoteStar

