/**
 * Ethereum Wallet React Native App
 * 
 * @author Huseyin RAN
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import crypto from 'crypto';
import Web3 from 'web3';
const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/v3/5209c849762f40ce866e3b1332596997'));

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

export default class App extends Component {

  componentDidMount() {
    //console.log(crypto.randomBytes(32).toString('hex'));
    //console.log(web3);
    //console.log(web3.eth.accounts.create(web3.utils.randomHex(32)));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
