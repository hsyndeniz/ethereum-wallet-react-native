import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

class CreateWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#0A0F24', flex: 1 }}>
        <Text> CreateW allet </Text>
      </SafeAreaView>
    );
  }
}

export default CreateWallet;
