import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  NativeSyntheticEvent,
  Platform,
  TextInput,
  TextInputKeyPressEventData,
  TouchableWithoutFeedback,
} from 'react-native';
import {globalStyle} from '../../../styles/globalStyle.ts';
import Box from '../../../components/Box.tsx';
import {appColors} from '../../../assets/colors/appColors.ts';
import TextComponent from '../../../components/TextComponent.tsx';
import ButtonComponent from '../../../components/ButtonComponent.tsx';
import ImageComponent from '../../../components/ImageComponent.tsx';
import InputComponent from '../../../components/InputComponent.tsx';
import {AppInfor} from '../../../constants/AppInfor.ts';
import {imageUrl} from '../../../utils/ip.ts';
import Product from '../../../models/Product.ts';
import {createReview} from '../../../services/api/review.ts';
interface ModalReviewProps {
  visible: boolean;
  onClose: () => void;
  product: Product | undefined;
}
const ModalReview = (props: ModalReviewProps) => {
  const {visible, onClose, product} = props;
  const stars = [
    {
      id: 1,
      text: 'Very bad',
      number: 1,
    },
    {
      id: 2,
      text: 'Bad',
      number: 2,
    },
    {
      id: 3,
      text: 'Normal',
      number: 3,
    },
    {
      id: 4,
      text: 'Good',
      number: 4,
    },
    {
      id: 5,
      text: 'Very Good',
      number: 5,
    },
  ];
  const commentRef = useRef<TextInput>(null);
  const [starSelected, setStarSelected] = useState<number[]>([]);
  const [comment, setComment] = useState('');
  useEffect(() => {
    if (!visible) {
      setStarSelected([]);
      setComment('');
      commentRef.current?.focus();
    }
  }, [visible]);
  return (
    <Modal visible={visible} transparent={true} animationType={'fade'}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={[globalStyle.containerStyle]}
        keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Box
            flex={1}
            justifyContent={'center'}
            alignItems={'center'}
            backgroundColor={'rgba(0, 0, 0, 0, 0.7)'}>
            <Box padding={20} radius={10} backgroundColor={appColors.white}>
              <Box flexDirection={'row'} marginBottom={10}>
                <ImageComponent
                  borderRadius={10}
                  resizeMode={'cover'}
                  src={{uri: imageUrl + product?.image}}
                  height={60}
                  width={60}
                />
                <TextComponent
                  marginLeft={20}
                  alignSelf={'center'}
                  value={'Hi!'}
                  fontFamily={'Dancing Script'}
                  fontSize={34}
                  color={appColors.black900}
                />
              </Box>
              <TextComponent
                color={appColors.black900}
                value={'Would you like to review this product?'}
              />
              <ButtonComponent
                position={'absolute'}
                end={10}
                top={10}
                onPress={onClose}>
                <ImageComponent
                  src={require('../../../assets/icons/close.png')}
                  height={30}
                  width={30}
                />
              </ButtonComponent>
              <Box flexDirection={'row'} marginVertical={10}>
                {stars.map((item, index) => (
                  <ButtonComponent
                    key={index}
                    onPress={() => {
                      setStarSelected([]);
                      const tempArr = [];
                      for (let i = 0; i <= index; i++) {
                        tempArr.push(i);
                      }
                      setStarSelected(tempArr);
                    }}>
                    <ImageComponent
                      alignSelf={'center'}
                      tintColor={
                        starSelected.includes(index)
                          ? undefined
                          : appColors.grays.gray400
                      }
                      src={require('../../../assets/icons/star.png')}
                      height={25}
                      width={25}
                    />
                  </ButtonComponent>
                ))}
              </Box>
              <Box
                borderWidth={1}
                radius={10}
                borderColor={appColors.grays.gray400}
                padding={10}>
                <InputComponent
                  inputRef={commentRef}
                  style={{maxWidth: AppInfor.width / 2}}
                  multiline={false}
                  textColor={appColors.black900}
                  value={comment}
                  placeholderTextColor={appColors.grays.gray400}
                  placeholder={'Write additional comments here...'}
                  onChangeText={(text: string) => {
                    setComment(text);
                  }}
                />
              </Box>
              <ButtonComponent
                backgroundColor={appColors.black900}
                marginTop={20}
                alignItems={'center'}
                name={'Send'}
                onPress={() => {
                  if (starSelected.length === 0) {
                    Alert.alert(
                      'Notification',
                      'Please rate the product to confirm',
                    );
                  } else {
                    createReview(
                      product?._id ?? '',
                      starSelected.length,
                      comment,
                    )
                      .then(res => {
                        console.log(res);
                        if (res.status === 201) {
                          Alert.alert(
                            'Notification',
                            'Rating & review success!',
                            [
                              {
                                text: 'Ok',
                                onPress: () => {
                                  onClose();
                                },
                              },
                            ],
                          );
                        }
                      })
                      .catch(e => {
                        console.log(e);
                        Alert.alert(
                          'Notification',
                          'Rating & review failed. Please try again!',
                          [
                            {
                              text: 'Ok',
                              onPress: () => {
                                onClose();
                              },
                            },
                          ],
                        );
                      });
                  }
                }}
              />
            </Box>
          </Box>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalReview;
