export enum RouletteBetType{
  Blue,
  Green,
  Orange,
  Yellow,
  Purple,
  Red
}
export type RouletteBets = {[key: string | number]: number}
export interface IRouletteChip{
  value: number
  label: string
  type: RouletteBetType
}
export const RouletteChipList: IRouletteChip[] = [
  {value: 1e-8, label: '1', type: RouletteBetType.Blue},
  {value: 1e-7, label: '10', type: RouletteBetType.Green},
  {value:  0.000001, label: '100', type: RouletteBetType.Orange},
  {value: 0.00001, label: '1k', type: RouletteBetType.Yellow},
  {value: 0.0001, label: '10k', type: RouletteBetType.Purple},
  {value: 0.001, label: '100k', type: RouletteBetType.Red},
]

export const RouletteFieldColorsMap = {
  0: 'green',
  3: 'red',
  6: 'black',
  9: 'red',
  12: 'red',
  15: 'black',
  18: 'red',
  21: 'red',
  24: 'black',
  27: 'red',
  30: 'red',
  33: 'black',
  36: 'red',
  2: 'black',
  5: 'red',
  8: 'black',
  11: 'black',
  14: 'red',
  17: 'black',
  20: 'black',
  23: 'red',
  26: 'black',
  29: 'black',
  32: 'red',
  35: 'black',
  1: 'red',
  4: 'black',
  7: 'red',
  10: 'black',
  13: 'black',
  16: 'red',
  19: 'red',
  22: 'black',
  25: 'red',
  28: 'black',
  31: 'black',
  34: 'red',
}
