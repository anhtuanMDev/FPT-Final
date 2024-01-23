import {View, Text, Image, FlatList, Dimensions, Animated, ViewToken, ViewStyle, ImageStyle} from 'react-native';
import React, {useRef, useState} from 'react';
import {sliders} from '../style/cpt';
import Pagination from './Pagination';

const img: any[] = [
  require('../../../../assets/imgs/foodPoster1.jpg'),
  require('../../../../assets/imgs/foodPoster2.png'),
  require('../../../../assets/imgs/foodPoster3.jpg'),
  require('../../../../assets/imgs/foodPoster4.jpg'),
  require('../../../../assets/imgs/foodPoster5.jpg'),
];

type Prop = {
  imageArray?: any[];
  style?: ViewStyle | ViewStyle[];
  imageStyle?: ImageStyle | ImageStyle[];
}

const SliderCarousel = (props: Prop) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  // const [index, setIndex] = useState(0);
  const data:any[] = props?.imageArray || img;

  const handleScroll = (event: any) => {
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    })(event);
  };

  // Change which pagination indicator is active base on scroll position
  // const handleViewableItemsChanged = useRef(({viewableItems}:{ viewableItems: ViewToken[] }) => {
  //     setIndex(viewableItems[0]?.index || 0);
  // }).current;

  const viewConfig = useRef({viewAreaCoveragePercentThreshold: 60}).current;
  
  return (
    <View style={[sliders.carousel_Cont, props?.style]}>
      <FlatList
        data={data}
        contentContainerStyle={{borderRadius: 15, overflow: 'hidden'}}
        renderItem={({item, index}) => {
          return (
            <Image
              key={index}
              source={item}
              style={[sliders.carousel_Item, props?.imageStyle]}
              resizeMode="stretch"
            />
          );
        }}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        decelerationRate={'normal'}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        // onViewableItemsChanged={handleViewableItemsChanged}
        viewabilityConfig={viewConfig}
      />
      <Pagination scrollX={scrollX} data={data}/>
    </View>
  );
};

export default SliderCarousel;
