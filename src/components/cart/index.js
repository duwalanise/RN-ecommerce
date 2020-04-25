import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Button,
} from 'react-native';

import { baseUrl } from '../../constants/constants';

const ClothList = ({}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(
          `${baseUrl}/clothes?added_to_cart=true`,
        ).then((res) => res.json());
        setData(result);
      } catch (err) {
      } finally {
      }
    };
    fetchData();
  }, []);

  const removeFromCart = useCallback(
    (datum) => async () => {
      try {
        await fetch(`${baseUrl}/clothes/${datum.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...datum,
            added_to_cart: !datum.added_to_cart,
          }),
        });
        setData(data.filter((dt) => dt.id !== datum.id));
      } catch (err) {}
    },
    [data],
  );

  if (!data.length) {
    return (
      <View style={styles.emptyCart}>
        <Text>Cart Empty</Text>
      </View>
    );
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
                <Text style={styles.sectionPriceText}>{datum.price}</Text>
                <Text style={styles.sectionTitle}>{datum.name}</Text>
                <Text style={styles.sectionDescription}>
                  {datum.description}
                </Text>
                <View style={styles.button}>
                  <Button
                    onPress={removeFromCart(datum)}
                    color="#ffffff"
                    title="Remove From Cart"
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
  emptyCart: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fbf9ed',
  },
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
