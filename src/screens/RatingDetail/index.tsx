import React from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../navigators/RootStackParamList.ts";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
type CheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'RatingDetails'
>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RatingDetails'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const RatingDetail = (props: Props) => {
  const {productId} = props.route.params;
  return (
    <Container>
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        title={'Rating & Review'}
        colorTitle={appColors.black900}
        fontSizeTitle={16}
        onLeftPress={() => goBackNavigation()}
        fontWeight={'600'}
      />
    </Container>
  );
};

export default RatingDetail;
