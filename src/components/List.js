import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  _navigate() {
      //code navigate to Item screen
      this.props.navigation.navigate('Item');
  }

  render() {
    return (
      <View>
        <Text> List Screen </Text>
        <TouchableOpacity
        onPress={() => {
            this._navigate();
        }}>
            <Text>Navigate to Item screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
