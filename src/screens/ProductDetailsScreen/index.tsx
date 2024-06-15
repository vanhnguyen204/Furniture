import React, {useCallback, useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import TextComponent from '../../components/TextComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import Box from '../../components/Box.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {goBackNavigation, navigatePush} from '../../utils/navigationUtils.ts';
import {Alert, View} from 'react-native';
import {imageUrl} from '../../utils/ip.ts';
import {
  checkIsFavorite,
  createFavorite,
  deleteFavorite,
} from '../../services/api/product.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ACCESS_USER_ID} from '../../constants/AsyncStorage.ts';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import {addProductToCart} from '../../services/api/cart.ts';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {countReview} from '../../services/api/review.ts';

type CheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetailsScreen'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
const ProductDetailsScreen = (props: Props) => {
  const {item} = props.route.params;
  const {setMyFavorites, myFavorites} = useUserInformation();
  const [rating, setRating] = useState({
    averageRating: 0,
    reviews: 0,
  });
  const [isProductFavorite, setIsProductFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const isFavorite = useCallback(async () => {
    try {
      checkIsFavorite(item._id)
        .then(res => {
          // @ts-ignore
          if (res) {
            setIsProductFavorite(true);
          } else {
            setIsProductFavorite(false);
          }
        })
        .catch(e => {});
    } catch (e) {
      console.log(e);
    }
  }, [item._id]);
  const onPressMark = useCallback(async () => {
    try {
      if (isProductFavorite) {
        await deleteFavorite(item._id);
        setIsProductFavorite(false);
        const filterFavorite = myFavorites.filter(it => {
          // @ts-ignore
          return it._id !== item._id;
        });
        setMyFavorites(filterFavorite);
      } else {
        await createFavorite(item._id);
        setIsProductFavorite(true);
        setMyFavorites(myFavorites, item);
      }
    } catch (e) {
      console.log(e);
    }
  }, [isProductFavorite, item, myFavorites, setMyFavorites]);
  useEffect(() => {
    isFavorite();
  }, [isFavorite]);
  useEffect(() => {
    countReview(item._id)
      .then(res => {
        // @ts-ignore
        setRating(res);
      })
      .catch(e => {
        console.log(e);
      });
  }, [item._id]);
  return (
    <Container>
      <Box
        flexDirection={'row'}
        justifyContent={'flex-end'}
        overflow={'visible'}>
        <View
          style={{
            height: 455,
            width: 360,
            borderTopLeftRadius: 20,
            borderBottomLeftRadius: 20,
            overflow: 'visible',
          }}>
          <ImageComponent
            width={360}
            height={455}
            resizeMode={'cover'}
            src={{uri: imageUrl + item?.image}}
            style={{borderTopLeftRadius: 50, borderBottomLeftRadius: 50}}
          />
          <ButtonComponent
            padding={5}
            alignSelf={'flex-start'}
            position={'absolute'}
            left={-17.5}
            backgroundColor={appColors.white}
            borderRadius={10}
            name={'Back'}
            onPress={() => goBackNavigation()}>
            <ImageComponent
              height={30}
              width={30}
              src={require('../../assets/icons/left.png')}
            />
          </ButtonComponent>
        </View>
      </Box>
      <Box paddingHorizontal={20}>
        <TextComponent
          value={item?.name}
          color={appColors.black900}
          fontWeight={'500'}
          fontSize={34}
          lineHeight={40}
          fontFamily={'Dancing Script'}
        />
        <Box
          marginVertical={5}
          flexDirection={'row'}
          justifyContent={'space-between'}>
          <TextComponent
            value={`$ ${item?.price}`}
            fontWeight={'700'}
            fontSize={30}
            lineHeight={41}
            color={appColors.black900}
          />
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <ButtonComponent
              padding={6}
              backgroundColor={appColors.grays.gray300}
              name={'+'}
              borderRadius={5}
              alignSelf={'center'}
              onPress={() => {
                setQuantity(prevState => prevState + 1);
              }}>
              <ImageComponent
                height={20}
                width={20}
                src={require('../../assets/icons/plus_child.png')}
              />
            </ButtonComponent>

            <View
              style={{
                width: 80,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextComponent
                marginHorizontal={20}
                value={quantity.toString()}
                color={appColors.black900}
              />
            </View>
            <ButtonComponent
              padding={6}
              alignSelf={'center'}
              backgroundColor={appColors.grays.gray300}
              name={'-'}
              borderRadius={5}
              onPress={() => {
                setQuantity(prevState => (prevState > 1 ? prevState - 1 : 1));
              }}>
              <ImageComponent
                height={20}
                width={20}
                src={require('../../assets/icons/minus.png')}
              />
            </ButtonComponent>
          </Box>
        </Box>
        <ButtonComponent
          padding={0}
          onPress={() => {
            navigatePush('RatingDetails', {
              productId: item._id,
              price: item.price,
              image: item.image,
              average: rating.averageRating,
              reviews: rating.reviews,
              name: item.name,
            });
          }}
          flexDirection={'row'}
          alignItems={'center'}
          marginBottom={10}>
          <ImageComponent
            src={require('../../assets/icons/star.png')}
            width={20}
            height={20}
          />
          <TextComponent
            marginLeft={10}
            fontSize={16}
            value={rating.averageRating.toFixed(1).toString()}
            color={appColors.black900}
          />
          <TextComponent
            marginLeft={10}
            fontSize={16}
            value={`(${rating.reviews} reviews)`}
            color={appColors.black900}
          />
        </ButtonComponent>
        <TextComponent
          fontSize={14}
          lineHeight={19}
          maxLine={5}
          fontWeight={'300'}
          value={item?.description}
          color={appColors.grays.gray600}
        />
      </Box>
      <Box flexDirection={'row'} position={'absolute'} bottom={20} padding={10}>
        <ButtonComponent
          padding={20}
          borderRadius={10}
          backgroundColor={appColors.grays.gray300}
          name={'Mark'}
          onPress={() => {
            onPressMark();
          }}>
          <ImageComponent
            tintColor={isProductFavorite ? undefined : appColors.black900}
            src={
              isProductFavorite
                ? require('../../assets/icons/bookmark.png')
                : require('../../assets/icons/maker.png')
            }
            height={30}
            width={30}
          />
        </ButtonComponent>
        <ButtonComponent
          padding={20}
          borderRadius={10}
          alignItems={'center'}
          justifyContent={'center'}
          marginLeft={15}
          flex={1}
          alignSelf={'stretch'}
          backgroundColor={appColors.black}
          name={'Add to cart'}
          onPress={() => {
            addProductToCart(item._id, quantity)
              .then(res => {
                if (res.status === 201) {
                  Alert.alert('Notification', 'Add product to cart success.');
                  return;
                }
                if (res.status === 200) {
                  Alert.alert(
                    'Notification',
                    'Increased the number of products in the shopping cart.',
                  );
                  return;
                }
              })
              .catch(e => {
                console.log(e);
              });
          }}>
          <TextComponent
            value={'Add to cart'}
            fontSize={20}
            lineHeight={28}
            fontWeight={'600'}
          />
        </ButtonComponent>
      </Box>
    </Container>
  );
};

export default ProductDetailsScreen;
