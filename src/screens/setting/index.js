import React, {useEffect, useState} from 'react';
import Container from '../../components/Container.tsx';
import Header from '../../components/Header.tsx';
import {goBackNavigation} from '../../utils/navigationUtils.ts';
import {appColors} from '../../assets/colors/appColors.ts';
import TextComponent from '../../components/TextComponent.tsx';
import ButtonComponent from '../../components/ButtonComponent.tsx';
import ImageComponent from '../../components/ImageComponent.tsx';
import Box from '../../components/Box.tsx';
import CardInfor from '../../components/CardInfor.tsx';
import {useUserInformation} from '../../hooks/useUserInformation.ts';
import {getInfor, updateInfor} from '../../services/api/auth.ts';

const Setting = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passWord, setPassWord] = useState('123456789');
  const [editableInfor, setEditableInfor] = useState(false);
  const getUser = () => {
    getInfor()
      .then(res => {
        console.log(res);
        setEmail(res.email);
        setName(res.name);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    const unsub = navigation.addListener('focus', () => {
      getUser();
    });
    return () => {
      unsub();
    };
  }, [navigation]);
  return (
    <Container>
      <Header
        iconLeft={require('../../assets/icons/left.png')}
        sizeIconLeft={30}
        onLeftPress={() => goBackNavigation()}
        title={'Setting'}
        colorTitle={appColors.black900}
        fontSizeTitle={18}
        fontWeight={'600'}
      />
      <Box
        paddingTop={15}
        paddingHorizontal={20}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TextComponent
          value={'Personal Information'}
          color={appColors.grays.gray500}
          fontSize={18}
          fontWeight={'500'}
        />
        <ButtonComponent
          name={'Pen edit infor user'}
          onPress={() => {
            setEditableInfor(prevState => !prevState);
            if (editableInfor) {
              updateInfor(name)
                .then(res => {
                  console.log(res);
                })
                .catch(e => {
                  console.log(e);
                });
            }
          }}>
          <ImageComponent
            src={
              editableInfor
                ? require('../../assets/icons/tick.png')
                : require('../../assets/icons/pen_icon.png')
            }
            tintColor={editableInfor ? '#46E661' : '#000000'}
            height={20}
            width={20}
          />
        </ButtonComponent>
      </Box>
      <CardInfor
        value={name}
        editable={editableInfor}
        onValueChange={value => setName(value)}
        label={'Name'}
        isPassWord={false}
      />
      <CardInfor
        editable={false}
        value={email}
        label={'Email'}
        onValueChange={value => setEmail(value)}
        isPassWord={false}
      />

      <Box
        paddingTop={15}
        paddingHorizontal={20}
        flexDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}>
        <TextComponent
          value={'Password'}
          color={appColors.grays.gray500}
          fontSize={18}
          fontWeight={'500'}
        />
        <ButtonComponent name={'Pen update pass'} onPress={() => {}}>
          <ImageComponent
            src={require('../../assets/icons/pen_icon.png')}
            height={20}
            width={20}
          />
        </ButtonComponent>
      </Box>
      <CardInfor value={'12919291911'} label={'Pass'} isPassWord={true} />
    </Container>
  );
};

export default Setting;
