import {View, Text, FlatList} from 'react-native';
import React, {useCallback, useMemo, useRef} from 'react';
import {screens} from '../custom/style/scn';
import Search from '../custom/forms/Search';
import SearchPoster from '../../../assets/imgs/search.svg';

import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors, fonts} from '../custom/style/cpt';
import CardSmall from '../custom/cards/CardSmall';

const SearchScreen = () => {
  const [find, setFind] = React.useState('');
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index);
  }, []);

  const Empty = () => {
    return (
      <View style={[{marginTop: 30, alignItems: 'center'}]}>
        <SearchPoster width={300} height={300} />
        <Text
          style={[
            fonts.captionBold,
            {
              color: Colors.slate,
              width: 250,
              textAlign: 'center',
              marginTop: 10,
            },
          ]}>
          Sorry we can't find anything, try something else
        </Text>
      </View>
    );
  };

  const List = () => {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-around', marginBottom: 20}}
        contentContainerStyle={{
          justifyContent: 'space-between',
          padding: 25,
        }}
        renderItem={({item}) => {
          return <CardSmall />;
        }}
      />
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: Colors.white}}>
      <BottomSheetModalProvider>
        <View style={[screens.main_Cont]}>
          <Search
            onChange={text => {
              setFind(text);
            }}
            onSearch={() => {
              handlePresentModalPress();
            }}
          />
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}>
            <BottomSheetView>
              <List />
            </BottomSheetView>
          </BottomSheetModal>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default SearchScreen;
