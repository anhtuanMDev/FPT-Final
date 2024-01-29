import {
  View,
  Text,
  FlatList,
  ViewStyle,
  TextInput,
  Animated,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Drop_down from '../../../../assets/ics/drop_down.svg';
import {Colors, fonts, forms} from '../style/cpt';
import Animateds, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type Prop = {
  placeholder?: string;
  value?: string;
  dataList?: string[];
  onPick?: (item: number) => void;
  style?: ViewStyle | ViewStyle[];
};

const Dropdown = (props: Prop) => {
  // set data or use example data
  let myArray: string[] = props?.dataList || [
    'apple',
    'banana',
    'orange',
    'grape',
  ]; 
  const [drop, setDrop] = useState(false);
  const dropDown = useRef(new Animated.Value(0)).current;
  const fixHeight = useSharedValue({height: 0});

  // spin animation up
  const spinClockWise = () => {
    Animated.timing(dropDown, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  // spin animation down
  const spinCounterClockWise = () => {
    Animated.timing(dropDown, {
      toValue: 0,
      duration: 50,
      useNativeDriver: true,
    }).start();
  };

  // define spin value base on dropDown value
  const spin = dropDown.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // define height of dropdown
  const collapse = useAnimatedStyle(() => {
    return {
      height: withTiming(fixHeight.value.height, {duration: 200}),
    };
  });

  // call animation when drop change
  useEffect(() => {
    if (drop) {
      spinClockWise();
      fixHeight.value = {height: 155};
    } else {
      spinCounterClockWise();
      fixHeight.value = {height: 0};
    }
  }, [drop]);

  return (
    <View style={[forms.dropdown_Cont, props?.style]}>
      <TouchableOpacity onPress={() => setDrop(!drop)}>
        <View style={[forms.dropdown_ItemCont]}>
          <TextInput
            style={[{width: '70%'}, fonts.text]}
            placeholderTextColor={Colors.slate}
            value={props.value}
            placeholder={props?.placeholder || 'Placeholder'}
            editable={false}
          />
          <Animated.View style={{transform: [{rotate: spin}]}}>
            <Drop_down width={24} height={24} fill={'black'} />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animateds.View style={[collapse]}>

        <FlatList
        data={myArray}
        renderItem={({item,index})=> (
          <View key={index}>
              <Text
                style={[
                  {
                    textAlign: 'left',
                    paddingHorizontal: 20,
                    paddingVertical: 12,
                  },
                  fonts.textBold,
                ]}
                onPress={() => {
                  setDrop(false);
                  props?.onPick && props?.onPick(index);
                }}>
                {item}
              </Text>

              {index !== myArray.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: 'black',
                    marginHorizontal: 20,
                  }}
                />
              )}
            </View>
        )}
        />
      </Animateds.View>
    </View>
  );
};

export default Dropdown;
