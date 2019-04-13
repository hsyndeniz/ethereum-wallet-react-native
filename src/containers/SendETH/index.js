import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Dialog from "react-native-dialog";

import EthereumTx from 'ethereumjs-tx';
import util from 'ethereumjs-util';
import Web3 from 'web3';
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider('https://mainnet.infura.io/v3/5209c849762f40ce866e3b1332596997'));

class SendEther extends Component {
  static navigationOptions = {
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: '#0A0F24',
      elevation: 0,
      borderBottomWidth: 0,
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      amount: '',
      dialogVisible: false,
      transactionLoader: false,
      receiver: undefined,
      account: null,
      ETHBalance: null,
    };
    this.showDialog = this.showDialog.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.transferEther = this.transferEther.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.putPoint = this.putPoint.bind(this);
    this.deleteLastChar = this.deleteLastChar.bind(this);
    this.checkWallet = this.checkWallet.bind(this);
    this.getETHBalance = this.getETHBalance.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
    this.checkWallet();
  }

  /**
   * @method to check wallet in localstorage
   */
  async checkWallet() {
    try {
      const value = await AsyncStorage.getItem('account');
      if (value == null) {
      } else {
        this.setState({ account: JSON.parse(value) }, () => {
          this.getETHBalance();
          console.log(this.state);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @method to fetch balance of wallet
   */  
  async getETHBalance() {
    let balance = await web3.eth.getBalance(this.state.account.address);
    balance = web3.utils.fromWei(balance, 'ether');
    console.log(`ETH Balance: ${balance}`);
    console.log(`ETH Balance: ${Number(balance).toFixed(3)}`);
    await this.setState({ ETHBalance: Number(balance).toFixed(3) });
  }

  /**
   * @method to transfer Ether
   */  
  async transferEther() {
    await this.setState({ dialogVisible: false })
    // ETH address validation
    if (this.state.receiver === undefined || this.state.receiver.length !== 42 || web3.utils.isAddress(this.state.receiver) === false ) {
      Alert.alert(
        'Wrong Ethereum Address!',
        'The Ethereum address you entered is not valid!',
        [
          {text: 'OK', onPress: () => console.log()},
        ]
      );
      return new Error('wrong address'); 
    }
    const privateKey = util.toBuffer(this.state.account.privateKey);
    let count = await web3.eth.getTransactionCount(this.state.account.address);
    let gasPriceGwei = 3;
    let gasLimit = 3000000;
    
    console.log('====================================');
    let newAmount = 1000000000000000000 * Number(this.state.amount)
    console.log(newAmount);
    console.log(10000000000000000);
    console.log('====================================');

    let rawTransaction = {
      "from": this.state.account.address,
      "to": this.state.receiver,
      "value": web3.utils.toHex(newAmount),
      "gasPrice": web3.utils.toHex(gasPriceGwei * 1e9),
      "gasLimit": web3.utils.toHex(gasLimit),
      "nonce": "0x" + count.toString(16)
    };

    let tx = new EthereumTx(rawTransaction);
    // sign transaction with private key
    tx.sign(privateKey);
    let serializedTx = tx.serialize();

    Alert.alert(
      'Processing...',
      '',
      [
        {text: 'OK', onPress: () => this.handleCancel()},
      ]
    );

    // Send signed transaction to Ethereum blockchain
    web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex')).then(result => {
      console.log(result);
      
      Alert.alert(
        'Sent successfully!',
        '',
        [
          {text: 'OK', onPress: () =>  this.props.navigation.popToTop()},
        ]
      );
    }).catch(error => {
      console.log(error);
      this.setState({ error, receiver: undefined });
      
      Alert.alert(
        'Insufficient funds!',
        '',
        [
          {text: 'OK', onPress: () => console.log(error)},
        ]
      );
    });
  }

  showDialog = () => {
    if (this.state.receiver === undefined) {
      this.setState({ dialogVisible: true });
    } else {
      this.transferEther();
    }
  };

  handleCancel = () => {
    this.setState({ dialogVisible: false });
  };

  setAmount(amount) {
    this.setState({ amount: this.state.amount.toString() + amount  });
  }

  deleteLastChar() {
    this.setState({ amount: this.state.amount.substring(0, this.state.amount.length - 1) });
  }

  putPoint() {
    console.log(this.state.amount.includes('.'));
    
    if (this.state.amount.includes('.')) {
      
    } else {
      this.setState({ amount: this.state.amount.toString() + '.'  });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Text style={{ textAlign: 'center', color: '#E5BF30', fontSize: 20, position: 'absolute', top: '10%' }}>
          Available Balance:  { this.state.ETHBalance } ETH
        </Text>

        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 35, fontWeight: 'bold', position: 'absolute', top: '20%' }}>
          { this.state.amount.length ? ( this.state.amount ) : ('0.000') } ETH
        </Text>
        <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20, position: 'absolute', top: '27%' }}>
          
        </Text>

        <View style={{ width: '100%', position: 'absolute', bottom: 50 }} >
          <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '12%' }} >
              <TouchableOpacity onPress={() => { this.setAmount('1') }} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
                <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 1 </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setAmount('2') }} style={{ width: '32%', marginHorizontal: 10, marginVertical: 15 }} >
                <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 2 </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.setAmount('3') }} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
                <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 3 </Text>
              </TouchableOpacity>
            </View>
            
          <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '12%' }} >
            <TouchableOpacity onPress={() => { this.setAmount('4') }} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 4 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setAmount('5') }} style={{ width: '32%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 5 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setAmount('6') }} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 6 </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '12%' }} >
            <TouchableOpacity onPress={() => { this.setAmount('7') }} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 7 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setAmount('8') }} style={{ width: '32%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 8 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setAmount('9') }} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 9 </Text>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: 'row', width: '100%', paddingHorizontal: '12%' }} >
            <TouchableOpacity onPress={() => { this.putPoint() }} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > . </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { this.setAmount('0') }} style={{ width: '32%', marginHorizontal: 10, marginVertical: 15 }} >
              <Text style={{ color: '#fff', fontSize: 35, fontWeight: '400' }} > 0 </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.deleteLastChar} style={{ width: '34%', marginHorizontal: 10, marginVertical: 15 }} >
              <Icon style={{ fontSize: 30, position: 'relative', top: 10 }} name='delete' color='#fff' />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
              onPress={this.showDialog}
              style={{ width: '90%', borderRadius: 10, backgroundColor: '#13182B', padding: 16, alignSelf: 'center', marginTop: 10, }}>
            <Text style={{ color: '#E5BF30', textAlign: 'center', fontWeight: '400', fontSize: 20 }} > Send ETH </Text>
          </TouchableOpacity>
        </View>

        <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title> Sen ETH </Dialog.Title>
          <Dialog.Description>
            Enter the recipient's Ethereum address below.
          </Dialog.Description>
          <Dialog.Input onChangeText={receiver => this.setState({ receiver }, () => { console.log(this.state) })} />
          <Dialog.Button label="Send" onPress={this.transferEther} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.transactionLoader}>
          <Dialog.Title> Processing </Dialog.Title>
          <Dialog.Description>
            <ActivityIndicator/>
          </Dialog.Description>
        </Dialog.Container>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#0A0F24'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  text: {
    color: '#8A8D97'
  }
});

export default SendEther;
