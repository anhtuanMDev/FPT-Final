import {
    Text,
    ColorValue,
    ViewStyle,
    TouchableOpacity,
    Image,
  } from 'react-native';
  import React from 'react';
  import { components, font, Colors  } from './Styles'; 
  import Key from '../../../assets/ics/key.svg'
  type Props = {
    color?: ColorValue;
    title?: string;
    onPress?: () => void;
    style?: ViewStyle | ViewStyle[]; 
  };
  
  const Button = (prop: Props) => {
    return (
      <TouchableOpacity
        style={[
          components.center,
          components.b1,
          prop.style,
        ]}
        onPress={() => prop.onPress && prop.onPress()}
        activeOpacity={0.6}>
        {/* <Image
          style={{
            tintColor: prop?.tint || Colors.active,
            display: prop.showIcon ? 'flex' : 'none',
            marginRight: 8,
            
          }}
          source={prop.icon || require('../assets/icon/key.png')}
        /> */}
        <Text style={[font.button, {color: prop.color || 'white'}]}>
          {prop.title || 'Button'}
        </Text>
      </TouchableOpacity>
    );
  };
  
  export default Button;
  