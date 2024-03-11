import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import Avatar_btn from '../../../anhtuan/custom/buttons/Avatar_btn'
import { Colors, fonts } from '../style/cpt';
import { flexBox } from '../style/flexBox';


type Prop = {
  button?: any;
  avatar?: any;
  onPress?: () => void;
};

const NotificationCart = (props: Prop) => {
  const { onPress } = props;

  const handlePress = () => {
    onPress && onPress();
    console.log('NotificationCart handlePress');
  }
  return (
    <TouchableOpacity
      style={[{
        padding: 20,
        borderRadius: 10,
        marginBottom: 20,
        backgroundColor: Colors.white,
        // shadowColor: Colors.black,
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
      }]}
      onPress={handlePress}
    >
      <TouchableWithoutFeedback>
        <View style={[flexBox.rowFlexBox, flexBox.justifyContentSpaceBetween]}>
          <View style={[flexBox.rowFlexBox, { gap: 20 }]}>
            <Avatar_btn
              avatar={require('../../../../assets/imgs/jake.jpg')}
              button={{
                btnStyle: {
                  width: 38,
                  height: 38,
                  borderRadius: 50,
                  backgroundColor: 'red',
                },
                onPress: () => {
                  console.log('NotificationCart Avatar_btn');
                },
              }}
            />

            <Text style={[fonts.sublineBold]}>Jenifer Scarlet</Text>
          </View>

          <View style={[{ width: 8, height: 8, borderRadius: 500, backgroundColor: Colors.orange }]} />
        </View>
      </TouchableWithoutFeedback>

      <View style= {[{marginTop: 20}]}>
        <Text style={[fonts.text]}>12/12/2012</Text>
        <Text
          numberOfLines={4}
          style={[fonts.text, { marginTop: 10 }]}
        >
          Lorem ipsum dolor sit amet: Consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea...
        </Text>
      </View>

    </TouchableOpacity>
  )
}

export default NotificationCart