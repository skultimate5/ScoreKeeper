import React from 'react';
import { Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, List, ListItem } from 'react-native-elements';


import renderIf from '../renderIf'

export class PastScoresScreen extends React.Component {
  static navigationOptions = {
    title: 'Past Scores'
  };

  constructor(props) {
    super(props)

    this.state = {
      pastGames : [],
      isLoading: true
    }

    console.log(this.state.isLoading)
  }

  componentDidMount() {
    this._getPastGames()
  }

  render() {
    const { params } = this.props.navigation.state
    return (

      <View style={styles.container}>
        {renderIf(this.state.isLoading,
          <View><Text>Loading...</Text></View>
        )}
        {renderIf(!this.state.isLoading && this.state.pastGames != [],
          <View>
            {/* <FlatList
              data={this.state.pastGames}
              //renderItem={({item}) => <Text style={styles.item}>{item.name}</Text>}
              renderItem={({item}) => 
              <TouchableHighlight style={styles.item} onPress={this._goToGameInfo(item)}>
                <Text style={styles.text}>{item.name}</Text>
              </TouchableHighlight>
              }
              renderItem={({item}) => 
              <ListItem
                title={item.name}
                onPress={(item) => {console.log(item)}}
              />} 
            /> */}

            <ScrollView style={styles.scrollView}>
              <List style={styles.list}>
                {
                  this.state.pastGames.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.name}
                      subtitle={(new Date(item.endTime)).toLocaleString()}
                      onPress={() => this.props.navigation.navigate('PastScoresDetail', {item: item})}
                    />
                  ))
                }
              </List>
            </ScrollView>

            <Button
              raised
              icon={{name: 'trash', type: 'entypo'}}
              buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
              textStyle={{textAlign: 'center'}}
              title={`Delete History`}
              onPress={() => this.clearOutScores()}
            />
          </View>
        )}
        
      </View>
    )
  }

  _goToGameInfo(item) {
    console.log(item)
  }

  async _getPastGames() {
    let response = await AsyncStorage.getItem('pastGames')
    let pastGames = await JSON.parse(response) || []
    console.log(pastGames)

    pastGames.map((game, index) => {
      game.key = index
      return game
    })

    this.setState({pastGames : pastGames})    
    this.setState({isLoading : false})
  }

  clearOutScores() {
    Alert.alert(
      'Hold on!',
      'Are you sure you want to delete all past game info?',
      [
        {text: 'Yes', onPress: () => this.removePastGames()},
        {text: 'No', onPress: () => (console.log("Nothing to see here"))}
      ],
      { cancelable: false }
    )
  }

  removePastGames() {
    AsyncStorage.removeItem('pastGames').then((data) => {
      this.props.navigation.navigate('Home')
    })
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
      padding: 10,
      height: 44,
    },
    text: {
      fontSize: 18
    },
    list: {
      paddingBottom: 20
    },
    scrollView: {
      flex: 1
    }
});