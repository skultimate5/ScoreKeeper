import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class TrackScoreScreen extends React.Component {
  static navigationOptions = {
    title: 'Keep Score'
  };
  render() {
    const { params } = this.props.navigation.state
    return (
      <View>
        <Text>Enter scores here for the {params.numTeams} teams</Text>
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