import * as actionType from "../actions/actionTypes";
import generateCards from "../../src/data/generateCards";

const INITIAL_STATE = {
  isPageLoading: false,
  cards: [],
  isStarting: false,
  scoreOn: false,
  gameOn: false,
  isLocked: false,
  isCompleted: false,
  show: true
};

export default function game(state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionType.PAGE_LOADING:
      return {
        ...state,
        isPageLoading: false
      };

    case actionType.START_GAME:
      return {
        ...state,
        cards: action.payload,
        isStarting: true,
        show: true,
        gameOn: false
      };

    case actionType.SHOW_CARD:
      return {
        ...state,
        show: false,

        cards: state.cards.map((card, i) =>
          i === action.card[0] ? { ...card, flipped: true } : card
        )
      };

    case actionType.HIDE_CARD:
      return {
        ...state,
        isCompleted: false,
        gameOn: true,
        cards: state.cards.map((card, i) => {
          return {
            ...card,
            ...(card.flipped = false),
            ...(card.matched = false)
          };
        })
      };

    case actionType.FLIP_CARD:
      return {
        ...state,
        cards: state.cards.map((card, i) =>
          i === action.index
            ? // transform the one with a matching index
              { ...card, flipped: true }
            : // otherwise return original card
              card
        )
      };

    case actionType.LOCK_CARD:
      return {
        ...state,
        isLocked: true
      };

    case actionType.MATCH_CARD:
      const selectedCards = action.flippedCard;
      if (selectedCards[0].cardName === selectedCards[1].cardName) {
        return {
          ...state,

          isLocked: false,
          cards: state.cards.map(card =>
            card.cardName === selectedCards[0].cardName
              ? { ...card, matched: true }
              : card
          )
        };
      } else if (selectedCards[0].cardName !== selectedCards[1].cardName) {
        return {
          ...state,
          isLocked: false,
          cards: state.cards.map(card =>
            card.cardName === selectedCards[0].cardName ||
            card.cardName === selectedCards[1].cardName
              ? { ...card, flipped: false }
              : card
          )
        };
      } else return state;

    case actionType.COMPLETE:
      return {
        ...state,
        isCompleted: true
      };
    default:
      return state;
  }
}
