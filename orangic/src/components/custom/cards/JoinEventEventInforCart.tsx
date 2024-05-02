import { StyleSheet, View, Text, ViewStyle, ScrollView } from 'react-native'
import React from 'react'
import { fonts } from '../styles/ComponentStyle'
import { Colors } from '../styles/ScreenStyle'

type Prop = {
    style?: ViewStyle | ViewStyle[],

    title?: string,
    content?: string,
    code?: string,
    discount?: number,
    type?: string,
    amount?: number,
    start?: string,
    end?: string
}

const JoinEventEventInforCart = (props: Prop) => {
    const { style, title, content, code, discount, type, amount, start, end } = props;


    return (
        <View style={[style]}>
            <ScrollView
                style={[]}>
                <View
                    style={[{ marginVertical: 7, marginHorizontal: 5 }, styles.contentBox]}>
                    <Text
                        style={[fonts.textBold, { paddingVertical: 5 }]}>
                        Tiêu đề
                    </Text>
                    <Text
                        style={[fonts.text, { paddingStart: 20 }]}>
                        {title}
                    </Text>
                </View>

                <View
                    style={[{ marginVertical: 7, marginHorizontal: 5 }, styles.contentBox]}>
                    <Text
                        style={[fonts.textBold, { paddingVertical: 5 }]}>
                        Nội dung
                    </Text>
                    <Text
                        style={[fonts.text, { paddingStart: 20 }]}>
                        {content}
                    </Text>
                </View>

                <View>
                    <View
                        style={[{ marginVertical: 7, marginHorizontal: 5 }, styles.contentBox]}>
                        <Text
                            style={[fonts.textBold, { paddingVertical: 5 }]}>
                            Giảm giá
                        </Text>
                        <Text
                            style={[fonts.text, { paddingStart: 20 }]}>
                            {discount + "(%)"}
                        </Text>
                    </View>

                    <View
                        style={[{ marginVertical: 7, marginHorizontal: 5 }, styles.contentBox]}>
                        <Text
                            style={[fonts.textBold, { paddingVertical: 5 }]}>
                            Loại phiếu giảm giá
                        </Text>
                        <Text
                            style={[fonts.text, { paddingStart: 20 }]}>
                            {type}
                        </Text>
                    </View>
                    {
                        amount &&
                        (amount != 1 && amount >= 0) &&
                        <View
                            style={[{ marginVertical: 7, marginHorizontal: 5 }, styles.contentBox]}>
                            <Text
                                style={[fonts.textBold, { paddingVertical: 5 }]}>
                                Số lượng
                            </Text>
                            <Text
                                style={[fonts.text, { paddingStart: 20 }]}>
                                {amount}
                            </Text>
                        </View>
                    }

                </View>

                <View>
                    <View
                        style={[{ marginVertical: 7, marginHorizontal: 5 }, styles.contentBox]}>
                        <Text
                            style={[fonts.textBold, { paddingVertical: 5 }]}>
                            Bắt đầu
                        </Text>
                        <Text
                            style={[fonts.text, { paddingStart: 20 }]}>
                            {start}
                        </Text>
                    </View>

                    <View
                        style={[{ marginVertical: 7, marginHorizontal: 5 }, styles.contentBox]}>
                        <Text
                            style={[fonts.textBold, { paddingVertical: 5 }]}>
                            Kết thúc
                        </Text>
                        <Text
                            style={[fonts.text, { paddingStart: 20 }]}>
                            {end}
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </View>
    )
}

export default JoinEventEventInforCart

const styles = StyleSheet.create({
    contentBox: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: Colors.white,
        elevation: 3,
        shadowColor: Colors.slate,
        shadowRadius: 5,
        shadowOpacity: 1,
    }
})