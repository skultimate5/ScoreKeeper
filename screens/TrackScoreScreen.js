import React from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class TrackScoreScreen extends React.Component {
  static navigationOptions = {
    title: 'Keep Score'
  };

  constructor(props) {
    super(props);

    this.state = { 
        // nameOfGame : this.props.navigation.state.params.nameOfGame,
        // numTeams: this.props.navigation.state.params.numTeams,
        // teamNames: emptyTeamNames
    }
  }

  render() {
    const { params } = this.props.navigation.state
    return (
      // render if --> if there is a current game in storage, load that one
      //if coming from nameteamsscreen, load that one
      //if no game in storage or not coming from nameteamsscreen, go back home with message that says no game set
      <View>
        <Text>Here are the teams for game {params.nameOfGame}: {params.teamNames}</Text>
        <Text>Game : {params.nameOfGame}</Text>
        {params.teamNames.map((name, i) => {
            return <View key={i}>
              <Text>{`${name}`}</Text>
              <Text>Current score here</Text>
              <Button
                onPress={this.addOne.bind(this, i)}
                title="+"
              />
              <Button
                onPress={this.subtractOne.bind(this, i)}
                title="-"
              />
            </View>
        })}
      </View>
    )
  }

  addOne(i){
    console.log("add" + i)
  }

  subtractOne(i){
    console.log("subtract" + i)
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