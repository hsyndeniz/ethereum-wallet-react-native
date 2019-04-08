import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <Text> textInComponent </Text>
      </SafeAreaView>
    );
  }
}

export default Welcome;
