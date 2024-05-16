import { View, Text, ViewStyle, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { fonts } from '../styles/ComponentStyle';
import { Colors } from '../styles/ScreenStyle';
import Icons, { IconName } from '../../../assets/icons/Icons';

type Prop = {
    style?: ViewStyle | ViewStyle[];
    iconSize?: number;
    code?: string;
    discount?: number;
    startDate?: string;
    endDate?: string;

    disabled?: boolean;
    onPress?: () => void;
}

const CouponUserCart = (props: Prop) => {
    const { style, iconSize, code, discount, startDate, endDate, disabled, onPress } = props;

    const IconSize = iconSize ? iconSize : 30;

    const getExpired = (endDate: string) => {
        try {
            return new Date(endDate as string).getTime() - new Date().getTime();
        } catch (error) {
            return -1;
        }
    }

    const changeExpired = (expired: number) => {
        try {
            let day = Math.floor(expired / (1000 * 60 * 60 * 24));
            let hour = Math.floor((expired % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minute = Math.floor((expired % (1000 * 60 * 60)) / (1000 * 60));
            let second = Math.floor((expired % (1000 * 60)) / 1000);
            let returnString = '';
            if (day > 0) {
                returnString += day + ' ngày ';
            }
            if (hour > 0) {
                returnString += hour.toString().padStart(2, '0') + ':';
            }

            if (minute > 0) {
                returnString += minute.toString().padStart(2, '0') + ':';
            }

            if (second > 0) {
                returnString += second.toString().padStart(2, '0');
            } else {
                returnString += '00';
            }

            return returnString;
        } catch (error) {
            return '';
        }
    }

    const [expiredTime, setExpiredTime] = useState(changeExpired(getExpired(endDate as string)));

    // var countDown: NodeJS.Timeout;

    // useEffect(() => {
    //     countDown = setInterval(() => {
    //         setExpiredTime(changeExpired(getExpired(endDate as string)));
    //     }, 1000);
    // }, []);


    // useEffect(() => {
    //     if (getExpired(endDate as string) < 0 || expiredTime === '') {
    //         clearInterval(countDown);
    //     }
    // }, [expiredTime]);

    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[{
                flexDirection: 'row',
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: 'center',
                gap: 5
            }, style]}>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                    position: 'relative'
                }}>
                <Icons name={IconName.tag} size={IconSize} color={Colors.orange} />
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10,
                        position: 'absolute',
                        left: 0, right: 0,
                        top: 0, bottom: 0,
                        justifyContent: 'center',
                    }}>
                    <Icons name={IconName.percent} size={IconSize / 5 * 2} color={Colors.white} />
                </View>
            </View>

            <View style={[{ gap: 10, paddingHorizontal: 10, }]}>
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            gap: 10
                        }}>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                width: "45%"
                            }}>
                            <Text style={[fonts.sublineBold, { color: Colors.slate }]}>Mã: </Text>
                            <Text style={[fonts.sublineBold]}> {code}</Text>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: "space-between",
                                width: "45%"
                            }}>
                            <Text style={[fonts.sublineBold, { color: Colors.slate }]}>Giảm giá: </Text>
                            <Text style={[fonts.sublineBold]}> {discount}%</Text>
                        </View>
                    </View>
                </View>

                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: "space-between",
                    }}>
                    <Text style={[fonts.sublineBold, { color: Colors.orange }]}>Hết hạn: </Text>
                    <Text style={[fonts.subline]}> {expiredTime}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CouponUserCart