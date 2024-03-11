import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import TopBarComment from '../actionbar/TopBarComment'
import { Colors, fonts } from '../style/cpt'

type Prop = {
    style?: ViewStyle | ViewStyle[];
}

const CommentCart = (props: Prop) => {
    const { style } = props;

    return (
        <View style={[{ display: "flex", paddingVertical: 5, elevation: 5, backgroundColor: Colors.white }, style]}>
            <TopBarComment />

            <View style={[{ gap: 7, marginLeft: 45, marginTop: 10 }]}>
                <Text style={[fonts.textBold]}>
                    Hamburger
                </Text>

                <Text style={[fonts.text]}>
                    {
                        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`
                    }
                </Text>
            </View>
        </View>
    )
}

export default CommentCart