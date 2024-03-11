import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import { Star } from '../../../../assets/ics';
import { assessmentLevels } from '../data/assessmentLevels.json';
import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';

type Prop = {
    point?: number;
    countReviews?: number;
    style?: ViewStyle | ViewStyle[];
}

const FiveStar = (props: Prop) => {
    const { point, style, countReviews } = props;
    const starSize = 24;

    const assessmentLevelsArr: string[] = assessmentLevels;

    const countStar = point ?
        point < 1 ? 0
            : point >= 5 ? 5
                : point >= 4 ? 4
                    : point >= 3 ? 3
                        : point >= 2 ? 2
                            : 1 : 0

    return (
        <View style={[flexBox.columnFlexBox]}>
            <Text style={[fonts.headlineBold]}>
                {
                    point ? point : 0
                }
            </Text>

            <View style={[flexBox.rowFlexBox, { gap: 0 }]}>
                {
                    assessmentLevelsArr.map((value, index) => {
                        const indexPoint = index + 1;
                        return (
                            <Star
                                key={index}
                                fill={countStar >= indexPoint ? Colors.yellow : Colors.white}
                                width={starSize}
                                height={starSize}
                                stroke={Colors.yellow}
                                strokeWidth={2} />
                        )

                    })

                }
            </View>

            <Text style={[fonts.text]}>
                {
                    `( ${countReviews ? countReviews : 0} Reviews )`
                }
            </Text>
        </View>
    )
}

export default FiveStar