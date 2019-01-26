import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
// import "../css/Card.css";
import backgroudImgCard from "../assets/back.jpg";

const styles = StyleSheet.create({
  cardFront: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 13,
    borderWidth: 1
  },
  cardBackMatched: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: "#239a63",
    zIndex: 1
  },
  cardBack: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderRadius: 13,
    borderWidth: 1,
    backgroundColor: "white",
    zIndex: 1
  }
});

class Card extends Component {
  handleClickFlipCard() {
    if (!this.props.isLocked) {
      this.props.flipCard(this.props.index, this.props.card.cardName);
    }
  }

  render() {
    return (
      <TouchableOpacity
        style={{ width: "100%", height: "100%" }}
        onPress={this.handleClickFlipCard.bind(this)}
      >
        <ImageBackground style={styles.cardFront} source={backgroudImgCard} />

        <Image
          style={
            this.props.card.matched ? styles.cardBackMatched : styles.cardBack
          }
          source={this.props.card.img}
        />
      </TouchableOpacity>
    );
  }
}

export default Card;
