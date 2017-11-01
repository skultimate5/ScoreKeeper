import React from 'react';
import { Alert, AsyncStorage, FlatList, ScrollView, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, List, ListItem } from 'react-native-elements';


import renderIf from '../renderIf'

export class PastScoresDetailScreen extends React.Component {
  static navigationOptions = {
    title: 'Past Scores'
  };

  constructor(props) {
    super(props)

    this.state = {
        item: this.props.navigation.state.params.item
    }
  }

  render() {
    const { params } = this.props.navigation.state
    return (

      <View style={styles.container}>
          <Text>{this.state.item.name} </Text>
            <Button
              raised
              icon={{name: 'trash', type: 'entypo'}}
              buttonStyle={{backgroundColor: 'red', borderRadius: 10}}
              textStyle={{textAlign: 'center'}}
              title={`Delete Game`}
              onPress={() => this.deleteGame()}
            />
          </View>
    )
  }

  deleteGame() {
    console.log("Deleting game")
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