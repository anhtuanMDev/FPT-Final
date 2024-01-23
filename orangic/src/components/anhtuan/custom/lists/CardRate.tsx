import { View, Text, ViewStyle } from 'react-native'
import React from 'react'
import { Colors, fonts, lists } from '../style/cpt'
import Star from '../../../../assets/ics/star.svg'


type Prop = {
    rate?: number
    rateCount?: number
    style?: ViewStyle | ViewStyle[]
} 

const CardRate = (props: Prop) => {
  return (
    <View style={[lists.cardRate_Cont,props?.style]}>
        <Text style={[fonts.text]}>{props?.rate || "0"}</Text>
        <Star fill={Colors.yellow} width={12} height={12}/>
        <Text style={[fonts.text,{color: Colors.slate}]}>{props?.rateCount || "0"}</Text>
    </View>
  )
}

export default CardRate