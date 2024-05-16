import { View, Text, Modal, TouchableHighlight, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors } from '../styles/ScreenStyle';

type Prop = {
  title: string;
  content: string;
  onPress: (bool: boolean) => void;
  visible: boolean;
};

const AlertMessage = (props: Prop) => {
  const {title, content, onPress, visible} = props;

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
          <Text style={{textAlign: 'center'}}>{content}</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
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
              }}
              onPress={() => onPress(false)}
            >
              <Text style={{color: Colors.black}}>Được rồi</Text>
            </TouchableOpacity>

          </View>
        </View>
      </TouchableHighlight>
    </Modal>
  );
}

export default AlertMessage