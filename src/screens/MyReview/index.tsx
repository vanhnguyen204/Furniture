import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import Header from '../../components/Header.tsx';
import {getMyReview} from '../../services/api/review.ts';
import {FlatList} from 'react-native';
import Box from '../../components/Box.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {imageUrl} from '../../utils/ip.ts';
import TextComponent from '../../components/TextComponent.tsx';
import {calculateTimeDifference} from '../../utils/DateTime.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
interface ResponseReview {
  image: string;
  price: number;
  comment: string;
  rate: number;
  name: string;
  time: string;
}
const MyReview = () => {
  const [reviews, setReviews] = useState<ResponseReview[]>([]);
  useEffect(() => {
    getMyReview()
      .then(res => {
        // @ts-ignore
        setReviews(res);
      })
      .catch(e => {});
  }, []);
  return (
    <Container>
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        onLeftPress={() => goBackNavigation()}
        title={'My reviews'}
        colorTitle={appColors.black900}
        fontSizeTitle={18}
        fontWeight={'600'}
      />
      {reviews.length === 0 ? (
        <Box flex={1} alignItems={'center'} justifyContent={'center'}>
          <TextComponent
            alignSelf={'center'}
            color={appColors.black900}
            value={'You have not reviews.'}
          />
        </Box>
      ) : (
        <FlatList
          keyExtractor={(item, index) => item.time}
          data={reviews}
          renderItem={({item, index}) => (
            <Box
              marginHorizontal={20}
              marginVertical={10}
              padding={16}
              backgroundColor={appColors.white}
              radius={10}>
              <Box flexDirection={'row'}>
                <ImageComponent
                  src={{uri: imageUrl + item.image}}
                  height={80}
                  resizeMode={'cover'}
                  borderRadius={10}
                  width={80}
                />
                <Box marginLeft={20} marginTop={10}>
                  <TextComponent
                    value={item.name}
                    fontSize={16}
                    color={'#606060'}
                  />
                  <TextComponent
                    value={`$ ${item.price}`}
                    color={appColors.black900}
                  />
                </Box>
              </Box>
              <Box
                marginTop={15}
                marginBottom={item.comment ? 15 : 0}
                flexDirection={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}>
                <Box flexDirection={'row'}>
                  {Array.from({length: 5}, (_, i) => (
                    <ImageComponent
                      tintColor={
                        i < item.rate ? undefined : appColors.grays.gray400
                      }
                      key={i}
                      src={require('../../assets/icons/star.png')}
                      height={15}
                      width={15}
                      marginRight={3}
                    />
                  ))}
                </Box>
                <TextComponent
                  value={calculateTimeDifference(item.time)}
                  color={appColors.blue500}
                />
              </Box>
              {item.comment && (
                <TextComponent
                  value={item.comment}
                  color={appColors.black900}
                />
              )}
            </Box>
          )}
        />
      )}
    </Container>
  );
};

export default MyReview;
