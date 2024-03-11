import { View, Text } from 'react-native'
import React from 'react'
import TitleBar from '../custom/actionbar/TitleBar'
import { fonts } from '../custom/style/cpt'

const NotificationsDetails = () => {
    return (
        <View style={[{ paddingVertical: 10, paddingHorizontal: 20 }]}>
            <TitleBar
                title='alaallllllllllllllllllllllllllllllllllllllldddddddddddddd'
            />

            <View style={[{ marginVertical: 20 }]}>
                <Text style={[fonts.textBold]}>
                    {
                        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna quis libero viverra fringilla. Integer consectetur, velit vel volutpat luctus, magna velit faucibus mi, eu dapibus odio metus vel nunc. Curabitur rutrum dui a odio convallis, id ultrices nisl feugiat. Sed fermentum vitae velit in scelerisque. Fusce luctus justo vitae massa interdum, non ultricies risus fermentum. Nunc ut neque in felis ultricies congue. Morbi eget dui quis odio lacinia finibus id ut quam. Nulla facilisi. Suspendisse vitae velit eget metus ullamcorper fringilla. Suspendisse potenti. Fusce et leo vitae elit ultrices aliquam.

                        Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus hendrerit velit eget urna consequat, vitae pharetra risus aliquam. Nullam vestibulum, eros in lacinia fermentum, elit est suscipit est, vel rutrum odio sapien nec felis. Ut consequat urna ut felis fermentum hendrerit. Integer eget efficitur lorem. Ut sollicitudin vitae sapien sit amet vehicula. Mauris fringilla varius magna sit amet tempus. Sed vel mi at nisi tempor sollicitudin. Donec auctor, nisl ut facilisis ultricies, velit nisl varius libero, a feugiat dolor ante et eros. Sed hendrerit, est in rutrum ultricies, risus ligula eleifend metus, a commodo libero odio ac ligula. Vivamus finibus nulla non nisi consectetur, vel faucibus purus tempus. Integer ultrices pharetra risus, id iaculis leo hendrerit ac. Quisque in sodales risus.
                        
                        Sed tincidunt, ipsum in efficitur dictum, libero eros hendrerit urna, ac pharetra risus dui eu tortor. Vivamus in quam vel ligula ultricies interdum. Nam nec mi quis metus faucibus tincidunt. Integer hendrerit dictum sapien, nec consequat eros malesuada sed. Sed sit amet maximus elit. Integer sed justo vehicula, efficitur elit nec, tempor elit. Integer euismod arcu at ultrices gravida. Vivamus vestibulum enim nec erat dapibus, sit amet fringilla eros hendrerit. Ut rhoncus, ipsum in fermentum accumsan, lorem ipsum posuere turpis, eget dapibus enim quam et libero. Nulla pharetra condimentum eros, sit amet ultricies urna convallis sit amet. Vivamus aliquet vel odio vitae bibendum. Sed vitae neque vitae purus suscipit tristique. Nam at ligula ut nunc fermentum vulputate eget eu justo. Sed eget magna sed neque rutrum pulvinar. Vivamus id erat felis.`
                    }
                </Text>
            </View>
        </View>
    )
}

export default NotificationsDetails