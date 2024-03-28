/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function DetailsScreen() {
  return (
    <View style={styles.sectionContainer}>
      <Text>Details Screen</Text>
    </View>
  );
}
type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

function HomeScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  return (
    <View style={styles.sectionContainer}>
      <Text>Home Screen</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Detail')}>
        <Text style={styles.titleButton}>Open Detail Screen </Text>
      </TouchableOpacity>
    </View>
  );
}

type RootStackParamList = {
  Home: undefined;
  Detail: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Detail" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 24,
    marginTop: 20,
    backgroundColor: '#f5c1f5',
  },
  titleButton: {
    fontSize: 14,
    color: 'black',
  },
});

export default App;
