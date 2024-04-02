import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useLayoutEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  FlatList,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

const {width: WIDTH_SCREEN} = Dimensions.get('window');

type DetailScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Detail'
>;

function PostScreen() {
  const router = useRoute();
  const navigation = useNavigation<DetailScreenNavigationProp>();
  const {data} = router.params;
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

  return (
    <View style={styles.container}>
      <Image src={data.avatar} style={styles.avatar} resizeMode={'center'} />
      <View style={styles.content}>
        <FlatList
          numColumns={3}
          data={data.images}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', {data: item})}
                activeOpacity={0.9}>
                <Image src={item} style={styles.image} />
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
