import React, { useState, createContext, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Cart from './components/cart';
import FindMe from './components/findme';
import ClothList from './components/clothlist';
import routes from './constants/routes';
import { baseUrl } from './constants/constants';

const Tab = createBottomTabNavigator();

export const DataContext = createContext(null);

export default () => {
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(undefined);
  const [data, setData] = useState([]);

  const updateData = (newData) => {
    setData(newData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetch(`${baseUrl}/clothes`).then((res) =>
          res.json(),
        );
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setIsFetching(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, error, isFetching, updateData }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              switch (route.name) {
                case routes.clothes: {
                  iconName = 'ios-shirt';
                  break;
                }
                case routes.cart: {
                  iconName = 'ios-cart';
                  break;
                }
                case routes.contact: {
                  iconName = 'ios-information-circle';
                  break;
                }
                default:
                  break;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <Tab.Screen name={routes.clothes} component={ClothList} />
          <Tab.Screen name={routes.cart} component={Cart} />
          <Tab.Screen name={routes.contact} component={FindMe} />
        </Tab.Navigator>
      </NavigationContainer>
    </DataContext.Provider>
  );
};
