import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class PastScoresScreen extends React.Component {
  static navigationOptions = {
    title: 'Past Scores'
  };
  render() {
    const { params } = this.props.navigation.state
    return (
      <View>
        <Text>View Past scores here</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
});