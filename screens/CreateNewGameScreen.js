import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class CreateNewGameScreen extends React.Component {
  static navigationOptions = {
    title: 'Create New Game'
  };

  constructor(props) {
      super(props);
      this.state = { 
          nameOfGame : '',
          numTeams: ''
      }

      // AsyncStorage.setItem("myKey", "My value here");

      // AsyncStorage.getItem("myKey").then((value) => {
      //     this.setState({"myKey": value});
      //     console.log("hi key value")
      // }).done();
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            placeholder={'Name of game'}
            onChangeText={(nameOfGame) => this.setState({nameOfGame})}
            value={this.state.nameOfGame}
        />
        <Text>How many teams?</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(numTeams) => this.setState({numTeams})}
            value={this.state.numTeams}
            keyboardType={'numeric'}
        />
        <Button
          onPress={this.nameTeams.bind(this)}
          title="Next"
        />
      </View>
    )
  }

  nameTeams() {
    this.props.navigation.navigate('NameTeams', {numTeams: this.state.numTeams, nameOfGame: this.state.nameOfGame})
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