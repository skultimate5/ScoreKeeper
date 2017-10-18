import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

export class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Welcome'
    };
    render() {
        const { navigate } = this.props.navigation;

        return (
        <View>
            <Button
            onPress={() => navigate('TrackScore', {numTeams: 2})}
            title='Current Game'
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

