import {View, Text, ViewStyle, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors, actionbars, btn, fonts} from '../style/cpt';
import Square_btn from '../buttons/Square_btn';
import Avatar_btn from '../buttons/Avatar_btn';
import Down from '../../../../assets/ics/drop_down.svg';
import {set} from 'mongoose';

type Prop = {
  left: btn;
  right: btn;
  barStyle?: ViewStyle | ViewStyle[];
  text: string[];
  changeLocation?: () => void;
};

const Topbar = (props: Prop) => {
  const {left, right} = props;

  const [text, setText] = useState(props.text[0] || 'Delivery to');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (props.text.length === 0) {
      setText('Delivery to');
      setIndex(0);
    } else if (props.text.length === 1) {
      setText(props.text[0]);
      setIndex(0);
    } else {
      const interval = setInterval(() => {
        setIndex(prevIndex =>
          prevIndex === props.text.length - 1 ? 0 : prevIndex + 1,
        );
        setText(props.text[index]);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [props.text, index]);

  return (
    <View
      style={[actionbars.container, {paddingHorizontal: 5}, props?.barStyle]}>
      <Square_btn
        button={{
          btnStyle: left?.btnStyle,
          onPress: left.onPress,
        }}
      />

      <TouchableOpacity
        style={[actionbars.topbar_title_Cont]}
        activeOpacity={0.8}
        onPress={() => props?.changeLocation && props?.changeLocation()}>
        <View style={{flexDirection: 'row'}}>
          <Text style={[fonts.subline]}>Deliver to</Text>
          <Down width={15} height={15} style={{marginLeft: 5}} fill={'black'} />
        </View>
        <Text style={[fonts.sublineBold, {color: Colors.orange}]}>{text}</Text>
      </TouchableOpacity>

      <Avatar_btn
        button={{
          btnStyle: right?.btnStyle,
          onPress: right.onPress,
        }}
      />
    </View>
  );
};

export default Topbar;
