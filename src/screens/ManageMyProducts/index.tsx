import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Box from '../../components/Box.tsx';
import Header from '../../components/Header.tsx';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../navigators/RootStackParamList.ts';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {launchImageLibrary} from 'react-native-image-picker';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import TextComponent from '../../components/TextComponent.tsx';
import InputComponent from '../../components/InputComponent.tsx';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../services/api/product.ts';
import {Alert} from 'react-native';
import {useMyProducts} from '../../hooks/useMyProducts.ts';
import {imageUrl} from '../../utils/ip.ts';
type CheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  'ManageMyProducts'
>;
type CheckoutScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ManageMyProducts'
>;

type Props = {
  route: CheckoutScreenRouteProp;
  navigation: CheckoutScreenNavigationProp;
};
type FormValues = {
  name: string;
  description: string;
  type: string;
  price: number;
};
const ManageMyProducts = (props: Props) => {
  const {isCreate, item} = props.route.params;
  const [image, setImage] = useState({
    uri: '',
    type: '',
    name: '',
  });
  const {addNewProduct} = useMyProducts();
  const handleSelectImage = () => {
    try {
      launchImageLibrary({
        mediaType: 'photo',
        includeBase64: false,
        includeExtra: true,
      })
        .then(res => {
          console.log(res);
          // @ts-ignore
          const img = res?.assets[0];
          if (img.fileName && img.type && img.uri) {
            setImage({
              name: img.fileName,
              type: img.type,
              uri: img.uri,
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    } catch (e) {
      console.log(e);
    }
  };
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    defaultValues: {
      name: item?.name,
      description: item?.description,
      type: item?.type,
      price: item?.price,
    },
  });

  const type = [
    {label: 'Chair', value: 'chair'},
    {label: 'Table', value: 'table'},
    {label: 'ArmChair', value: 'armchair'},
    {label: 'Bed', value: 'bed'},
    {label: 'Lamp', value: 'lamp'},
  ];
  // useEffect(() => {}, []);
  const [valueType, setValue] = useState(type[0].value);
  const [openType, setOpenType] = useState(false);
  const onSubmit: SubmitHandler<FormValues> = data => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('price', data.price);
    formData.append('description', data.description);

    if (image.uri) {
      formData.append('file', {
        type: image.type,
        uri: image.uri,
        name: image.name,
      });
    } else {
      formData.append('imageUpdate', item?.image);
    }
    formData.append('type', valueType);

    if (isCreate && (!image.uri || !image.type || !image.name)) {
      Alert.alert('Notification', 'Product images cannot be blank.');
      return;
    }

    if (isCreate) {
      createProduct(formData)
        .then(res => {
          console.log(res);
          // @ts-ignore
          addNewProduct(res.newProduct);
          if (res.status === 201) {
            Alert.alert('Notification', 'Create new product success.', [
              {
                text: 'Ok',
                onPress: () => {
                  goBackNavigation();
                },
              },
            ]);
          }
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      formData.append('productId', item?._id);
      updateProduct(formData)
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            Alert.alert('Notification', 'Update product success.', [
              {
                text: 'Ok',
                onPress: () => {
                  goBackNavigation();
                },
              },
            ]);
          }
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  const renderInput = (
    name: keyof FormValues,
    rules: Record<string, any>,
    placeholder: string,
  ) => (
    <>
      <Controller
        control={control}
        rules={rules}
        render={({field: {onChange, onBlur, value}}) => (
          <Box>
            <TextComponent value={placeholder} color={appColors.black900} />
            <InputComponent
              padding={10}
              textColor={appColors.black900}
              style={{
                borderWidth: 1,
                borderRadius: 10,
                borderColor: appColors.black900,
                marginVertical: 8,
              }}
              onBlur={onBlur}
              onChangeText={onChange}
              // @ts-ignore
              value={value?.toString()}
              placeholder={placeholder}
              placeholderTextColor={appColors.grays.gray400}
            />
          </Box>
        )}
        name={name}
      />
      {errors[name] && (
        <TextComponent
          marginBottom={10}
          color={appColors.red}
          value={errors[name]?.message ?? ''}
        />
      )}
    </>
  );

  return (
    <Container>
      <Box flex={1}>
        <Header
          iconLeft={require('../../assets/icons/left.png')}
          onLeftPress={() => goBackNavigation()}
          title={isCreate ? 'Add your new product' : 'Update product'}
          colorTitle={appColors.black900}
          fontSizeTitle={16}
          fontWeight={'600'}
        />
        <ButtonComponent
          name={'Select image'}
          onPress={() => {
            handleSelectImage();
          }}>
          <ImageComponent
            borderRadius={20}
            resizeMode={'cover'}
            alignSelf={'center'}
            height={150}
            width={150}
            src={
              image.uri
                ? {uri: image.uri}
                : item?.image
                ? {uri: imageUrl + item.image}
                : require('../../assets/images/no-pictures.png')
            }
          />
        </ButtonComponent>

        <Box paddingHorizontal={20}>
          {renderInput('name', {required: 'Name is required'}, 'Name')}
          {renderInput(
            'price',
            {
              required: 'Price is required',
              pattern: {
                value: /^\d+$/,
                message: 'Price must be a number',
              },
              min: {
                value: 1,
                message: 'Price must be at least $1.',
              },
            },
            'Price',
          )}
          {renderInput(
            'description',
            {required: 'Description is required'},
            'Description',
          )}
          <DropDownPicker
            dropDownDirection={'BOTTOM'}
            placeholder={'Choose a type of product'}
            setValue={setValue}
            value={valueType}
            items={type}
            open={openType}
            setOpen={() => setOpenType(prevState => !prevState)}
          />
        </Box>
      </Box>
      <ButtonComponent
        backgroundColor={appColors.black900}
        marginHorizontal={20}
        marginBottom={isCreate ? 20 : 10}
        borderRadius={10}
        alignItems={'center'}
        nameColor={appColors.white}
        fontSize={16}
        name={isCreate ? 'Add product' : 'Update product'}
        onPress={handleSubmit(onSubmit)}
      />
      {!isCreate && (
        <ButtonComponent
          backgroundColor={appColors.red}
          marginHorizontal={20}
          marginBottom={20}
          borderRadius={10}
          alignItems={'center'}
          nameColor={appColors.white}
          fontSize={16}
          name={'Delete product'}
          onPress={() => {
            Alert.alert(
              'Notification',
              'Are you sure to discard this product?',
              [
                {
                  text: 'Cancel',
                },
                {
                  text: 'Delete',
                  onPress: () => {
                    deleteProduct(item?._id ?? '')
                      .then(res => {
                        if (res.status === 200) {
                          Alert.alert(
                            'Notification',
                            'Delete product success.',
                            [
                              {
                                text: 'Ok',
                                onPress: () => {
                                  goBackNavigation();
                                },
                              },
                            ],
                          );
                        }
                      })
                      .catch(e => {
                        console.log(e);
                      });
                  },
                },
              ],
            );
          }}
        />
      )}
    </Container>
  );
};

export default ManageMyProducts;
