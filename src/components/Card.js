import React, { Component } from "react";
import { StyleSheet, View, Text, Image, ImageBackground } from "react-native";
// import "../css/Card.css";
import Img from "../assets/back.jpg";

const styles = StyleSheet.create({
  card: {
    position: "relative",
    display: "flex",
    width: 80,
    height: 80,
    marginTop: 6
  }
});

class Card extends Component {
  render() {
    return (
      <View style={styles.card}>
        {/* <ImageBackground
          style={{ width: "100%", height: "100%" }}
          source={Img}
        /> */}
        <Image
          style={{ width: "100%", height: "100%" }}
          source={this.props.img}
        />
      </View>
    );
  }
}

// class Card extends Component {
//   handleClickFlipCard() {
//     if (!this.props.isLocked) {
//       this.props.flipCard(this.props.index, this.props.card.cardName);
//     }
//   }

//   render() {
//     let cardFrontStyle = {
//       backgroundImage: `url(${backgroudImgCard})`,
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       backgroundSize: "cover"
//     };

//     let cardMatched = this.props.card.matched ? "cardBack_matched" : "cardBack";

//     return (
//       <div onClick={this.handleClickFlipCard.bind(this)}>
//         <div className="cardFront" style={cardFrontStyle}>
//           <span className="gameNameOn">?</span>
//         </div>
//         <img
//           className={cardMatched}
//           src={this.props.card.img}
//           alt={this.props.cardName}
//         />
//       </div>
//     );
//   }
// }

export default Card;
