import {StyleSheet} from 'react-native';
import {appColors} from '../assets/colors/appColors';

export const globalStyle = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  textStyle: {
    fontSize: 14,
    color: '#fff',
  },
  buttonStyle: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
  text18Nunitosan: {
    fontSize: 18,
    color: appColors.black900,
    fontWeight: '600',
  },
});
