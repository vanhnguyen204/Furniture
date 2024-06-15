import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {detailReviewProduct} from '../../services/api/review.ts';
import ImageComponent from '../../components/ImageComponent.tsx';
import {imageUrl} from '../../utils/ip.ts';
import Box from '../../components/Box.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import {FlatList} from 'react-native';
import {calculateTimeDifference} from '../../utils/DateTime.ts';
type CheckoutScreenRouteProp = RouteProp<RootStackParamList, 'RatingDetails'>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RatingDetails'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const RatingDetail = (props: Props) => {
  const {productId, name, price, image, average, reviews} = props.route.params;
  const [detailReviews, setDetailReviews] = useState([]);
  const getDetailReview = useCallback(async () => {
    try {
      const response = await detailReviewProduct(productId);
      // @ts-ignore
      setDetailReviews(response);
    } catch (e) {
      console.log(e);
    }
  }, [productId]);
  useEffect(() => {
    getDetailReview();
  }, [getDetailReview]);
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
      <Box padding={20} flexDirection={'row'}>
        <ImageComponent
          src={{uri: imageUrl + image}}
          width={100}
          height={100}
          resizeMode={'cover'}
          borderRadius={20}
        />
        <Box marginLeft={15}>
          <TextComponent value={name} color={appColors.black900} />
          <TextComponent
            marginVertical={5}
            value={`$ ${price}`}
            color={appColors.black900}
          />
          <Box flexDirection={'row'}>
            <ImageComponent
              src={require('../../assets/icons/star.png')}
              width={20}
              height={20}
            />
            <TextComponent
              marginLeft={10}
              fontSize={16}
              value={average.toFixed(1).toString()}
              color={appColors.black900}
            />
            <TextComponent
              marginLeft={10}
              fontSize={16}
              value={`(${reviews} reviews)`}
              color={appColors.black900}
            />
          </Box>
        </Box>
      </Box>
      <Box padding={20}>
        <FlatList
          data={detailReviews}
          renderItem={({item, index}) => {
            console.log(item);
            // @ts-ignore
            return (
              <Box
                flex={1}
                overflow={'visible'}
                padding={10}
                backgroundColor={appColors.white}
                radius={20}
                marginTop={20}>
                <ImageComponent
                  style={{position: 'absolute', top: -20, left: '45%'}}
                  width={40}
                  height={40}
                  resizeMode={'cover'}
                  borderRadius={50}
                  src={
                    item?.avatar === ''
                      ? require('../../assets/icons/user-avatar.png')
                      : {uri: imageUrl + item?.avatar}
                  }
                />
                <Box
                  flexDirection={'row'}
                  justifyContent={'space-between'}
                  alignItems={'center'}>
                  <TextComponent
                    value={item?.name}
                    color={appColors.black900}
                    marginBottom={5}
                  />

                  <TextComponent
                    value={calculateTimeDifference(item?.time)}
                    color={appColors.black900}
                  />
                </Box>
                <Box flexDirection={'row'}>
                  {Array.from({length: item?.rate}, (v, i) => {
                    return (
                      <ImageComponent
                        key={i}
                        src={require('../../assets/icons/star.png')}
                        width={15}
                        height={15}
                        marginRight={5}
                      />
                    );
                  })}
                </Box>
                {item?.comment && (
                  <TextComponent
                    marginTop={10}
                    color={appColors.black900}
                    value={item.comment}
                  />
                )}
              </Box>
            );
          }}
        />
      </Box>
    </Container>
  );
};

export default RatingDetail;
