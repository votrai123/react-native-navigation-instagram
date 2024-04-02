import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from 'react-native';
import {RootStackParamList} from '../App';
import {useNavigation} from '@react-navigation/native';

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

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={event => {
          event.stopPropagation();
          navigation.navigate('Post', {
            data: {
              id,
              images,
              avatar,
              name,
            },
          });
        }}
        style={styles.header}>
        <View style={styles.headerContent}>
          <Image src={avatar} resizeMode="center" style={styles.avatar} />
          <Text>{name}</Text>
        </View>
      </TouchableOpacity>
      <ScrollView
        horizontal
        decelerationRate={0}
        snapToInterval={WIDTH_SCREEN}
        onScroll={handleScroll}
        snapToAlignment={'center'}
        pagingEnabled
        scrollEventThrottle={200}
        contentContainerStyle={{width: WIDTH_SCREEN * images.length}}
        showsHorizontalScrollIndicator={false}>
        {images.map((img, index) => (
          <TouchableOpacity
            key={index.toString()}
            activeOpacity={0.9}
            onPress={() => navigation.navigate('Detail', {data: img})}>
            <Image src={img.image} resizeMode="cover" style={styles.img} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.bullets}>{bullets}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: HEIGHT_SCREEN * 0.7,
    position: 'relative',
    marginBottom: 30,
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
