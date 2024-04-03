import React from 'react';
import {StyleSheet, View, FlatList, Dimensions} from 'react-native';
import Post, {IPost} from '../components/Post';
import {HOME_DATA} from '../data/home-data';
import {SafeAreaView} from 'react-native-safe-area-context';
const {height: HEIGHT_SCREEN} = Dimensions.get('window');

function HomeScreen() {
  const renderItem = ({item}: {item: IPost}) => {
    return <Post {...item} />;
  };
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={HOME_DATA}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          getItemLayout={(data, index) => ({
            length: HEIGHT_SCREEN * 0.7,
            offset: HEIGHT_SCREEN * 0.7 * index,
            index,
          })}
          keyExtractor={item => item.id.toString()}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
});

export default HomeScreen;
