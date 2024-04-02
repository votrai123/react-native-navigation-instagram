import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';

interface IProps {}

const DetailScreen: React.FC<IProps> = () => {
  const route = useRoute();
  const {data} = route.params;

  return (
    <View style={styles.container}>
      <Image src={data.image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#262626',
  },
  image: {
    width: '100%',
    aspectRatio: '1/1',
    justifyContent: 'center',
  },
});

export default DetailScreen;
