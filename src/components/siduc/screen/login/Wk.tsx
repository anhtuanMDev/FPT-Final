import { View, Text, StatusBar, Image } from 'react-native';
import React, { useState } from 'react';
import { styles, Colors, font, components } from '../../custom/Styles';
import Button from '../../custom/Button';
import PagerView from 'react-native-pager-view';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { NavigateStackProp } from '../../../../navigation/UserStackNavigation';


const Wk = (prop: NavigateStackProp) => {
  const [currentPage, setCurrentPage] = useState(0);
  const {navigate} = prop;

  const handlePageScroll = (position: number) => {
    setCurrentPage(position);
  };

  const handlePageSelected = (position: number) => {
    setCurrentPage(position);
  };

  const renderIndicators = () => {
    const indicators = [];
    const totalPages = 4;

    for (let i = 0; i < totalPages; i++) {
      const indicatorStyle =
        i === currentPage
          ? components.activeIndicator1
          : components.inactiveIndicator;
      indicators.push(
        <View key={i} style={[components.indicator, indicatorStyle]} />,
      );
    }

    return indicators;
  };

  return (
    <View style={[styles.container, { paddingBottom: 10 }]}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />

      <PagerView
        onPageScroll={event => handlePageScroll(event.nativeEvent.position)}
        onPageSelected={event => handlePageSelected(event.nativeEvent.position)}
        style={{ flex: 1, marginBottom: 40 }}
        initialPage={0}>

        <View key="1" style={[styles.container1,]}>
          <View >
            <Text style={[font.welcome, {}]}>
              Welcome to {' '}
              <Text style={[{ color: Colors.active }]}>Organic</Text>
            </Text>
            <Text style={[font.subline]}>Your favourite foods delivered fast at your door.</Text>
          </View>
          <Image
            resizeMode='contain'
            source={require('../../assets/img/Orderfood.png')}
            style={{ width: '100%', height: 320 }}
          />

          <View
            style={[
              {
                width: 'auto',
                alignSelf: 'center',
              },
            ]}>
            <Text
              style={[
                font.titleBold,
                {
                  color: Colors.Main,
                  textAlign: 'center',
                  justifyContent: 'center',
                }
              ]}>
              Easy to Order
            </Text>

            <Text
              style={[
                font.body,
                {
                  width: 280,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}>
              Experience seamless convenience with our fast and user-friendly food delivery app, making ordering your favorite meals a breeze!
            </Text>
          </View>
        </View>
        <View key="2" style={[styles.container1,]}>
          <View >
            <Text style={[font.welcome, {}]}>
              Welcome to {' '}
              <Text style={[{ color: Colors.active }]}>Organic</Text>
            </Text>
            <Text style={[font.subline]}>Your favourite foods delivered fast at your door.</Text>
          </View>
          <Image
            source={require('../../assets/img/Chef-bro.png')}
            resizeMode="contain"
            style={{ width: '100%', height: 320, }}
          />

          <View
            style={[
              {
                width: 'auto',
                alignSelf: 'center',
              },
            ]}>
            <Text
              style={[
                font.titleBold,
                {
                  color: Colors.Main,
                  textAlign: 'center',
                  justifyContent: 'center',
                }
              ]}>
              Has the most delicious food
            </Text>

            <Text
              style={[
                font.body,
                {
                  width: 280,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}>
              Enjoy dishes expertly prepared by experienced chefs for a wonderful dining experience!
            </Text>
          </View>
        </View>
        <View key="3" style={[styles.container1,]}>
          <View >
            <Text style={[font.welcome, {}]}>
              Welcome to {' '}
              <Text style={[{ color: Colors.active }]}>Organic</Text>
            </Text>
            <Text style={[font.subline]}>Your favourite foods delivered fast at your door.</Text>
          </View>
          <Image
            source={require('../../assets/img/Healthy-lifestyle-bro.png')}
            resizeMode="contain"
            style={{ width: 'auto', height: 320 }}
          />

          <View
            style={[
              {
                width: 'auto',
                alignSelf: 'center',
              },
            ]}>
            <Text
              style={[
                font.titleBold,
                {
                  color: Colors.Main,
                  textAlign: 'center',
                  justifyContent: 'center',
                }
              ]}>
              Schedule your own meals
            </Text>

            <Text
              style={[
                font.body,
                {
                  width: 280,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}>
                Take charge of your health with scheduled, nutritious meals tailored just for you.
            </Text>
          </View>
        </View>

        <View key="4" style={[styles.container1,]}>
          <View >
            <Text style={[font.welcome, {}]}>
              Welcome to {' '}
              <Text style={[{ color: Colors.active }]}>Organic</Text>
            </Text>
            <Text style={[font.subline]}>Your favourite foods delivered fast at your door.</Text>
          </View>
          <Image
            source={require('../../assets/img/chocoDay.png')}
            resizeMode="contain"
            style={{ width: 'auto', height: 320 }}
          />

          <View
            style={[
              {
                width: 'auto',
                alignSelf: 'center',
              },
            ]}>
            <Text
              style={[
                font.titleBold,
                {
                  color: Colors.Main,
                  textAlign: 'center',
                  justifyContent: 'center',
                }
              ]}>
              What are you waiting for ?
            </Text>

            <Text
              style={[
                font.body,
                {
                  width: 280,
                  textAlign: 'center',
                  justifyContent: 'center',
                  alignSelf: 'center',
                },
              ]}>
                Explore a world of culinary delights – place your order now and discover a variety of tempting dishes waiting just for you!
            </Text>
          </View>
        </View>
      </PagerView>

      <View style={components.indicatorContainer}>{renderIndicators()}</View>

      <Button title="Get Started" style={{ marginHorizontal: 20, marginTop: 20 }} onPress={() => {
        navigate('Login');
      }} />
    </View>
  );
};

export default Wk;