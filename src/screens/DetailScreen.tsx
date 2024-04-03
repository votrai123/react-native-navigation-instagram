import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useLayoutEffect, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {RootStackParamList} from '../App';

interface IProps {}

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Post'
>;

const DetailScreen: React.FC<IProps> = () => {
  const route = useRoute();
  const {data, parentId, callback, from} = route.params;
  const navigation = useNavigation<DetailScreenNavigationProp>();

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const scale = useSharedValue(1);

  const gesture = Gesture.Pan()
    .onUpdate(value => {
      translateX.value = value.translationX * 0.8;
      translateY.value = value.translationY * 0.8;
      const distance = Math.sqrt(
        value.translationX * value.translationX +
          value.translationY * value.translationY,
      );
      const scaleValue = Math.min(Math.max(distance / 100, 1), 0.9);
      scale.value = withTiming(scaleValue, {duration: 300});
    })
    .onEnd(() => {
      if (translateY.value > 50 || translateX.value > 90) {
        opacity.value = 0;
        callback && runOnJS(callback)();
        runOnJS(navigation.goBack)();
      } else {
        translateX.value = withTiming(0, {duration: 100});
        translateY.value = withTiming(0, {duration: 100});
        scale.value = withTiming(1, {duration: 300});
        opacity.value = withTiming(1, {duration: 400});
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {translateX: translateX.value},
      {translateY: translateY.value},
      {scale: scale.value},
    ],
    backgroundColor: interpolateColor(
      opacity.value,
      [0, 1],
      ['transparent', '#262626'],
    ),
    borderRadius: 20,
    overflow: 'hidden',
  }));
  const parentTransitionTag = useMemo(() => {
    if (from) {
      return from + data.id.toString();
    }
    return data.id.toString();
  }, [data.id, from]);

  const childrenTransitionTag = useMemo(() => {
    if (from) {
      return from + data.id.toString() + parentId.toString();
    }
    return data.id.toString() + parentId.toString();
  }, [data.id, parentId, from]);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.container, animatedStyle]}
        sharedTransitionTag={parentTransitionTag}>
        <Animated.Image
          sharedTransitionTag={childrenTransitionTag}
          src={data.image}
          style={styles.image}
        />
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    aspectRatio: '1/1',
    justifyContent: 'center',
  },
});

export default DetailScreen;
