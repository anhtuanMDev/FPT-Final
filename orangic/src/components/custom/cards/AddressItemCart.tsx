import { View, Text, TouchableOpacity, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '../styles/ScreenStyle';
import { fonts } from '../styles/ComponentStyle';


type Prop = {
    style?: ViewStyle | ViewStyle[];
    address?: string;
    detail?: string;
    onPress?: () => void;
    // onDel?: () => void;
};

const AddressItemCart = (props: Prop) => {


    return (
        <TouchableOpacity
            onPress={() => {
                props?.onPress && props?.onPress();
            }}
            style={[
                {
                    width: '100%',
                    paddingLeft: 20,
                    paddingVertical: 10,
                    paddingRight: 5,
                    backgroundColor: Colors.white,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                },
                props?.style,
            ]}>
            <View style={{ flex: 1, justifyContent: 'space-between', height: 60, gap: 10 }}>
                <Text style={[fonts.sublineBold, {color: Colors.ember}]}>
                    {props?.address || 'Address'}
                </Text>
                <Text style={[fonts.subline, { flex: 1 }]}>
                    {props?.detail || "Address's detail"}
                </Text>
            </View>

        </TouchableOpacity>
    )
}

export default AddressItemCart