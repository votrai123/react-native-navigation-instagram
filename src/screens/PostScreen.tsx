import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useCallback, useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const {width: WIDTH_SCREEN} = Dimensions.get('window');

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

function PostScreen() {
  const router = useRoute();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const {data} = router.params;
  const avatarOpacity = useSharedValue(1);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: data.name,
      headerTitleStyle: {
        color: '#000000',
      },
      headerBackTitleVisible: false,
      headerTintColor: '#000000',
    });
  }, [navigation, data]);

  const avatarAnimated = useAnimatedStyle(() => ({
    opacity: avatarOpacity.value,
  }));

  const onBackCallback = useCallback(() => {
    avatarOpacity.value = withTiming(1, {duration: 300});
  }, [avatarOpacity]);

  const onNavigateDetail = useCallback(
    (currentData: {id: number; image: string}) => {
      avatarOpacity.value = withTiming(0, {duration: 300});
      navigation.navigate('Detail', {
        data: currentData,
        parentId: data.id,
        callback: onBackCallback,
        from: 'Post',
      });
    },
    [avatarOpacity, data.id, navigation, onBackCallback],
  );

  return (
    <View style={styles.container} key={'PostDetail' + data.id.toString()}>
      <Animated.Image
        src={data.avatar}
        style={[styles.avatar, avatarAnimated]}
        resizeMode={'center'}
      />
      <View style={styles.content}>
        <FlatList
          numColumns={3}
          data={data.images}
          keyExtractor={_data => _data.id.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                key={item.id.toString()}
                onPress={() => onNavigateDetail(item)}
                activeOpacity={0.9}>
                <Animated.View
                  sharedTransitionTag={'Post' + item.id.toString()}>
                  <Animated.Image
                    src={item.image}
                    style={styles.image}
                    sharedTransitionTag={
                      'Post' + item.id.toString() + data.id.toString()
                    }
                  />
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 60,
    alignSelf: 'center',
    marginTop: 20,
  },
  image: {
    width: WIDTH_SCREEN / 3,
    height: (WIDTH_SCREEN / 3) * 1.5,
  },
});

export default PostScreen;
