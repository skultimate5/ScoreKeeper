import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class WithLabel extends React.Component {
    render() {
      return (
        <View style={styles.labelContainer}>
          <View style={styles.label}>
            <Text>{this.props.label}</Text>
          </View>
          {this.props.children}
        </View>
      );
    }
  }

export class NameTeamsScreen extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.nameOfGame}`
  });

  constructor(props) {
      super(props);
      var numTeams = this.props.navigation.state.params.numTeams,
        emptyTeamNames = Array(parseInt(numTeams)).fill('')

      this.state = { 
          nameOfGame : this.props.navigation.state.params.nameOfGame,
          numTeams: this.props.navigation.state.params.numTeams,
          teamNames: emptyTeamNames
      }
  }

  render() {
    const { params } = this.props.navigation.state;
    const numArrayForTeams = Array(parseInt(params.numTeams)).fill().map((v,i)=>(i+1));
    return (
      <View>
        {numArrayForTeams.map(i => {
            return <WithLabel key={i} label={`Team Name ${i}`}>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={`${i}`}
              onChangeText={(text) => this.updateTeamNames(text, i)}              
              value={this.state.teamNames[i-1]}
            />
          </WithLabel>
        })}

        <Button
          onPress={this.goToTrackScores.bind(this)}
          title="Start Game"
        />
      </View>
    )
  }

  goToTrackScores() {

    var currentGame = {
      name: this.props.navigation.state.params.nameOfGame,
      teams: []
    }

    this.state.teamNames.forEach((name) => {
      currentGame.teams.push({name : name, score: 0})
    })

    AsyncStorage.setItem('currentGame', JSON.stringify(currentGame));

    this.props.navigation.navigate('TrackScore', {teamNames: this.state.teamNames, nameOfGame: this.props.navigation.state.params.nameOfGame})
  }

  updateTeamNames(text, i){
      var newTeamNames = this.state.teamNames
      newTeamNames[i-1] = text
      this.setState({teamNames: newTeamNames})
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    // labelContainer: {
    //     flexDirection: 'row',
    //     marginVertical: 2,
    //     flex: 1,
    // },
    // label: {
    //     width: 115,
    //     alignItems: 'flex-end',
    //     marginRight: 10,
    //     paddingTop: 2,
    // },
    // default: {
    //     height: 26,
    //     borderWidth: 0.5,
    //     borderColor: '#0f0f0f',
    //     flex: 1,
    //     fontSize: 13,
    //     padding: 4,
    // }
});