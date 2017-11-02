import React from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { FormLabel, FormInput, Button } from 'react-native-elements';

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
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View>
        <FormLabel>Name of Game</FormLabel>
        <FormInput onChangeText={(nameOfGame) => this.setState({nameOfGame})}/>
        <FormLabel>Number of Teams</FormLabel>
        <FormInput onChangeText={(numTeams) => this.setState({numTeams})}/>

        <Button
          raised
          buttonStyle={[{backgroundColor: '#2095F2'}, styles.button]}
          textStyle={{textAlign: 'center'}}
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
    },
    button: {
      borderRadius: 10,
      marginTop: 25
    },
});