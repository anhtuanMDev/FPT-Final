import { View, Text, TextInput, ViewStyle, KeyboardTypeOptions, TouchableOpacity } from 'react-native'
import React from 'react'
import Send from '../../../../assets/ics/send.svg';
import FingerScan from '../../../../assets/ics/finger-scan.svg';
import { Colors, forms } from '../style/cpt';

type Props = {
    type?: "Text" | "Password" | "Email" | "Phone" | "Number";
    placeholder?: string | undefined;
    value?: string | undefined;
    style?: ViewStyle | ViewStyle[] | undefined;
    secureTextEntry?: boolean | undefined;
    keyboardType?: KeyboardTypeOptions | undefined;
    autoFocus?: boolean | undefined;
    editable?: boolean | undefined;

    svgRightIcon?: "Send" | "FingerScan" | undefined;
    onRightIconPress?: () => void;

    onChangeText?: (text: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

const TextInputCus = (props: Props) => {
    const { type, placeholder, value, style, secureTextEntry, keyboardType, autoFocus, editable, svgRightIcon, onRightIconPress, onChangeText, onFocus, onBlur } = props;

    const handleRightIconPress = () => {
        onRightIconPress && onRightIconPress();
    }

    const handleChangText = (text: string) => {
        onChangeText && onChangeText(text);
    }

    const handleFocus = () => {
        onFocus && onFocus();
    }

    const handleBlur = () => {
        onBlur && onBlur();
    }

    return (
        <View style={[forms.input_Cont, { position: "relative" }, style]}>
            <TextInput
                style={[{ padding: 0, marginRight: 40 }]}
                placeholder={placeholder ? placeholder : "Edit here"}
                value={value}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoFocus={autoFocus}
                editable={editable}
                onChangeText={handleChangText}
                onFocus={handleFocus}
                onBlur={handleBlur}
            >

            </TextInput>

            {
                svgRightIcon === "Send" ?
                    <TouchableOpacity
                        style={{ position: "absolute", right: 15 }}
                        onPress={() => {
                            handleRightIconPress();
                        }}
                    >

                        <Send
                            fill={Colors.black}
                            width={25}
                            height={25}
                        />
                    </TouchableOpacity> : null
            }
            {
                svgRightIcon === "FingerScan" ?
                    <TouchableOpacity
                        style={{ position: "absolute", right: 15 }}
                        onPress={() => {
                            handleRightIconPress();
                        }}
                    >

                        <FingerScan
                            fill={Colors.black}
                            width={25}
                            height={25}
                        />
                    </TouchableOpacity> : null

            }


        </View>
    )
}

export default TextInputCus