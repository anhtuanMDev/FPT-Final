import {View, Text, Image, FlatList, StatusBar, ScrollView} from 'react-native';
import React, {useState} from 'react';
import {Colors, fonts} from '../../custom/style/cpt';
import Carousel from 'pinar';
import Start from '../../../../assets/ics/star.svg';
import Delivery from '../../../../assets/ics/delivery.svg';
import Time from '../../../../assets/ics/time.svg';
import Square_btn from '../../custom/buttons/Square_btn';
import Quantity_btn from '../../custom/buttons/Quantity_btn';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {BlurView} from '@react-native-community/blur';
import HeartFill from '../../../../assets/ics/heart_fill.svg';
import HomeCardBig from '../../custom/cards/HomeCardBig';

const FoodDetail = () => {
  const [isBlurViewReady, setIsBlurViewReady] = useState(false);
  const onLayout = () => {
    setIsBlurViewReady(true);
  };
  const image = [
    require('../../../../assets/imgs/foodPoster1.jpg'),
    require('../../../../assets/imgs/foodPoster1.jpg'),
    require('../../../../assets/imgs/foodPoster1.jpg'),
  ];
  return (
    <ScrollView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />

      <View
        style={{
          width: 30,
          height: 30,
          position: 'absolute',
          top: 30,
          right: 40,
          zIndex: 5000,
          borderRadius: 15,
          overflow: 'hidden',
        }}>
        <BlurView
          style={{
            flex: 1,
            borderRadius: 15,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onLayout={onLayout}
          blurType="light"
          blurAmount={5}
          reducedTransparencyFallbackColor="white">
          {isBlurViewReady && (
            <TouchableOpacity
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <HeartFill width={16} height={16} fill={Colors.orange} />
            </TouchableOpacity>
          )}
        </BlurView>
      </View>
      <View
        style={{
          height: 230,
        }}>
        <Carousel
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            borderRadius: 15,
            overflow: 'hidden',
          }}
          autoplay={true}
          autoplayInterval={2400}
          showsDots={false}
          showsControls={false}
          loop>
          {image.map((item, index) => {
            return (
              <Image
                key={index}
                source={item}
                style={{width: '100%', height: '100%'}}
              />
            );
          })}
        </Carousel>
      </View>
      <Text style={[fonts.titleBold, {marginLeft: 20, marginBottom: 15}]}>
        Name
      </Text>

      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          marginHorizontal: 20,
        }}>
        <View
          style={{
            flexDirection: 'row',
            columnGap: 7,
            alignItems: 'center',
          }}>
          <Start width={18} height={18} fill={Colors.yellow} />
          <Text style={[fonts.sublineBold]}>4.5</Text>
          <Text style={[fonts.text, {textAlignVertical: 'top'}]}>4.5</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            columnGap: 7,
            alignItems: 'center',
          }}>
          <View
            style={{flexDirection: 'row', columnGap: 5, alignItems: 'center'}}>
            <Delivery width={18} height={18} fill={Colors.orange} />
            <Text>Delivery</Text>
          </View>
          <View
            style={{flexDirection: 'row', columnGap: 5, alignItems: 'center'}}>
            <Time width={16} height={16} fill={Colors.orange} />
            <Text>Time</Text>
          </View>
        </View>
      </View>

      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            paddingVertical: 15,
            paddingLeft: 15,
            marginVertical: 20,
          },
        ]}>
        <Text style={[fonts.captionBold, {color: Colors.green}]}>4.5$</Text>
        <View
          style={[{flexDirection: 'row', columnGap: 10, alignItems: 'center'}]}>
          <Quantity_btn
            type="minus"
            button={{btnStyle: {width: 30, height: 30, borderRadius: 15}}}
          />
          <Text style={[fonts.sublineBold, {color: Colors.black}]}>2</Text>
          <Quantity_btn
            type="plus"
            button={{btnStyle: {width: 30, height: 30, borderRadius: 15}}}
          />
        </View>
      </View>
      <Text
        style={[
          fonts.sublineBold,
          {marginHorizontal: 20, color: Colors.slate},
        ]}>
        Food's Introduction
      </Text>

      <Text
        style={[
          fonts.sublineBold,
          {
            marginHorizontal: 20,
            color: Colors.blue,
            backgroundColor: Colors.silver,
            paddingVertical: 20,
            marginVertical: 20,
            paddingLeft: 15,
          },
        ]}>
        You haven't use this service
      </Text>

      <View
        style={{
          flexDirection: 'row',
          marginBottom: 15,
          marginTop: 30,
          marginHorizontal: 20,
        }}>
        <Text style={[fonts.sublineBold, {flex: 1}]}>
          Món ăn đặc biệt của nhà hàng
        </Text>
        <Text style={[fonts.link, {color: Colors.green}]}>See all</Text>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <HomeCardBig
              style={{
                width: 300,
                marginHorizontal: 20,
                marginTop: 15,
                marginBottom: 30,
              }}
            />
          );
        }}
      />

<View
        style={{
          flexDirection: 'row',
          marginBottom: 15,
          marginTop: 30,
          marginHorizontal: 20,
        }}>
        <Text style={[fonts.sublineBold, {flex: 1}]}>
          Món ăn khác của nhà hàng
        </Text>
        <Text style={[fonts.link, {color: Colors.green}]}>See all</Text>
      </View>

      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <HomeCardBig
              style={{
                width: 300,
                marginHorizontal: 20,
                marginTop: 15,
                marginBottom: 30,
              }}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default FoodDetail;
