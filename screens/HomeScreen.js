import React from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
        headerLeft : null
    };

    constructor(props) {
        super(props)

        this.state = {
            hasCurrentGame : false
        }
    }

    componentDidMount () { 
        this._getCurrentGame().then((data) => {
            this.setState({hasCurrentGame : data.name ? true : false})
        })
      } 

    async _getCurrentGame() {
        let response = await AsyncStorage.getItem('currentGame')
        let currentGame = await JSON.parse(response) || {}

        return currentGame
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
        <View>
            <Button
            onPress={() => navigate('TrackScore', {numTeams: 2})}
            title='Current Game'
            disabled={!this.state.hasCurrentGame}
            />
            <Button
            onPress={() => navigate('CreateNewGame', {numTeams: 2})}
            title='Create New Game'
            />
            <Button
            onPress={() => navigate('PastScores', {numTeams: 2})}
            title='Past Scores'
            />
        </View>
        );

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

