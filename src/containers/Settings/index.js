import React, { Component } from 'react';
import { View, Text, AsyncStorage, Clipboard, StyleSheet, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Card } from '@ant-design/react-native';

import Web3 from 'web3';
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/v3/5209c849762f40ce866e3b1332596997'));

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.copyToClipboard = this.copyToClipboard.bind(this);
    this.deleteWallet = this.deleteWallet.bind(this);
  }

  /**
   * @method to export the private key by copying it to Clipboard
   */
  async copyToClipboard() {
    let wallet = await AsyncStorage.getItem('account');
    wallet = JSON.parse(wallet);
    Clipboard.setString(wallet.privateKey);
    alert('Your private key is copied to the clipboard.');
  }

  /**
   * @method to delete whole information(includes wallet)
   */
  async deleteWallet() {
    await AsyncStorage.removeItem('account');
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'Home' })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ width: '100%', alignSelf: 'center' }} onPress={() => { this.copyToClipboard() }}>
          <Card.Body style={styles.card}>
            <View style={{ paddingVertical: 20 }} >
              <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}> Backup Wallet </Text>
              <Text style={{ color: '#8A8D97', fontSize: 12, textAlign: 'center' }}> Get your private key. </Text>
            </View>
          </Card.Body>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%', alignSelf: 'center' }} onPress={() => { this.deleteWallet() }}>
          <Card.Body style={styles.card}>
            <View style={{ paddingVertical: 20 }} >
              <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}> Delete Wallet </Text>
              <Text style={{ color: '#8A8D97', fontSize: 12, textAlign: 'center' }}> Caution! Your wallet will be permanently deleted. </Text>
            </View>
          </Card.Body>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Settings;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: '#0A0F24'
    },
    card: {
      marginLeft: 20,
      marginRight: 20,
      marginBottom: 20,
      maxHeight: 100,
      backgroundColor: '#13182B',
      borderColor: '#13182B',
      borderWidth: 0,
      borderRadius: 10,
      width: '90%'
    },
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
  });
  