/**
 * Ethereum Wallet React Native App
 * 
 * @author Huseyin RAN
 */

import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import Home from './src/navigation/index';
import Welcome from './src/containers/Welcome';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false
    }
    this.checkWallet = this.checkWallet.bind(this);
  }

  componentDidMount() {
    console.log(this.props); 
    this.checkWallet();
  }

  /**
   * @method to check wallet in Localstorage 
   */
  async checkWallet() {
    try {
      const value = await AsyncStorage.getItem('account');
      console.log(value);
      if (value == null) {
      } else {
        this.setState({ isSignedIn: true });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        { this.state.isSignedIn ? (<Home/>) : (<Welcome checkWallet={this.checkWallet} />) }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
