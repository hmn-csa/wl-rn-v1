import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';

export default class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> Item Screen with Drawer </Text>
        <Button
        title='Open Drawer' 
        onPress={() => {
            this.props.navigation.openDrawer();
        }}/>
      </View>
    );
  }
}
