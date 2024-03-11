import { View, Text } from 'react-native'
import React from 'react'
import TitleBar from '../custom/actionbar/TitleBar'
import NotificationsList from '../custom/list/NotificationsList'
import HorizontalTypeButton from '../custom/button/HorizontalTypeButton'
import { nameTypeNotifications } from '../custom/data/nameTypeNotifications.json';

const Notifications = () => {
    return (
        <View style={[{ paddingVertical: 10, paddingHorizontal: 20 }]}>
            <TitleBar
                title='Notfications'
            />
            <HorizontalTypeButton
                nameList={nameTypeNotifications}
                onItemPress={() => console.log("Notification HorizontalTypeButton onItemPress")}
                style={[{marginVertical: 20}]}
            />


            <NotificationsList />

        </View>
    )
}

export default Notifications