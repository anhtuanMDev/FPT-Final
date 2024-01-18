import {View, Text, Modal, ScrollView} from 'react-native';
import React, {useEffect, useReducer, useState} from 'react';
import Titlebar from '../custom/actionbars/Titlebar';
import {screens} from '../custom/style/scn';
import Logo from '../../../assets/imgs/emptyStore.svg';
import {Colors, fonts} from '../custom/style/cpt';
import Fluid_btn from '../custom/buttons/Fluid_btn';
import SliderCarousel from '../custom/sliders/SliderCarousel';
import StoreRate from '../custom/lists/StoreRate';
import Input from '../custom/forms/Input';

type State = {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
};

type Action = {field: keyof State; value: string};

function reducer(state: State, action: Action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

const Store = () => {
  // Show user that they have no restaurant
  const noRes = () => {
    return (
      <View style={[screens.main_Cont]}>
        <Titlebar
          title={{text: 'Your Restaurant'}}
          left={{btnStyle: {opacity: 0}}}
          right={{btnStyle: {opacity: 0}}}
        />
        <View style={[screens.noRes_Cont]}>
          <Logo width={312} height={332} />
          <Text style={[fonts.sublineBold, {marginVertical: 20}]}>
            We can’t seem to find your Restaurant.
          </Text>
          <Fluid_btn
            text={{
              text: 'Let create one',
            }}
            button={{onPress: () => console.log('Create')}}
          />
        </View>
      </View>
    );
  };

  // Render interface if user has restaurant
  const hasRes = () => {
    return (
      <View style={[screens.parent_Cont]}>
        <Titlebar
          title={{text: 'Your Restaurant'}}
          barStyle={{marginBottom: 20, paddingHorizontal: 20}}
          left={{btnStyle: {opacity: 0}}}
          right={{
            onPress: () => console.log('Create foods'),
          }}
          svgRight="Bread"
        />
        <SliderCarousel />

        <View style={[screens.main_Cont, {marginTop: 20}]}>
          <View>
            <StoreRate color={Colors.green} hasRate />
            <StoreRate svg="Food" color={Colors.orange} hasRate title="Foods" />
            <StoreRate svg="Order" color={Colors.blue} title="Your Order" />
          </View>
        </View>
      </View>
    );
  };

  const [state, dispatch] = useReducer(reducer, {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
  });

  const handleChange = (name: keyof State) => (value: string) => {
    dispatch({field: name, value});
  };

  const createRes = () => {
    return (
      <Modal>
        <View style={[screens.main_Cont]}>
          <Titlebar
            title={{text: 'Create Restaurant'}}
            left={{
              btnStyle: {borderWidth: 0},
              onPress: () => console.log('Rules'),
            }}
            right={{
              onPress: () => console.log('Close'),
            }}
            svgRight="Close"
            svgLeft="Like"
          />

          <ScrollView style={[{marginTop: 20}]}>
            <Input
              placeholder="Restaurant Name"
              onChange={handleChange('name')}
            />
            <Input
              placeholder="Restaurant Address"
              onChange={handleChange('address')}
            />
            <Input
              placeholder="Restaurant Phone"
              onChange={handleChange('phone')}
            />
            <Input
              placeholder="Restaurant Email"
              onChange={handleChange('email')}
            />
            <Input
              placeholder="Restaurant Description"
              onChange={handleChange('description')}
            />
            <Fluid_btn />
          </ScrollView>
        </View>
      </Modal>
    );
  };

  return (
    <View style={[screens.parent_Cont]}>
      {createRes()}
      {hasRes()}
    </View>
  );
};

export default Store;
