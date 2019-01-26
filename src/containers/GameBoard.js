import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
import backgroudImgCard from "../assets/back.jpg";
import Card from "../components/Card";
import genCards from "../data/generateCards";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as actions from "../../store/actions";

class GameBoard extends Component {
  componentDidUpdate() {
    if (this.props.show) {
      let indexArray = [...Array(this.props.cards.length).keys()];
      for (let i = 0; i < this.props.cards.length; i++) {
        let randomNumber = Math.floor(Math.random() * indexArray.length);
        let selected = indexArray.splice(randomNumber, 1);
        setTimeout(() => {
          this.props.showCard(selected);
        }, 100 + i * 130);
      }
      setTimeout(() => {
        this.props.hideCard();
      }, 4000);
    }
    //put flipped cards into an array and pass them to reducers
    let flippedCard = [];
    if (this.props.gameOn) {
      flippedCard = this.props.cards.filter(card => {
        return card.flipped === true && card.matched === false;
      });
    }
    if (flippedCard.length === 2) {
      this.props.lockCard();
      if (this.props.isLocked) {
        setTimeout(() => {
          this.props.matchCard(flippedCard);
          flippedCard = [];
        }, 500);
      }
    }
    let complete = this.props.cards.filter(card => {
      return card.flipped === true && card.matched === true;
    });
    if (complete.length === this.props.cards.length) {
      this.props.gameComplete();
      setTimeout(() => {
        this.props.startGame();
      }, 2600);
    }
  }
  handleImageLoaded = () => {
    this.props.pageLoading();
  };
  render() {
    let cardsList = [];
    let initialCards = [];
    let cardsItems = 16;
    for (let i = 0; i < cardsItems; i++) {
      initialCards.push(
        <View key={i} style={styles.initialCardsWrapper}>
          <Image
            style={{ width: "100%", height: "100%" }}
            onLoad={this.handleImageLoaded.bind(this)}
            source={backgroudImgCard}
          />
        </View>
      );
    }
    //generate cards
    let cards = this.props.cards;
    cards = cards.map((card, i) => {
      return (
        <View style={card.flipped ? styles.cardActive : styles.card} key={i}>
          <Card
            index={i}
            card={card}
            isLocked={this.props.isLocked}
            flipCard={this.props.flipCard}
            lockCard={this.props.lockCard}
            matchCard={this.props.matchCard}
          />
        </View>
      );
    });
    //If this.props.isStarting === true, show generated cards
    cardsList = this.props.isStarting ? cards : initialCards;
    return (
      <View>
        <View
          style={
            this.props.isCompleted ? styles.gameBoardComplete : styles.gameBoard
          }
        >
          {cardsList}
        </View>
        <View style={styles.gameBoardBack} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardsWrapper: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  initialCardsWrapper: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 7,
    borderWidth: 1
  },
  cardActive: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 13
  },
  card: {
    position: "relative",
    width: 80,
    height: 80,
    borderRadius: 13,
    marginLeft: 2,
    marginRight: 2
  },
  gameBoardComplete: {
    height: "80%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  gameBoard: {
    marginTop: 20,
    flex: 1,
    flexDirection: "row",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    flexWrap: "wrap",
    position: "relative"
  },
  gameBoardBack: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  }
});

const mapStateToProps = state => {
  return {
    isPageLoading: state.game.isPageLoading,
    cards: state.game.cards,
    isStarting: state.game.isStarting,
    isLocked: state.game.isLocked,
    gameOn: state.game.gameOn,
    show: state.game.show,
    isCompleted: state.game.isCompleted
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameBoard);
