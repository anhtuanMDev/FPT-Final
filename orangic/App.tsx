import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Provider } from 'react-redux';
import { store } from './src/helper/state/store';
import RootNavigation, { ParamList } from './src/navigation/RootNavigation';
import Login from './src/components/siduc/screen/login/Login';
import { styles } from './src/components/siduc/custom/Styles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FlashMessage from 'react-native-flash-message';


const App = () => {
  // Get user ID from async storage for authentication

  return (
    <GestureHandlerRootView
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Provider store={store}>
          <RootNavigation store={store} />
          {/* <Login id={''}/> */}
          <FlashMessage position="top" />
        </Provider>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};
// {
//   /**
//               showMessage({
//                 message: 'Testing',
//                 icon: 'danger',
//                 backgroundColor: Colors.green
//               });
//  */
// }
export default App;
