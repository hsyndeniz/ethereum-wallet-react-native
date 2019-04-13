import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Card } from '@ant-design/react-native';
import Dialog from "react-native-dialog";

import Web3 from 'web3';
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/v3/5209c849762f40ce866e3b1332596997'));

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: {},
      dialogVisible: false,
      privateKey: ''
    };
    this.createWallet = this.createWallet.bind(this);
    this.storeData = this.storeData.bind(this);
    this.retrieveData = this.retrieveData.bind(this);
    this.restoreWallet = this.restoreWallet.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  /**
   * @method to create new Ethereum wallet
   */
  createWallet = async () => {
    const account = await web3.eth.accounts.create();
    console.log(account);
    await this.setState({ account });
    this.storeData();
  }

  /**
   * @method to store wallet info in localstorage
   */
  storeData = async () => {
    try {
      await AsyncStorage.setItem('account', JSON.stringify(this.state.account));
      console.log('done');
      this.props.checkWallet();
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @method to retrieve wallet info from localstorage
   */
  async retrieveData() {
    try {
      const value = await AsyncStorage.getItem('account');
      console.log(JSON.parse(value));
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * @method to restore Ethereum wallet from private key
   */
  async restoreWallet() {
    console.log(this.state);
    
    const account = web3.eth.accounts.privateKeyToAccount(this.state.privateKey);
    console.log(account);
    
    await this.setState({ account });
    this.storeData();
  }

  showDialog = () => {
    this.setState({ dialogVisible: true });
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  handleDelete = () => {
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
    this.setState({ dialogVisible: false });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.createWallet() }}>
          <Card.Body style={styles.card}>
            <View style={{ paddingVertical: 20 }} >
              <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}> Create Wallet </Text>
              <Text style={{ color: '#8A8D97', fontSize: 12, textAlign: 'center' }}> Create a new Ethereum wallet. </Text>
            </View>
          </Card.Body>
        </TouchableOpacity>
        <TouchableOpacity style={{ width: '100%' }} onPress={() => { this.showDialog() }}>
          <Card.Body style={styles.card}>
            <View style={{ paddingVertical: 20 }} >
              <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', fontWeight: 'bold' }}> Restore Wallet </Text>
              <Text style={{ color: '#8A8D97', fontSize: 12, textAlign: 'center' }}> Restore an Ethereum wallet from private key. </Text>
            </View>
          </Card.Body>
        </TouchableOpacity>
        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title> Restore Account </Dialog.Title>
          <Dialog.Description>
            Paste your private key to restore your Ethereum wallet.
          </Dialog.Description>
          <Dialog.Input onChangeText={privateKey => this.setState({ privateKey })} />
          <Dialog.Button label="Restore" onPress={this.restoreWallet} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>
      </View>
    );
  }
}

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#0A0F24'
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    maxHeight: 200,
    backgroundColor: '#13182B',
    borderColor: '#13182B',
    borderWidth: 0,
    borderRadius: 10,
    width: '90%'
  }
});
