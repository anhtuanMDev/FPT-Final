This is Anh Tuan Readme

1. Link:

   - svg - npm i react-native-svg-transformer
   - redux - npm i redux
   - reduxjs/toolkit -  npm i @reduxjs/toolkit
   - redux thunk - npm i redux-thunk
   - react redux - npm i react-redux
   - image picker - npm i react-native-image-picker
   - reanimated - npm i react-native-reanimated
   - boostrap (website) - npm install bootstrap
   - reactSVG (website) - npm install bootstrap
   - website external library - npm install quill tinymce simple-datatables echarts
   - apexChart (website) - npm install apexcharts
   - element dropdown - npm i react-native-element-dropdown
   - bottom sheet - npm i @gorhom/bottom-sheet
   - gesture handle - npm i react-native-gesture-handler
   - native stack - npm install @react-navigation/native-stack
   - stack - npm i @react-navigation/stack
   - react native screen - npm install react-native-screens
   - safe area context - npm i react-native-safe-area-context
   - native navigation - npm i @react-navigation/native
   - progress bar - npm i react-native-progress
   - sweet alert (website) - npm install sweetalert2
   - FIX webpack <v5 - npm install node-polyfill-webpack-plugin --save-dev



2. Special Notes:

   - svg :
     -> Changing metro.config.js

     ```js
        const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

        const defaultConfig = getDefaultConfig(\_\_dirname);
        const { assetExts, sourceExts } = defaultConfig.resolver;

        /\*\*

        - Metro configuration
        - https://facebook.github.io/metro/docs/configuration
        -
        - @type {import('metro-config').MetroConfig}
          \*/
          const config = {
          transformer: {
          babelTransformerPath: require.resolve("react-native-svg-transformer")
          },
          resolver: {
          assetExts: assetExts.filter((ext) => ext !== "svg"),
          sourceExts: [...sourceExts, "svg"]
          }
          };

        module.exports = mergeConfig(defaultConfig, config);
     ```

     -> create declarations.d.ts

     ```js
        declare module "*.svg" {
        import React from "react";
        import { SvgProps } from "react-native-svg";
        const content: React.FC<SvgProps>;
        export default content;
        }
     ```

     -> install svg libary

     ```sh
         npm install react-native-svg
     ```

     -> create file .svgrrc

     ```js
        {
        "replaceAttrValues": {
            "black": "{props.fill}"
          }
        }
     ```

  - image picker:
    -> Change android/app/src/debug/AndroidManifest.xml

    ```js
          <?xml version="1.0" encoding="utf-8"?>
          <manifest xmlns:android="http://schemas.android.com/apk/res/android"
          xmlns:tools="http://schemas.android.com/tools">
    
            <uses-permission android:name="android.permission.CAMERA"/>
            <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>

            <application
            android:usesCleartextTraffic="true"
            tools:targetApi="28"
            tools:ignore="GoogleAppIndexingWarning"/>
          </manifest>

    ```

    -> Create a function to open camera:

    ```js
          const requestCameraPermission = async () => {
            try {
              const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                const result:any = await launchCamera({mediaType:'photo',cameraType:'front'})
                setImg(result.assets[0].uri);
              } else {
                console.log("Camera permission denied");
              }
            } catch (err) {
              console.warn(err);
            }
          };
    ```

   - how to use square_btn cpt:

   ```js
   <Titlebar
     svgLeft="Like"
     left={{
       btnStyle: {
         backgroundColor: "white",
         borderWidth: 0,
       },
       onPress: () => console.log("Left button pressed"),
     }}
     right={{
       btnStyle: {
         backgroundColor: "blue",
       },
       onPress: () => console.log("Right button pressed"),
     }}
   />
   ```

  - reanimated:
    -> Change babel.config.js:

    ```js
      module.exports = {
        presets: ['module:@react-native/babel-preset'],
        plugins: [
        'react-native-reanimated/plugin',
      ],};
    ```

    -> Reset Cache:

    ```sh
      npm start -- --reset-cache
    ```

  - FIX webpack breaking change

  ```sh
      Install npm install node-polyfill-webpack-plugin --save-dev rồi chỉnh sửa file webpack.config.js
      webpack.config.js nằm trong đường dẫn orangic-website > node_modules > react-scripts > config > webpack.config.js 
      Thêm const NodePolyfillPlugin = require("node-polyfill-webpack-plugin"); vào webpack.config.js
      Thêm new NodePolyfillPlugin(), vào plugin
  ```
  ```js
      modul.export{
        resolve: {
          /// Other code here
          plugin: [
                  new NodePolyfillPlugin(),
          ]
        }
      }
  ```
  ```sh
      Nếu còn lỗi fs thì thêm fallback vào resole
  ```
  ```js
      modul.export{
        resolve: {
          /// Other code here
          fallback: {
            "fs": false,
          },
        }
      }
  ```


3. Feature Process:

```sh
   Tạo nhà hàng -                      Đã xong
   Tìm kiếm -                          Đang làm
   Cập nhật thông tin nhà hàng -       Đang làm
   Xóa nhà hàng -                      Đang làm
   Thêm món ăn -                       Đang làm
   Cập nhật món ăn -                   Đang làm
   Xóa món ăn -                        Đang làm
   Cấm người dùng -                    Đã xong
   Cấm nhà hàng -                      Đang làm
   Cấm món ăn -                        Đang làm
   Xóa lượt bình luận đánh giá -       Đang làm
   Quản lý danh sách nhà hàng -        Đã xong
   Quản lý danh sách món ăn -          Đã xong
```
