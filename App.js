import React from 'react';
import { StackNavigator } from 'react-navigation';
import { HomeScreen } from './screens/HomeScreen';
import { TrackScoreScreen } from './screens/TrackScoreScreen';

const ScoreKeeper = StackNavigator({
    Home: {screen: HomeScreen},
    TrackScore: {screen: TrackScoreScreen}
  },
  {
    initialRouteName: 'Home',
  }
)

export default class App extends React.Component {
  render() {
    return <ScoreKeeper />;
  }
}
