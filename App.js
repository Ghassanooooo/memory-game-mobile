import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { StyleSheet, Text, View } from "react-native";
import GameBoard from "./src/containers/GameBoard";
import ScoreBoard from "./src/containers/ScoreBoard";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <ScoreBoard />
          <GameBoard />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50
  }
});
