import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInputCus from '../../custom/input/TextInputCus';
import RectangularButton from '../../custom/button/RectangularButton';
import { Colors, fonts } from '../../custom/style/cpt';

type Prop = {
}

const ForgotPassword = (props: Prop) => {
    const { } = props;
    const title = "Forgot Password";
    const subTitle = "Enter your email address \nand we will send you a reset instructions.";

    const [email, setEmail] = useState('');
    const [emailConfirmCode, setEmailConfirmCode] = useState('');

    const handleConfirm = () => {
        console.log("ForgotPassword handleConfirm");
    }

    return (
        <View style={[{padding: 20, backgroundColor: Colors.white, height: "100%"}]}>
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
                placeholder="Email"
                svgRightIcon='Send'
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInputCus
                style={{marginTop: 20}}
                placeholder="Email Confirm Code"
                svgRightIcon='FingerScan'
                value={emailConfirmCode}
                onChangeText={text => setEmailConfirmCode(text)}
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

export default ForgotPassword