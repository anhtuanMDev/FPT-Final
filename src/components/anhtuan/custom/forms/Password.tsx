import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, fonts} from '../style/cpt';
import Square_btn from '../buttons/Square_btn';


type Prop = {
    onChangeText: (s:string) => void,
    placeholder: string,
    value?: string
}
const Password = (props: Prop) => {
  const [show, setShow] = useState(true);
  const [value, setValue] = useState('');
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingLeft: 10,
        alignItems: 'center',
        paddingRight: 20,
        borderWidth: 1,
        borderRadius: 15,
        borderColor: Colors.black
      }}>
      <TextInput
        style={[fonts.text, {flex: 1}]}
        value={props?.value || value}
        placeholder={props?.placeholder || "Your Placeholder"}
        onChangeText={(text)=>{
            setValue(text)
            props?.onChangeText(text)
        }}
        secureTextEntry={show}
      />
      <Square_btn
        svg={!show ? "EyeOpen" : "EyeClose"}
        button={{
          btnStyle: {
            borderWidth: 0,
          },
          onPress: () => {
            setShow(!show);
          },
        }}
      />
    </View>
  );
};

export default Password;
