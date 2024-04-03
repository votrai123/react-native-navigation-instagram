import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  FlatList,
  GestureResponderEvent,
} from 'react-native';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export interface IPost {
  id: number;
  name: string;
  avatar: string;
  images: {id: number; image: string}[];
}

const {width: WIDTH_SCREEN, height: HEIGHT_SCREEN} = Dimensions.get('window');

type PostScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Post'
>;

const Post: React.FC<IPost> = ({id, images, avatar, name}) => {
  const navigation = useNavigation<PostScreenNavigationProp>();

  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const avatarOpacity = useSharedValue(1);
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.floor(contentOffsetX / WIDTH_SCREEN);
    setCurrentImageIndex(imageIndex);
  };

  let bullets = [];
  for (let i = 1; i <= images.length; i++) {
    bullets.push(
      <Text
        key={i}
        style={{
          ...styles.bullet,
          opacity: currentImageIndex + 1 === i ? 0.5 : 0.1,
        }}>
        &bull;
      </Text>,
    );
  }

  const avatarAnimated = useAnimatedStyle(() => ({
    opacity: avatarOpacity.value,
  }));

  const onBackCallback = useCallback(() => {
    avatarOpacity.value = withTiming(1, {duration: 300});
  }, [avatarOpacity]);

  const onNavigatePost = useCallback(
    (event: GestureResponderEvent) => {
      event.stopPropagation();
      navigation.navigate('Post', {
        data: {
          id,
          images,
          avatar,
          name,
        },
      });
    },
    [navigation, id, images, avatar, name],
  );

  const onNavigateDetail = useCallback(
    (data: {id: number; image: string}) => {
      avatarOpacity.value = withTiming(0, {duration: 300});
      navigation.navigate('Detail', {
        data,
        parentId: id,
        callback: onBackCallback,
        from: 'List',
      });
    },
    [avatarOpacity, id, navigation, onBackCallback],
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onNavigatePost} style={styles.header}>
        <Animated.View style={[styles.headerContent, avatarAnimated]}>
          <Image src={avatar} resizeMode="center" style={styles.avatar} />
          <Text>{name}</Text>
        </Animated.View>
      </TouchableOpacity>
      <FlatList
        horizontal
        decelerationRate={0}
        snapToInterval={WIDTH_SCREEN}
        onScroll={handleScroll}
        snapToAlignment={'center'}
        pagingEnabled
        scrollEventThrottle={200}
        keyExtractor={data => data.id.toString()}
        contentContainerStyle={{width: WIDTH_SCREEN * images.length}}
        showsHorizontalScrollIndicator={false}
        data={images}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item.id.toString()}
            activeOpacity={0.9}
            onPress={() => onNavigateDetail(item)}>
            <Animated.View sharedTransitionTag={'List' + item.id.toString()}>
              <Animated.Image
                src={item.image}
                resizeMode="cover"
                style={styles.img}
                sharedTransitionTag={'List' + item.id.toString() + id}
              />
            </Animated.View>
          </TouchableOpacity>
        )}
      />
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEIGHT_SCREEN * 0.7,
    position: 'relative',
  },
  img: {
    width: WIDTH_SCREEN,
    height: '100%',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 1,
  },
  bullets: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    justifyContent: 'flex-start',
    right: 'auto',
    alignSelf: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  bullet: {
    paddingHorizontal: 5,
    fontSize: 20,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 60,
    marginRight: 10,
  },
});

export default Post;
