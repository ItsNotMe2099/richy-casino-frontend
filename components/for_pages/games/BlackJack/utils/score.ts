import {IBlackjackCard} from 'components/for_pages/games/BlackJack/data/enums'

export const getBlackjackScore = (hand: IBlackjackCard[]): number => {
  let score = 0, aces = 0

  for (let i = 0; i < hand.length; i++) {
    if (!hand[i].value?.length) continue

    score += hand[i].blackjackValue

    if (hand[i].blackjackValue === 11) aces += 1

    if (score > 21 && aces > 0) {
      score -= 10
      aces--
    }
  }
  return score
}
