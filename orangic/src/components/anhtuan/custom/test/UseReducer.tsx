import {View, Text, ScrollView} from 'react-native';
import React, {useReducer} from 'react';
import Input from '../forms/Input';
import Titlebar from '../actionbars/Titlebar';
import {screens} from '../style/scn';
import Fluid_btn from '../buttons/Fluid_btn';

type State = {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  district: string;
  state: string;
  city: string;
  status: string;
};

type Action = {field: keyof State; value: string};

function reducer(state: State, action: Action) {
  return {
    ...state,
    [action.field]: action.value,
  };
}

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: '',
    address: '',
    phone: '',
    email: '',
    description: '',
    district: '',
    state: '',
    city: '',
    status: '',
  });

  const handleChange = (name: keyof State) => (value: string) => {
    dispatch({field: name, value});
  };

  return (
    <View style={[screens.parent_Cont]}>
      <View style={[screens.main_Cont]}>
        <Titlebar
          title={{text: 'Use Reducer'}}
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

        <ScrollView style={[{marginTop: 20, flex: 1}]}>
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
            placeholder="Restaurant Address"
            onChange={handleChange('address')}
          />
          <Input
            placeholder="Restaurant Phone"
            onChange={handleChange('phone')}
          />
          <Input
            placeholder="Restaurant District"
            onChange={handleChange('district')}
          />
          <Input
            placeholder="Restaurant State"
            onChange={handleChange('state')}
          />
          <Input
            placeholder="Restaurant Statu"
            onChange={handleChange('status')}
          />
          <Input
            placeholder="Restaurant Description"
            onChange={handleChange('description')}
          />
          <Fluid_btn />
        </ScrollView>
      </View>
    </View>
  );
};

export default UseReducer;
