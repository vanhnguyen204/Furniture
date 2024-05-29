import React from 'react';
import {ImageBackground, ImageRequireSource} from 'react-native';
import Box from './Box.tsx';
import ImageComponent from './ImageComponent.tsx';
import TextComponent from './TextComponent.tsx';
import {appColors} from '../assets/colors/appColors.ts';
interface BackgroundCardProps {
  paymentName: string;
  image: ImageRequireSource | string;
  cardNumber: string;
  cvv: number;
  expiryDate: string;
  cardHolderName: string;
}
const BackgroundCard = (props: BackgroundCardProps) => {
  const {paymentName, cardHolderName, image, cardNumber, cvv, expiryDate} =
    props;
  return (
    <Box
      radius={10}
      backgroundColor={appColors.black900}
      marginHorizontal={20}
      padding={20}>
      <Box flexDirection={'row'} alignItems={'center'}>
        <ImageComponent
          borderRadius={10}
          src={typeof image === 'string' ? {uri: image} : image}
          width={30}
          height={30}
        />
        <TextComponent value={paymentName} marginLeft={10} fontSize={16} />
      </Box>
      <TextComponent
        value={cardNumber || 'EX: 123 456 789'}
        style={{letterSpacing: 10}}
        marginVertical={30}
      />
      <Box flexDirection={'row'} justifyContent={'space-between'}>
        <Box>
          <TextComponent value={'Card Holder Name'} fontSize={12} />
          <TextComponent
            value={cardHolderName || 'Ex: NGUYEN VAN A'}
            fontSize={14}
            marginTop={10}
          />
        </Box>
        <Box>
          <TextComponent value={'Expiry Date'} fontSize={12} />
          <TextComponent
            value={expiryDate || 'EX: 01/24'}
            fontSize={14}
            marginTop={10}
          />
        </Box>
      </Box>
      <ImageComponent
        style={{position: 'absolute', bottom: 0, end: -30}}
        src={require('../assets/icons/wave.png')}
        width={280}
        height={95}
      />
    </Box>
  );
};

export default BackgroundCard;
