/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {LogBox} from 'react-native';

import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import {IPost} from './components/Post';
import DetailScreen from './screens/DetailScreen';
import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
export type RootStackParamList = {
  Home: undefined;
  Detail: {
    data: {id: number; image: string};
    from?: any;
    parentId?: number;
    callback?: () => void;
  };
  Post: {data: IPost};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen
            options={{headerShown: false, presentation: 'transparentModal'}}
            name="Detail"
            component={DetailScreen}
          />
          <Stack.Screen
            name="Post"
            options={{
              headerStyle: {
                backgroundColor: '#262626',
              },
              headerBackTitle: '',
            }}
            component={PostScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
