import {TouchableOpacity, Text, ColorValue} from 'react-native';
import React from 'react';
import {Colors, btn, buttons, svg} from '../style/cpt';
import Menu from './../../../../assets/ics/menu.svg';
import Back from './../../../../assets/ics/back.svg';
import Warn from './../../../../assets/ics/warning.svg';
import State from './../../../../assets/ics/state.svg';
import Close from './../../../../assets/ics/close.svg';
import Bread from './../../../../assets/ics/bread.svg';
import Upload from './../../../../assets/ics/upload.svg';
import Confirm from './../../../../assets/ics/confirm.svg';
import Edit from './../../../../assets/ics/edit.svg';
import Like from './../../../../assets/ics/like-shapes.svg';
import Next from './../../../../assets/ics/next.svg';
import Search from '../../../../assets/ics/search.svg';
import EyeClose from '../../../../assets/ics/eye-close.svg';
import EyeOpen from '../../../../assets/ics/eye-open.svg';

type Prop = {
  button?: btn;
  svg?: keyof typeof svg | undefined;
  color?: ColorValue;
};

const Square_btn = (props: Prop) => {
  const {button, svg, color} = props;

  const renderSvg = () => {
    switch (svg) {
      case 'Back':
        return <Back width={18} height={18} fill={color || Colors.black} />;
      case 'Next':
        return <Next width={18} height={18} fill={color || Colors.black} />;
      case 'Warn':
        return <Warn width={18} height={18} fill={color || Colors.black} />;
      case 'State':
        return <State width={18} height={18} fill={color || Colors.black} />;
      case 'Close':
        return <Close width={18} height={18} fill={color || Colors.black} />;
      case 'Bread':
        return <Bread width={18} height={18} fill={color || Colors.black} />;
      case 'Upload':
        return <Upload width={18} height={18} fill={color || Colors.black} />;
      case 'Confirm':
        return <Confirm width={18} height={18} fill={color || Colors.black} />;
      case 'Edit':
        return <Edit width={18} height={18} fill={color || Colors.black} />;
      case 'Like':
        return <Like width={18} height={18} fill={color || Colors.black} />;
      case 'Search':
        return <Search width={18} height={18} fill={color || Colors.black} />;
      case 'EyeClose':
        return <EyeClose width={18} height={18} fill={color || Colors.black} />;
      case 'EyeOpen':
        return <EyeOpen width={18} height={18} fill={color || Colors.black} />;
      case 'Menu':
        return <Menu width={18} height={18} />;
      default:
        return <Menu width={18} height={18} />;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[buttons.square_Cont, button?.btnStyle]}
      onPress={() => button?.onPress && button?.onPress()}>
      {renderSvg()}
    </TouchableOpacity>
  );
};

export default Square_btn;
