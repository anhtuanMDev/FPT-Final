import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import { ViewStyle } from 'react-native';
import { Dimensions } from 'react-native';
import { Colors } from '../styles/ScreenStyle';
import { Image } from 'react-native';

import Icons, { IconName } from '../../../assets/icons/Icons';
import Icons2, { Icon2Name } from '../../../assets/icons/Icons2';
import { cards, fonts } from '../styles/ComponentStyle';
import { selectHost } from '../../../helpers/state/Global/globalSlice';
import { useSelector } from 'react-redux';

type Prop = {
    style?: ViewStyle | ViewStyle[];
    name?: string;
    time?: string;
    image?: string;
    rate?: number;
    rateCount?: number;
    price?: number;
    isJoin?: boolean;
    allowsChangingStatus? : boolean;
    onIsJoinChange?: (bool: boolean) => void;
    onPress?: () => void;
    onLongPress?: () => void;
}

const width = Dimensions.get('window').width * 0.38;
const height = Dimensions.get('window').height * 0.25;

const JoinEventFoodCart = (props: Prop) => {
    const { style, name, time, image, rate, rateCount, price, isJoin, onIsJoinChange, onPress, onLongPress, allowsChangingStatus } = props;
    const host = useSelector(selectHost);
    const handleIsJoinChange = () => {
        onIsJoinChange && onIsJoinChange(!isJoin)
    }

    return (
        <View>
            <TouchableOpacity
                disabled={!allowsChangingStatus}
                onPress={() => {
                    onPress && onPress();
                    handleIsJoinChange();
                }}
                style={[
                    {
                        width,
                        height,
                        borderRadius: width / 10,
                        backgroundColor: Colors.white,
                        elevation: 5,
                        overflow: 'hidden',
                    },
                    style,
                ]}>
                <Image
                    source={
                        image ? { uri: `${host}/uploads/${image}.jpg` } : require('../../../assets/images/baseImage.png')
                    }
                    style={{ width: '100%', height: '60%' }}
                />
                <TouchableWithoutFeedback>
                    <TouchableOpacity
                        disabled={!allowsChangingStatus}
                        style={{
                            width: 30,
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25,
                            elevation: 5,
                            position: 'absolute',
                            backgroundColor: Colors.white,
                            top: 10,
                            right: 10,
                            zIndex: 1,
                        }}
                        onPress={handleIsJoinChange}>
                        {isJoin ? (
                            <Icons2 name={Icon2Name.check} color={Colors.orange} size={18} />
                        ) : (
                            <View></View>
                        )}
                    </TouchableOpacity>
                </TouchableWithoutFeedback>

                <View style={[cards.small_NameCont]}>
                    <Text style={fonts.sublineBold}>{name || 'HomeCardSmall'}</Text>
                    <Text style={[fonts.subline, { color: Colors.orange, marginVertical: 5 }]}>
                        {price || '0'}đ
                    </Text>
                    {/* <View
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                        <Icons name={IconName.order} color={Colors.orange} size={16} />
                        <Text
                            style={[
                                fonts.text,
                                { marginLeft: 5, flex: 1, textAlignVertical: 'center' },
                            ]}>
                            {time || '10 - 15 mins'}
                        </Text>
                    </View> */}
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default JoinEventFoodCart