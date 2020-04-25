import React, { useContext, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { baseUrl } from '../../constants/constants';
import { DataContext } from '../..';

const ClothList = ({}) => {
  const { data, error, isFetching, updateData } = useContext(DataContext);

  const changeLikeStatus = (id) => () => {
    updateData(
      data.map((dt) => {
        if (dt.id === id) {
          return {
            ...dt,
            liked: !dt.liked,
          };
        }
        return dt;
      }),
    );
  };

  const addToCart = (datum) => () => {
    updateData(
      data.map((dt) => {
        if (dt.id === datum.id) {
          return {
            ...dt,
            added_to_cart: !dt.added_to_cart,
          };
        }
        return dt;
      }),
    );
  };

  if (isFetching) {
    return (
      <View style={styles.loaderWrapper}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (error) {
    <View>
      <Text>{error.msg}</Text>
    </View>;
  }

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
      >
        <View style={styles.body}>
          {data.map((datum) => (
            <View style={styles.sectionContainer}>
              <Image
                style={styles.image}
                source={{
                  uri: datum.img_url,
                }}
              />
              <View style={styles.sectionDetails}>
                <View style={styles.sectionPrice}>
                  <Text style={styles.sectionPriceText}>{datum.price}</Text>
                  <TouchableOpacity onPress={changeLikeStatus(datum.id)}>
                    <Ionicons
                      name="ios-heart"
                      size={25}
                      color={datum.liked ? 'orange' : '#cccccc'}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.sectionTitle}>{datum.name}</Text>
                <Text style={styles.sectionDescription}>
                  {datum.description}
                </Text>
                <View style={styles.button}>
                  <Button
                    onPress={addToCart(datum)}
                    color="#ffffff"
                    title={
                      datum.added_to_cart ? 'Remove from Cart' : 'Add to Cart'
                    }
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ClothList;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fbf9ed',
    height: '100%',
  },
  loaderWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  body: {},
  image: {
    width: '100%',
    height: 300,
  },
  sectionContainer: {
    margin: 32,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  sectionDetails: {
    paddingTop: 10,
    backgroundColor: '#fbf9ed',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionPriceText: {
    fontSize: 18,
    color: '#333333',
  },
  sectionPrice: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  button: {
    color: '#ffffff',
    marginTop: 5,
    backgroundColor: '#32312e',
  },
});
