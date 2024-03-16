import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TextInputCus from '../../custom/input/TextInputCus';
import RectangularButton from '../../custom/button/RectangularButton';
import { Colors, fonts } from '../../custom/style/cpt';
import { flexBox } from '../../custom/style/flexBox';

type Prop = {
}

const ForgotPasswordDone = (props: Prop) => {
    const { } = props;
    const title = "Congratulation";
    const subTitle = "Your new Password is ready !\nLet’s go !!";

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNavigate = () => {
        console.log("ForgotPasswordDone handleNavigate");
    }

    return (
        <View style={[{ padding: 20 }, flexBox.columnFlexBox, {height: "100%"}]}>
            <View>
                <Text
                    style={[fonts.headlineBold, { textAlign: "center" }]}
                >
                    {title}
                </Text>
                <Text
                    style={[fonts.subline, { color: Colors.slate, textAlign: "center", marginTop: 10 }]}
                >
                    {subTitle}
                </Text>
            </View>

            <RectangularButton
                style={{ marginTop: 20 }}
                title="Login Now"
                onPress={() => {
                    handleNavigate
                }}
            />

        </View>
    )
}

export default ForgotPasswordDone