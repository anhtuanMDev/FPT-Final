import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, fonts, forms} from '../style/cpt';
import Square_btn from '../buttons/Square_btn';

type Props = {
  uploadPress: () => void;
  imagePress: (path:string, index: number) => void;
  data: any[];
  style?: ViewStyle | ViewStyle[];
}

const ImagePicker = (props: Props) => {

  const images = (items: any[]) =>
    items.map((imageUri: string, index: number) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        onPress={() => props.imagePress(imageUri, index)}>
        <Image
          source={{uri: imageUri}}
          style={{width: 34, height: 34, margin: 5, borderRadius: 5}}
        />
      </TouchableOpacity>
    ));

  return (
    <View style={[forms.imagePicker_Cont, props?.style]}>
      <View style={{flexDirection: 'row', width: 'auto'}}>
        {props.data.length > 0 ? (
          images(props.data)
        ) : (
          <Text style={[fonts.button]}>Add Images</Text>
        )}
      </View>
      <Square_btn
        button={{
          btnStyle: {backgroundColor: Colors.orange},
          onPress: () => props?.uploadPress && props?.uploadPress(),
        }}
        svg="Upload"
        color={Colors.white}
      />
    </View>
  );
};

export default ImagePicker;
