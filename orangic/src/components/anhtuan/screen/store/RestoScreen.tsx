import { View, Text } from 'react-native'
import React from 'react'

interface apiGetResResponse {
    response: any;
    status: boolean;
    message: string;
    error?: string;
  }

const RestoScreen = () => {
  return (
    <View>
      <Text>RestoScreen</Text>
    </View>
  )
}

export default RestoScreen