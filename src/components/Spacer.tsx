import React from 'react';
import {View} from 'react-native';
interface SpacerProps {
  width?: number;
  height?: number;
}
const Spacer = (props: SpacerProps) => {
  const {width, height} = props;
  return <View style={{width, height}} />;
};

export default Spacer;
