/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import PostScreen from './screens/PostScreen';
import {IPost} from './components/Post';
import DetailScreen from './screens/DetailScreen';

export type RootStackParamList = {
  Home: undefined;
  Detail: {data: string};
  Post: {data: IPost};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{headerShown: false, presentation: 'transparentModal'}}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Detail"
          options={{
            headerStyle: {
              backgroundColor: '#262626',
            },
          }}
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
  );
}

export default App;
