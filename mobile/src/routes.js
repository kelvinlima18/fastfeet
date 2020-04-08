import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/MaterialIcons';
import SignIn from './pages/SignIn';
import Main from './pages/Main';
import DeliveryDetails from './pages/DeliveryDetails';
import Profile from './pages/Profile';
import Signature from './pages/Signature';
import DeliveryProblem from './pages/DeliveryProblem';
import ProblemList from './pages/ProblemList';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createStackNavigator({
          SignIn: {
            screen: SignIn,
            navigationOptions: {
              headerShown: false,
            },
          },
        }),
        App: createBottomTabNavigator(
          {
            Main: {
              screen: createStackNavigator({
                Main: {
                  screen: Main,
                  navigationOptions: {
                    headerShown: false,
                  },
                },
                DeliveryDetails: {
                  screen: DeliveryDetails,
                  navigationOptions: {
                    headerTitle: 'Informações da entrega',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 40,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
                Signature: {
                  screen: Signature,
                  navigationOptions: {
                    headerTitle: 'Confirmar entrega',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 50,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
                DeliveryProblem: {
                  screen: DeliveryProblem,
                  navigationOptions: {
                    headerTitle: 'Informar problema',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 50,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
                ProblemList: {
                  screen: ProblemList,
                  navigationOptions: {
                    headerTitle: 'Visualizar problemas',
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginLeft: 50,
                      borderBottomColor: 'transparent',
                    },
                  },
                },
              }),
              navigationOptions: {
                header: null,
                tabBarLabel: 'Entregas',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="reorder" size={30} color={tintColor} />
                ),
              },
            },
            Profile: {
              screen: createStackNavigator({
                Profile: {
                  screen: Profile,
                  navigationOptions: {
                    headerShown: false,
                  },
                },
              }),
              navigationOptions: {
                header: null,
                tabBarLabel: 'Meu perfil',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="account-circle" size={30} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#7D40E7',
              style: {
                height: 70,
                padding: 10,
              },
              labelStyle: {
                fontSize: 14,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
