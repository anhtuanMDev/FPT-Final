import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import PercentageBarChart from '../chart/PercentageBarChart'
import FiveStar from '../chart/FiveStar'
import { flexBox } from '../style/flexBox'
import { assessmentLevels } from '../data/assessmentLevels.json';
import { Colors } from '../style/cpt'

type Prop = {
    point?: number;
    countReviews?: number;
    countReviewsArray?: number[];
    style?: ViewStyle | ViewStyle[];
}

const ReviewInformation = (props: Prop) => {

    const { point, countReviews, countReviewsArray, style } = props;

    const assessmentLevelsArr: string[] = assessmentLevels;

    return (
        <View style={[flexBox.rowFlexBox, flexBox.justifyContentSpaceBetween, style]}>
            <View style={[{ width: "40%", paddingEnd: "5%" }]}>
                <FiveStar
                    point={point}
                    countReviews={countReviews} />
            </View>


            <View style={[{ width: "60%", borderLeftColor: Colors.slate, borderLeftWidth: 1, paddingStart: "5%" }]}>

                {
                    assessmentLevelsArr.map((value, index, array) => {
                        const indexPoint = index + 1;
                        return (
                            <PercentageBarChart
                                key={index}
                                value={countReviewsArray ? countReviewsArray[array.length - indexPoint] ? countReviewsArray[array.length - indexPoint] : 0 : 0}
                                total={countReviews}
                                title={`${array.length - index}`}
                            />
                        )

                    })

                }

            </View>


        </View>
    )
}

export default ReviewInformation