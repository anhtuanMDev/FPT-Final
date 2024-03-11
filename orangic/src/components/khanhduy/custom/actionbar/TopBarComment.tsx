import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Avatar_btn from '../../../anhtuan/custom/buttons/Avatar_btn'
import { More } from '../../../../assets/ics'
import { fonts } from '../style/cpt'
import { flexBox } from '../style/flexBox'

type Prop = {
    name?: string;
    rank?: string;
    date?: string;
    point?: number;
}

const TopBarComment = (props: Prop) => {

    const { name, rank, date, point } = props;

    return (
        <View style={[flexBox.rowFlexBox, flexBox.justifyContentSpaceBetween]}>
            <View style={[flexBox.rowFlexBox, { gap: 15 }]}>
                <Avatar_btn />
                <View>
                    <Text style={[fonts.sublineBold]}>
                        {
                            name ? name : "Name"
                        }
                    </Text>
                    <Text style={[fonts.subline]}>
                        {
                            `Rank: ${rank ? rank : "Silver"}`
                        }
                    </Text>
                </View>

            </View>

            <View style={[flexBox.rowFlexBox, { gap: 15 }]}>
                <Text style={[fonts.text]}>
                    {
                        date ? date :"12/12/2012"
                    }
                </Text>

                <Text style={[fonts.textBold]}>
                    {
                        point ? point :"3.5"
                    }
                </Text>
            </View>

            <TouchableOpacity>
                <More width={28} height={28} />
            </TouchableOpacity>
        </View>
    )
}

export default TopBarComment