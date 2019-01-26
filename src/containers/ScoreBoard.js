import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../store/actions";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  Button
} from "react-native";

const styles = StyleSheet.create({
  scoreBoardActive: {
    backgroundColor: "rgba(255, 50, 50, 0.3)",
    borderRadius: 7,
    margin: 0,
    width: "80%",
    height: 40,
    position: "relative"
  },
  scoreBoard: {
    marginBottom: 20,
    width: "100%",
    height: 40,
    position: "absolute",
    top: "50%",
    zIndex: 10000
  },
  title: {
    color: "blue"
  },
  highestScore: {
    top: 10,
    left: 20,
    fontSize: 20,
    position: "absolute",
    color: "orange"
  },
  loaderWrapper: {
    flex: 1,
    flexDirection: "row",
    position: "absolute",
    height: 60,
    width: "100%",
    zIndex: 10000,
    top: -20
  },
  loader: {
    color: "white"
  }
});
class ScoreBoard extends Component {
  componentDidUpdate() {
    this.props.setHighScore(this.props.score);
  }

  render() {
    let showScore = this.props.scoreOn ? (
      <View>
        <Text style={styles.title}>{this.props.score} pt</Text>
        <Text style={styles.highestScore}>HS: {this.props.highScore} pt</Text>
      </View>
    ) : (
      <Text style={styles.title}>MEMORY GAME</Text>
    );

    //If this.props.isStarting === true, show reset button instead of start & show generated cards
    let button = <TouchableOpacity />;
    let startOrReset = this.props.isStarting ? (
      <Text>RESET</Text>
    ) : (
      <Text>START THE GAME </Text>
    );
    if (this.props.isPageLoading === false) {
      button = (
        <TouchableOpacity onPress={this.props.startGame.bind(this)}>
          {startOrReset}
        </TouchableOpacity>
      );
    }

    let loadingPage = this.props.isPageLoading ? (
      <View style={styles.loaderWrapper}>
        <Text style={styles.loader}>LOADING</Text>
      </View>
    ) : (
      <View />
    );

    return (
      <Fragment>
        <View
          style={
            this.props.isStarting ? styles.scoreBoardActive : styles.scoreBoard
          }
        >
          {loadingPage}
          {showScore}
          {button}
        </View>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.game.cards,
    isStarting: state.game.isStarting,
    scoreOn: state.game.scoreOn,
    score: state.game.score,
    highScore: state.game.highestScore,
    show: state.game.show,
    isCompleted: state.game.isCompleted,
    isPageLoading: state.game.isPageLoading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreBoard);
