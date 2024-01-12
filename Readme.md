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

3. Feature Process:

```sh
   Tìm kiếm -                          Chưa làm
   Tạo nhà hàng -                      Chưa làm
   Cập nhật thông tin nhà hàng -       Chưa làm
   Xóa nhà hàng -                      Chưa làm
   Thêm món ăn -                       Chưa làm
   Cập nhật món ăn -                   Chưa làm
   Xóa món ăn -                        Chưa làm
   Cấm người dùng -                    Chưa làm
   Cấm nhà hàng -                      Chưa làm
   Cấm món ăn -                        Chưa làm
   Xóa lượt bình luận đánh giá -       Chưa làm
   Quản lý danh sách nhà hàng -        Chưa làm
   Quản lý danh sách món ăn -          Chưa làm
```