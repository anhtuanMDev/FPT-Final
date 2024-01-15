import {View, Text} from 'react-native';
import React from 'react';
import Titlebar from '../custom/actionbars/Titlebar';
import {screens} from '../custom/style/scn';
import Logo from '../../../assets/imgs/emptyStore.svg';
import {fonts} from '../custom/style/cpt';
import Fluid_btn from '../custom/buttons/Fluid_btn';

const Store = () => {
  // Show user that they have no restaurant
  const noRes = () => {
    return (
      <View style={[screens.parent_Cont]}>
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
          barStyle={{marginBottom: 20}}
          left={{btnStyle: {opacity: 0}}}
          right={{
            onPress: () => console.log('Create foods'),
          }}
          svgRight='Bread'
        />

      </View>
    );
  };

  return <View style={[screens.main_Cont]}>{hasRes()}</View>;
};

export default Store;
