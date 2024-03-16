import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInputCus from '../../custom/input/TextInputCus';
import RectangularButton from '../../custom/button/RectangularButton';
import { Colors, fonts } from '../../custom/style/cpt';

type Prop = {
}

const ForgotPasswordUpdatePassword = (props: Prop) => {
    const { } = props;
    const title = "Confirm Owner";
    const subTitle = "Great, it is you. \nNow let create new password before you forget it.";

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleConfirm = () => {
        console.log("ForgotPasswordUpdatePassword handleConfirm");
    }

    return (
        <View style={[{padding: 20}]}>
            <View>
                <Text
                    style={[fonts.headlineBold, {width: 200}]}
                >
                    {title}
                </Text>
                <Text
                    style={[fonts.subline, {color: Colors.slate, width: 400, marginTop: 10}]}
                >
                    {subTitle}
                </Text>
            </View>

            <TextInputCus
                style={{marginTop: 30}}
                placeholder="Password"
                svgRightIcon='FingerScan'
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TextInputCus
                style={{marginTop: 20}}
                placeholder="Confirm Password"
                svgRightIcon='FingerScan'
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
            />

            <RectangularButton
                style={{marginTop: 20}}
                title="Confirm"
                onPress={() => {
                    handleConfirm();
                }}
            />

        </View>
    )
}

export default ForgotPasswordUpdatePassword