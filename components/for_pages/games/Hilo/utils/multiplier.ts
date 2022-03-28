import CardsDeck from 'components/for_pages/games/utils/deck'
import {HiloBetType} from 'components/for_pages/games/Hilo/data/enums'

export const  calculateMultiplier =  (type: HiloBetType, startingCardIndex: number) => {
  if(type === HiloBetType.Higher) return (12.350 / (13 - (CardsDeck.deck[startingCardIndex].slot - 1)))
  if(type === HiloBetType.Lower) return (12.350 / (CardsDeck.deck[startingCardIndex].slot))
  if(type === HiloBetType.Same) return 16.83
}
export const getHiloMultiplier = (type: HiloBetType, startingCardIndex: number) => {
  let sameProbability = 5.88,
    lowerProbability = (CardsDeck.deck[startingCardIndex].slot / 13) * 100 - (sameProbability),
    higherProbability = 100 - lowerProbability - (sameProbability)

  const noHigher = (startingCardIndex % 13) + 1 === 1, noLower = (startingCardIndex % 13) + 1 === 2

  if(noHigher) lowerProbability = 100 - sameProbability
  if(noLower) higherProbability = 100 - sameProbability
  switch (type){
    case HiloBetType.Higher:
      return (noHigher ? 0 : calculateMultiplier(HiloBetType.Higher, startingCardIndex)).toFixed(2)
    case HiloBetType.Lower:
      return (noLower ? 0 : calculateMultiplier(HiloBetType.Lower, startingCardIndex)).toFixed(2)
    case HiloBetType.Same:
      return calculateMultiplier(HiloBetType.Same, startingCardIndex).toFixed(2)
  }
}


export const getHiloPercent = (type: HiloBetType, startingCardIndex: number): string => {
  let sameProbability = 5.88,
    lowerProbability = (CardsDeck.deck[startingCardIndex].slot / 13) * 100 - (sameProbability),
    higherProbability = 100 - lowerProbability - (sameProbability)

  const noHigher = (startingCardIndex % 13) + 1 === 1, noLower = (startingCardIndex % 13) + 1 === 2

  if(noHigher) lowerProbability = 100 - sameProbability
  if(noLower) higherProbability = 100 - sameProbability
  switch (type){
    case HiloBetType.Higher:
      return (noHigher ? 0 : higherProbability).toFixed(2)
    case HiloBetType.Lower:
      return (noLower ? 0 : lowerProbability).toFixed(2)
    case HiloBetType.Same:
      return sameProbability.toFixed(2)
  }
}
