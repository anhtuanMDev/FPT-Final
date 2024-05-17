import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../styles/ScreenStyle';

type Prop = {
  title: string;
  input: string;
  onChange: (text: string) => void;
  onPress: (bool: boolean) => void;
  onConfirm: () => void;
  visible: boolean;
};

const AlertConfirm = (props: Prop) => {
  const {title, input, onChange, onPress, visible, onConfirm} = props;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      // onRequestClose={(bool: boolean) => onPress()}
    >
      <TouchableHighlight
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        activeOpacity={1}
        underlayColor={'rgba(0, 0, 0, 0.5)'}
        onPress={() => onPress(false)}>
        <View
          style={{
            backgroundColor: 'white',
            paddingVertical: 20,
            paddingHorizontal: 30,
            marginHorizontal: 20,
            alignItems: 'center',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              textAlign: 'center',
              borderBottomColor: Colors.slate,
              borderBottomWidth: 1,
              paddingBottom: 10,
              marginBottom: 15,
            }}>
            {title}
          </Text>
          {/* <Text style={{textAlign: 'center'}}>{content}</Text> */}
          <TextInput 
            value={input}
            onChangeText={onChange}
            style={{
              textAlign: 'center',
              marginBottom: 15
            }}/>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginTop: 25,
              marginBottom: 10,
            }}>
            <TouchableOpacity
              style={{
                borderColor: 'blue',
                borderWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginRight: 30
              }}
              onPress={() => onPress(false)}
            >
              <Text style={{color: Colors.black}}>Không</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                backgroundColor: Colors.orange,
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 5,
                marginLeft: 30
              }}
              onPress={() => onConfirm()}
            >
              <Text style={{color: 'white'}}>Có</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    </Modal>
  );
};

export default AlertConfirm;
