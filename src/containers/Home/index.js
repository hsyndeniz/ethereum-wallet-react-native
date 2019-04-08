import React, { Component } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView>
        <Text> Home </Text>
        <Ionicons name='ios-home'/>
      </SafeAreaView>
    );
  }
}

export default Home;