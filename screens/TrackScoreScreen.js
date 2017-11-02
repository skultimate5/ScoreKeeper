import React from 'react';
import { AsyncStorage, StyleSheet, Text, TextInput, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Badge, Button, Icon } from 'react-native-elements';

import renderIf from '../renderIf'

export class TrackScoreScreen extends React.Component {

  static navigationOptions = {
    title: 'Keep Score',
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading : true,
      currentGame: {name: '', teams: [{name: 'team1', score: 0}]}
    }
  }

  componentDidMount () { 
    this._getCurrentGame()
  } 

  async _getCurrentGame() {
    let response = await AsyncStorage.getItem('currentGame')
    let currentGame = await JSON.parse(response) || {}

    currentGame.startTime = Date.now()

    this.setState({currentGame : currentGame})
    this.setState({isLoading : false})
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      // render if --> if there is a current game in storage, load that one
      //if coming from nameteamsscreen, load that one
      //if no game in storage or not coming from nameteamsscreen, go back home with message that says no game set
      <View style={styles.container}>
        {renderIf(this.state.isLoading,
          <View><Text>Loading...</Text></View>
        )}

        {renderIf(!this.state.isLoading,
          <View style={styles.container}>
            <View style={styles.hero}>
              <Text style={styles.heading}>Game : {this.state.currentGame.name}</Text>
            </View>
            {/* <Text style={styles.text}>Game : {this.state.currentGame.name}</Text> */}
            {this.state.currentGame.teams.map((team, i) => {
                return <View key={i} style={styles.teamContainer}>
                <Text style={styles.text}>{`${team.name}  :  `}</Text>
                <Badge containerStyle={{ backgroundColor: '#2095F2', paddingRight: 10}}>
                  <Text style={styles.text}>{`${team.score}`}</Text>
                </Badge>

                  <Icon
                    raised
                    name='add'
                    color='#f50'
                    onPress={this.addOne.bind(this, i)} />

                  <Icon
                    raised
                    name='minus'
                    type='entypo'
                    color='#f50'
                    onPress={this.subtractOne.bind(this, i)} />
                </View>
            })}

            <Button
              raised
              icon={{name: 'done'}}
              buttonStyle={[{backgroundColor: '#02968A'}, styles.lowerButtons]}
              textStyle={{textAlign: 'center'}}
              onPress={this.finishGame.bind(this)}
              title="Save and Finish"
            />

            <Button
              raised
              icon={{name: 'home'}}
              buttonStyle={[{backgroundColor: '#9C28B0'}, styles.lowerButtons]}
              textStyle={{textAlign: 'center'}}
              onPress={() => navigate('Home')}
              title='Go Home'
            />
          </View>
        )}
      </View>
      
    )
  }

  addOne(i){
    var updatedCurrentGameByScore = this.state.currentGame,
      currentTeamScore = updatedCurrentGameByScore.teams[i].score;
    
      updatedCurrentGameByScore.teams[i].score = currentTeamScore + 1

    this.setState({currentGame: updatedCurrentGameByScore})
    
    //save to storage
    this._updateCurrentGame(updatedCurrentGameByScore)
  }

  async _updateCurrentGame(currentGame){
    await AsyncStorage.setItem('currentGame', JSON.stringify(currentGame))
  }

  subtractOne(i){
    var updatedCurrentGameByScore = this.state.currentGame,
    currentTeamScore = updatedCurrentGameByScore.teams[i].score;
  
    updatedCurrentGameByScore.teams[i].score = currentTeamScore - 1

    this.setState({currentGame: updatedCurrentGameByScore})
    
    //save to storage
    this._updateCurrentGame(updatedCurrentGameByScore)
  }

  finishGame(){
    //remove currentGame data stored in async storage
    this._updateCurrentGame('')
    //move that data to pastGame Storage
    this._updatePastGames(this.state.currentGame)
    //go home
    this.props.navigation.navigate('Home')
    //show popup?
  }

  async _updatePastGames(game) {
    let response = await AsyncStorage.getItem('pastGames')
    let pastGames = await JSON.parse(response) || []

    game.endTime = Date.now()

    pastGames.push(game)

    await AsyncStorage.setItem('pastGames', JSON.stringify(pastGames))
  }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        //justifyContent: 'center'
    },
    header: {
      backgroundColor: '#fff',
    },
    teamContainer: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center', 
      justifyContent: 'center'
    },
    text: {
      fontSize: 20
    },
    button: {
      borderRadius: 10
    },
    lowerButtons: {
      borderRadius: 10,
      marginTop: 25
    },
    heading: {
      color: 'black',
      marginTop: 10,
      fontSize: 22,
    }
});