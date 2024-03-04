import {View, Text, PermissionsAndroid, Alert, Button} from 'react-native';
import React, {useState} from 'react';
import ImagePicker from './ImagePicker';
import {ImageLibraryOptions, ImagePickerResponse, launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AxiosInstance from '../../../../helper/AxiosInstance';
import { isPending } from '@reduxjs/toolkit';

const Test = () => {
  type ImageUpload = {
    error: string;
    message: string;
    path: string;
  };

  const [img, setImg] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<null | string>(null);
  const [imageInput, setImageInput] = useState('');

  const generateID = (length: number = 20) => {
    let result = 'IMG';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length - 3; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  // upload ảnh
  const handleImage = async (imagePath: string) => {
    // setImageInput(imagePath);
    // setPreviewImage(imagePath); // Use imagePath directly for preview
    const formData = new FormData();
    formData.append('image', {
      uri: img[0],
      name: `${generateID()}.jpg`,
      type: 'image/jpg',
    });
    const result: ImageUpload = await AxiosInstance('multipart/form-data').post(
      '/upload-file.php',
      formData,
    );
    console.log(result.path);
  };

  const insertImageDB = async (imgID: string, ownerID: string ) => {
    const data = {
      id: imgID,
      ownerID: ownerID
    }
    const result: any = await AxiosInstance().post('/insert-image.php', data);
    console.log(result);
  }

  const handleManyImage = async (imagePath: string[], id: string) => {
    const formData = new FormData();
    if(imagePath.length == 0) {
      Alert.alert('Alert', 'Please select image');
      return;
    }
    for (let i = 0; i < imagePath.length; i++) {
      const identify = generateID();
      formData.append('image', {
        uri: imagePath[i],
        name: `${identify}.jpg`,
        type: 'image/jpg',
      });
      const result: ImageUpload = await AxiosInstance(
        'multipart/form-data',
      ).post('/upload-file.php', formData);
      insertImageDB(identify, id)


      console.log(result.path);
    }
  };

  const requestCameraPermission = async () => {
    try {
      if (img.length == 5) {
        // How to cancel image picker
        Alert.alert('Alert', 'You can only upload 5 images');
        return;
      }

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        const result: any = await launchCamera({
          mediaType: 'photo',
          cameraType: 'front',
        });

        if(result.didCancel) {
          console.log("User cancelled image picker");
        }

        // Kiểm tra nếu `result` không phải null và `result.assets` có ít nhất một phần tử
        if (result && result.assets && result.assets.length > 0) {
          setImg([...img ,result.assets[0].uri]);
        }
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestLibaryPermission = async () => {
    if(img.length == 5) {
      Alert.alert('Alert', 'You can only upload 5 images');
      return;
    }
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      selectionLimit: 5 - img.length,
    };
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Libary permission given');
        const result: any = launchImageLibrary(
          options,
          (response: ImagePickerResponse) => {
            if (response.didCancel || response.errorCode) {
              return;
            }
            // Process the selected images
            if (response && response.assets && response.assets.length > 0) {
              const uris: any[] = response.assets.map(asset => asset.uri);
              setImg([...img, ...uris]);
            }
          },
        );
      } else {
        // console.log('Libary permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  return (
    <View>
      <ImagePicker
        imagePress={(item: string, index: number) => {
          const contain: string[] = img;
          setImg(contain.filter((_, i) => i !== index));
        }}
        uploadPress={() => {
          requestCameraPermission();
        }}
        data={img}
      />
      <Button
        title="Send"
        onPress={() => {
          handleManyImage(img, "dfgfd");
          console.log("send")
        }}
      />
    </View>
  );
};

export default Test;
