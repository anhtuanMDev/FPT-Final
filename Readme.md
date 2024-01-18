This is Anh Tuan Readme

1. Link:

   - svg - npm i react-native-svg-transformer
     -> Using to transform svg

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

3. Feature Process:

```sh
   Tạo nhà hàng -                      Đang làm
   Tìm kiếm -                          Đang làm
   Cập nhật thông tin nhà hàng -       Đang làm
   Xóa nhà hàng -                      Đang làm
   Thêm món ăn -                       Đang làm
   Cập nhật món ăn -                   Đang làm
   Xóa món ăn -                        Đang làm
   Cấm người dùng -                    Chưa làm
   Cấm nhà hàng -                      Chưa làm
   Cấm món ăn -                        Chưa làm
   Xóa lượt bình luận đánh giá -       Chưa làm
   Quản lý danh sách nhà hàng -        Chưa làm
   Quản lý danh sách món ăn -          Chưa làm
```
