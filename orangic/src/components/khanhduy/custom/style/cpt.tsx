import {StyleSheet, TextStyle, ViewStyle, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

export enum Colors {
  white = '#ffffff',
  black = '#000000',
  slate = '#868686',
  silver = '#E3E3E3',
  orange = '#FF7400',
  ember = '#BF3E00',
  green = '#22A45D',
  blue = '#4285F4',
  navy = '#395998',
  nox = '#263238',
  yellow = '#FFC529',
}

export enum svg {
  Menu = 'Menu',
  Back = 'Back',
  Warn = 'Warn',
  State = 'State',
  Close = 'Close',
  Bread = 'Bread',
  Upload = 'Upload',
  Confirm = 'Confirm',
  Edit = 'Edit',
  Like = 'Like',
  Next = 'Next',
}

export type btn = {
  onPress?: () => void;
  btnStyle?: ViewStyle | ViewStyle[];
};

export type txt = {
  text?: string;
  textStyle?: TextStyle | TextStyle[];
};

export const fonts = StyleSheet.create({
  title: {
    fontSize: 22,
    lineHeight: 23,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  caption: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  subline: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  text: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  link: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    color: Colors.blue,
  },
  titleBold: {
    fontSize: 22,
    lineHeight: 23,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  captionBold: {
    fontSize: 18,
    lineHeight: 19,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  button: {
    fontSize: 16,
    lineHeight: 17,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: Colors.white,
  },
  sublineBold: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  textBold: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  headline: {
    fontSize: 36,
    lineHeight: 37,
    fontWeight: 'normal',
    letterSpacing: 0.2,
    color: Colors.black,
  },
  headlineBold: {
    fontSize: 36,
    lineHeight: 37,
    fontWeight: '700',
    letterSpacing: 0.2,
    color: Colors.black,
  },
});

export const buttons = StyleSheet.create({
  fluid_Cont: {
    width: '100%',
    height: 48,
    backgroundColor: Colors.orange,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  hover_Cont: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderColor: Colors.slate,
    borderWidth: 1,
  },
  square_Cont: {
    width: 38,
    height: 38,
    backgroundColor: Colors.white,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.slate,
    borderWidth: 1,
  },
  add_Cont: {
    width: 24,
    height: 24,
    backgroundColor: Colors.orange,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  minus_Cont: {
    width: 24,
    height: 24,
    backgroundColor: Colors.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.orange,
    borderWidth: 1.2,
  },
  avatar_Cont: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const actionbars = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topbar_title_Cont: {
    width: 180,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabbar_Cont: {},
});

export const sliders = StyleSheet.create({
  carousel_Cont: {
    width,
    height: 200,
    backgroundColor: Colors.orange,
  },
  carousel_Item: {
    width,
    height: 200,
  },
  pagination_Cont: {
    width: 50,
    height: 10,
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  pagination_Item: {
    width: 5,
    height: 5,
    borderRadius: 2,
    marginHorizontal: 5.5,
    backgroundColor: Colors.slate,
  },
});

export const lists = StyleSheet.create({
  storeRate_Cont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 5,
  },
  storeRate_NameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardRate_Cont: {
    minWidth: 45,
    height: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 20,
    paddingHorizontal: 15,
    position: 'absolute',
    backgroundColor: Colors.white,
    elevation: 5,
    shadowColor: Colors.orange,
  },
});

export const forms = StyleSheet.create({
  input_Cont: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingVertical: 10,
    paddingLeft: 15,
    paddingRight: 20,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.slate,
  },
  textArea_Cont: {
    width: '100%',
    height: 100,
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingHorizontal: 10,
    marginVertical: 5,
    textAlignVertical:'top',
    justifyContent: 'flex-start',
    borderWidth: 1,
    borderColor: Colors.slate,
  },
  imagePicker_Cont: {
    width: '100%',
    height: 58,
    backgroundColor: Colors.slate,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown_Cont: {
    width: '100%',
    height: 'auto',
    marginVertical: 5,
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.slate,
    backgroundColor: Colors.white,
  },
  dropdown_ItemCont: {
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.slate,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dropdown_Form: {
    width: '100%',
  },
  tag_Cont: {
    paddingHorizontal: 4,
    paddingVertical: 3,
    textAlign: 'center',
    alignSelf: 'flex-start',
    borderRadius: 5,
    backgroundColor: Colors.silver,
  },
  capsule_Cont: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    textAlign: 'center',
    alignSelf: 'flex-start',
    borderRadius: 30,
    backgroundColor: Colors.white,
    elevation: 5,
  },
});

export const cards = StyleSheet.create({
  small_Cont: {
    width: 153,
    height: 216,
    backgroundColor: Colors.white,
    borderRadius: 15,
    elevation: 4
  },
  small_NameCont: {
    marginTop: 15,
    height: 55,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  big_Cont: {
    width: 266,
    height: 230,
    backgroundColor: Colors.white,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 4
  },
  big_NameCont: {
    marginVertical: 15,
    marginHorizontal: 12,
  },
  big_ItemCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  }
});

export const modals = StyleSheet.create({
  showImage_Cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})