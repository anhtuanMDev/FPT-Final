import {View, Text, FlatList} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import Titlebar from '../../custom/actionbars/Titlebar';
import {screens} from '../../custom/style/scn';
import SliderCarousel from '../../custom/sliders/SliderCarousel';
import StoreRate from '../../custom/lists/StoreRate';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../../../App';
import {StackNavigationProp} from '@react-navigation/stack';
import {GestureHandlerRootView, ScrollView} from 'react-native-gesture-handler';
import {fonts, Colors, forms} from '../../custom/style/cpt';

import Bread from '../../../../assets/ics/bread.svg';
import Restaurant from '../../../../assets/ics/restaurant.svg';
import Close from '../../../../assets/ics/close.svg';
import Fluid_btn from '../../custom/buttons/Fluid_btn';
import {Dropdown} from 'react-native-element-dropdown';
import CardSmall from '../../custom/cards/HomeCardSmall';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'HasRestaurant'
>;

const HasRestaurant = () => {
  const navigation = useNavigation<ScreenNavigationProp>();

  const snapPoint = useMemo(() => ['20%', '45%'], []);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [condition, setCondition] = useState('open');

  const resCondition = [
    {label: 'Open', value: 'open'},
    {label: 'Close', value: 'close'},
  ];

  return (
    <GestureHandlerRootView style={[screens.parent_Cont]}>
      <BottomSheetModalProvider>
        <View style={[screens.parent_Cont]}>
          <Titlebar
            title={{text: 'Your Restaurant'}}
            barStyle={{marginBottom: 20, paddingHorizontal: 20}}
            left={{btnStyle: {opacity: 0}}}
            right={{
              onPress: () => bottomSheetRef.current?.present(),
            }}
            svgRight="Edit"
          />
          <SliderCarousel />

          <View style={[screens.main_Cont, {marginTop: 20}]}>
            <View>
              <StoreRate color={Colors.green} hasRate />
              <StoreRate
                svg="Food"
                color={Colors.orange}
                hasRate
                title="Foods"
              />
              <StoreRate svg="Order" color={Colors.blue} title="Your Order" />
              <Fluid_btn
                text={{
                  text: 'Partnership',
                }}
                button={{
                  btnStyle: {
                    marginTop: 10,
                  },
                }}
              />
            </View>
            <ScrollView style={{flex: 1, marginTop: 25}} showsVerticalScrollIndicator={false}>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                style={{
                  marginBottom: 40,
                }}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
                renderItem={({item}) => {
                  return <CardSmall style={{marginRight: 15}}/>;
                }}
              />

              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                style={{
                  marginBottom: 20,
                }}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
                renderItem={({item}) => {
                  return <CardSmall style={{marginRight: 15}} />;
                }}
              />

              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                style={{
                  marginBottom: 20,
                }}
                horizontal
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}
                renderItem={({item}) => {
                  return <CardSmall style={{marginRight: 15}} />;
                }}
              />
            </ScrollView>
          </View>

          
          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={snapPoint}
            index={1}
            onChange={index => console.log('snapped to', index)}
            style={{
              elevation: 5,
              shadowColor: Colors.black,
              shadowOffset: {width: 0, height: 100},
              shadowOpacity: 0.8,
            }}>
            <BottomSheetView style={{}}>
              <Dropdown
                placeholder="Your restaurant status"
                style={[
                  forms.dropdown_Cont,
                  {
                    marginHorizontal: 20,
                    width: '90%',
                  },
                ]}
                data={resCondition}
                placeholderStyle={fonts.text}
                selectedTextStyle={[fonts.button, {color: Colors.orange}]}
                value={condition}
                labelField={'label'}
                valueField={'value'}
                onChange={item => {
                  console.log('change condition', item);
                }}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  marginHorizontal: 20,
                  marginVertical: 5,
                  paddingVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[fonts.button, {color: Colors.black}]}>
                  Add more food to Menu
                </Text>
                <Bread width={40} height={40} fill={Colors.orange} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  marginHorizontal: 20,
                  marginVertical: 5,
                  paddingVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[fonts.button, {color: Colors.black}]}>
                  Change your Restaurant infor
                </Text>
                <Restaurant width={40} height={40} fill={Colors.orange} />
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  marginHorizontal: 20,
                  marginVertical: 5,
                  paddingVertical: 10,
                  paddingLeft: 10,
                  paddingRight: 20,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={[fonts.button, {color: Colors.black}]}>
                  Delete your Restaurant
                </Text>
                <Close width={40} height={40} fill={Colors.orange} />
              </TouchableOpacity>
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default HasRestaurant;
