import {View, Text} from 'react-native';
import React, {useMemo, useReducer, useRef, useState} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors, fonts, forms} from '../../custom/style/cpt';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {screens} from '../../custom/style/scn';
import Loading from '../../custom/others/Loading';
import Titlebar from '../../custom/actionbars/Titlebar';
import Input from '../../custom/forms/Input';
import ImagePicker from '../../custom/forms/ImagePicker';
import {Dropdown} from 'react-native-element-dropdown';
import TextArea from '../../custom/forms/TextArea';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import SwitchWithIcons from 'react-native-switch-with-icons';

import Camera from '../../../../assets/ics/camera.svg';
import Library from '../../../../assets/ics/libary.svg';

// Declaring types for the navigation

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateFood'
>;

// Declaring state and action for createFood

type CreateFoodState = {
  name: string;
  email: string;
  introduction: string;
  img: string[];
  feature: boolean;
  price: number;
  discount: number;
  condtition: string;
  timeMade: string;
};

type FoodAction = {
  field: keyof CreateFoodState;
  value: string | number | boolean;
};
function foodReducer(createFood: CreateFoodState, action: FoodAction) {
  return {
    ...createFood,
    [action.field]: action.value,
  };
}

const CreateFood = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  // Indicate if the food is feature item or not
  const [special, setSpecial] = useState(false);

  const options = [
    {label: 'On Sale', value: 'On Sale'},
    {label: 'Out of Supply', value: 'Out of Supply'},
    {label: 'Out of service', value: 'Out of service'},
  ];

  const snapPoints = useMemo(() => ['15%', '25%'], []);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [createDish, dispatchCreateDish] = useReducer(foodReducer, {
    name: '',
    email: '',
    introduction: '',
    img: [],
    feature: false,
    price: 0,
    discount: 0,
    condtition: 'On Sale',
    timeMade: '',
    // 00:05:48
  });

  const createDishPendingVar = false;

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.white}}>
      <BottomSheetModalProvider>
        <View style={screens.parent_Cont}>
          {createDishPendingVar ? (
            <Loading
              message="We are adding your new dish in our system. Please wait a moment."
              backgroundColor={Colors.orange}
            />
          ) : (
            <View style={screens.main_Cont}>
              <Titlebar
                title={{text: 'Make more Food'}}
                left={{
                  btnStyle: {borderWidth: 0},
                  // onPress: () => console.log('Rules'),
                }}
                right={{
                  onPress: () => {
                    // navigation.navigate('NoRestoScreen');
                    navigation.goBack();
                  },
                }}
                svgRight="Close"
                svgLeft="Like"
              />

              <View style={[{marginTop: 20}]}>
                <Input
                  placeholder="The meal's Name"
                  onChange={(text: string) =>
                    dispatchCreateDish({field: 'name', value: text})
                  }
                  value={createDish.name}
                />

                <ImagePicker
                  data={createDish.img}
                  style={{marginVertical: 10}}
                  uploadPress={() => {
                    // console.log('press upload');
                    bottomSheetModalRef.current?.present();
                  }}
                  imagePress={() => {
                    // console.log('press image picker');
                  }}
                />

                <Input
                  placeholder="The meal's Price"
                  onChange={(text: string) =>
                    dispatchCreateDish({field: 'price', value: +text})
                  }
                  value={createDish.price.toString()}
                />

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Dropdown
                    placeholder="The meal's Condtition"
                    style={[forms.dropdown_Cont, {width: '40%'}]}
                    data={options}
                    placeholderStyle={fonts.text}
                    selectedTextStyle={[fonts.textBold, {color: Colors.orange}]}
                    value={createDish.condtition}
                    labelField={'label'}
                    valueField={'value'}
                    onChange={item => {
                      dispatchCreateDish({
                        field: 'condtition',
                        value: item.value,
                      });
                    }}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingRight: 20,
                    }}>
                    <Text
                      style={[
                        fonts.sublineBold,
                        {marginBottom: 5, marginRight: 20},
                      ]}>
                      Feature Items ?
                    </Text>
                    <SwitchWithIcons
                      value={createDish.feature}
                      onValueChange={() =>
                        dispatchCreateDish({
                          field: 'feature',
                          value: !createDish.feature,
                        })
                      }
                      trackColor={{false: Colors.silver, true: '#FFA06D'}}
                      thumbColor={{true: Colors.ember, false: Colors.slate}}
                      icon={{
                        false: require('../../../../assets/ics/switch-feature-off.png'),
                        true: require('../../../../assets/ics/switch-feature-on.png'),
                      }}
                      iconColor={{
                        false: Colors.silver,
                        true: Colors.white,
                      }}
                    />
                  </View>
                </View>

                <TextArea
                  placeholder="The meal's Introduction"
                  onChange={(text: string) =>
                    dispatchCreateDish({field: 'introduction', value: text})
                  }
                  value={createDish.introduction}
                />
              </View>
              <View style={{flex: 1}} />
              <Fluid_btn
                button={{
                  onPress: () => {
                    // checkCreateInfor(createRes);
                  },
                }}
                text={{
                  text: 'Add food to menu',
                }}
              />

              <BottomSheetModal
                ref={bottomSheetModalRef}
                index={1}
                snapPoints={snapPoints}
                style={{zIndex: 1000}}>
                <BottomSheetView style={{flex: 1, alignItems: 'center'}}>
                  <Text>You want to import image from ?</Text>

                  <View
                    style={[
                      {
                        flexDirection: 'row',
                        marginTop: 25,
                        justifyContent: 'space-around',
                        width: '100%',
                        paddingHorizontal: 20,
                      },
                    ]}>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        // requestCameraPermission(1);
                        bottomSheetModalRef.current?.dismiss();
                      }}>
                      <Camera width={50} height={50} />
                      <Text style={[fonts.text, {marginTop: 5}]}>
                        Upload 1 pic
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        // requestCameraPermission(5);
                        bottomSheetModalRef.current?.dismiss();
                      }}>
                      <Camera width={50} height={50} />
                      <Text style={[fonts.text, {marginTop: 5}]}>
                        Upload 5 pic
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{alignItems: 'center'}}
                      onPress={() => {
                        // requestLibraryPermission();
                        bottomSheetModalRef.current?.dismiss();
                      }}>
                      <Library width={50} height={50} />
                      <Text style={[fonts.text, {marginTop: 5}]}>
                        From library
                      </Text>
                    </TouchableOpacity>
                  </View>
                </BottomSheetView>
              </BottomSheetModal>
            </View>
          )}
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default CreateFood;
