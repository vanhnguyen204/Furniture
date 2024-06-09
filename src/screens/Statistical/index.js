import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {appColors} from '../../assets/colors/appColors.ts';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import Box from '../../components/Box.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import {it} from '@jest/globals';
import {FlatList, Image, Text, View} from 'react-native';
import {getStatistical} from '../../services/api/invoice.ts';
import TextComponent from '../../components/TextComponent.tsx';
import ImageComponent from '../../components/ImageComponent';
import {imageUrl} from '../../utils/ip';

const Statistical = () => {
  const [statistic, setStatistic] = useState({
    daily: {
      totalPrice: '',
      products: [],
    },
    weekly: {},
    monthly: {},
  });
  const times = [
    {
      label: 'Today',
      value: 'daily',
    },
    {
      label: 'Week',
      value: 'weekly',
    },
    {
      label: 'Month',
      value: 'monthly',
    },
  ];
  const [timeSelect, setTimeSelect] = useState({
    label: 'Today',
    value: 'daily',
  });
  const callStatistic = () => {
    const days = new Date();
    const day = days.getDate();
    const month = days.getMonth() + 1;
    const year = days.getFullYear();
    const hours = days.getHours();
    const minutes = days.getMinutes();
    const seconds = days.getSeconds();
    const timeNow = `${year}-0${month}-0${day} ${hours}:${minutes}:${seconds}`;
    getStatistical(timeNow)
      .then(res => {
        console.log(res);
        // @ts-ignore
        setStatistic(res);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(() => {
    callStatistic();
  }, []);
  return (
    <Container>
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        sizeIconLeft={30}
        onLeftPress={() => goBackNavigation()}
        title={'Statistical'}
        colorTitle={appColors.black900}
        fontSizeTitle={18}
        fontWeight={'600'}
      />
      <Box
        paddingHorizontal={10}
        flexDirection={'row'}
        alignSelf={'stretch'}
        justifyContent={'space-between'}>
        {times.map((item, index) => (
          <Box alignItems={'center'} justifyContent={'center'} key={index}>
            <ButtonComponent
              fontSize={16}
              nameColor={appColors.black900}
              name={item.label}
              key={index}
              onPress={() => {
                setTimeSelect({
                  label: item.label,
                  value: item.value,
                });
              }}
            />
            <Box
              height={3}
              width={30}
              backgroundColor={
                item.label === timeSelect.label
                  ? appColors.red
                  : appColors.transparent
              }>
              <View />
            </Box>
          </Box>
        ))}
      </Box>
      <Box padding={20}>
        <Box
          marginBottom={20}
          paddingHorizontal={10}
          paddingVertical={15}
          radius={20}
          flexDirection={'row'}
          alignItems={'center'}
          backgroundColor={appColors.white}
          alignSelf={'flex-start'}>
          <TextComponent
            marginRight={10}
            value={'Total revenue:'}
            fontSize={18}
            color={appColors.black900}
          />
          <TextComponent
            fontSize={18}
            // @ts-ignore
            value={
              timeSelect.value === 'daily'
                ? '$ ' + statistic.daily.totalPrice + '.0'
                : timeSelect.value === 'weekly'
                ? '$ ' + statistic.weekly.totalPrice + '.0'
                : '$ ' + statistic.monthly.totalPrice + '.0'
            }
            color={'#F68021'}
          />
        </Box>

        <FlatList
          data={
            timeSelect.value === 'daily'
              ? statistic.daily.products
              : timeSelect.value === 'weekly'
              ? statistic.weekly.products
              : statistic.monthly.products
          }
          renderItem={({item, index}) => (
            <Box marginBottom={20}>
              <Box flexDirection={'row'}>
                <ImageComponent
                  borderRadius={20}
                  width={100}
                  height={100}
                  resizeMode={'cover'}
                  src={{uri: imageUrl + item.image}}
                />
                <Box marginLeft={10}>
                  <TextComponent
                    value={item.name}
                    fontSize={16}
                    color={appColors.black900}
                  />
                  <TextComponent
                    value={`$ ${item.price}.0`}
                    fontSize={16}
                    color={appColors.black900}
                  />
                  <TextComponent
                    value={'Quantity: ' + item.quantity}
                    fontSize={16}
                    color={appColors.black900}
                  />
                </Box>
              </Box>
            </Box>
          )}
        />
      </Box>
    </Container>
  );
};

export default Statistical;
