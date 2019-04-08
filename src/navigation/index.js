
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import IconWithBadge from './iconBadge';

import Welcome from '../containers/Welcome';
import ETHWallet from '../containers/ETHWallet';
import Browser from '../containers/Browser';
import Home from '../containers/Home';

const ETHWalletScreen = ({ navigation }) => ( <ETHWallet navigation={navigation} /> );
const BrowserScreen = ({ navigation }) => ( <Browser navigation={navigation} /> );
const WelcomeScreen = ({ navigation }) => ( <Welcome navigation={navigation} /> );
const HomeScreen = ({ navigation }) => ( <Home navigation={navigation} /> );

export const AppNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen
  },
  Browser: {
    screen: BrowserScreen
  },
  ETHWallet: {
    screen: ETHWalletScreen
  },
  Welcome: {
    screen: WelcomeScreen
  }
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
            iconName = `ios-home${focused ? '' : ''}`;
            // Sometimes we want to add badges to some icons. 
            // You can check the implementation below.
            if(focused) {
                return (<IconWithBadge size={25} color={'#4F8EF7'} name={iconName} badgeCount={3} />)
            } else {
                return (<IconWithBadge size={25} color={'gray'} name={iconName} badgeCount={3} />)
            }
        } else if (routeName === 'ETHWallet') {
            iconName = `ios-wallet${focused ? '' : ''}`;
        } else if (routeName === 'Welcome') {
            iconName = `ios-contact${focused ? '' : ''}`;
        } else if (routeName === 'Browser') {
            iconName = `md-globe${focused ? '' : ''}`;
        } 
        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#4F8EF7',
        inactiveTintColor: '#fff',
        style: {
          backgroundColor: '#0A0F24',
        }
      },
});

export default createAppContainer(AppNavigator);