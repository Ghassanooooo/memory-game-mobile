import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import { StyleSheet, Text, View } from "react-native";
import GameBoard from "./src/containers/GameBoard";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View>
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
