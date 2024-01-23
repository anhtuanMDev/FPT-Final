import {
  View,
  Text,
  PermissionsAndroid,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, fonts, forms} from '../style/cpt';
import Square_btn from '../buttons/Square_btn';

type Props = {
  uploadPress: () => void;
  imagePress: (path:string) => void;
  data?: any[];
}

const ImagePicker = (props: Props) => {

  const [img, setImg] = useState<any[]>(props?.data || []);

  const images = () =>
    img.map((imageUri: string, index: number) => (
      <TouchableOpacity
        key={index}
        activeOpacity={0.5}
        onPress={() => props.imagePress(imageUri)}>
        <Image
          source={{uri: imageUri}}
          style={{width: 34, height: 34, margin: 5, borderRadius: 5}}
        />
      </TouchableOpacity>
    ));

    useEffect(() => {
      setImg(props?.data || [])
    },[props?.data])

  return (
    <View style={[forms.imagePicker_Cont]}>
      <View style={{flexDirection: 'row', width: 'auto'}}>
        {img.length > 0 ? (
          images()
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
