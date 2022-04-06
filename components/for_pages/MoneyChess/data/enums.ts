export const chessGameColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
export type ChessGameColumn = typeof chessGameColumns[number];
export type ChessGameRow = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type ChessGameSquare = { column: ChessGameColumn; row: ChessGameRow };

export enum ChessGameSide {
  WHITE = 'WHITE',
  BLACK = 'BLACK',
}
export enum ChessGamePieceType{
  Pawn =  'pawn',//Пешка
  Knight ='knight',//Конь
  Bishop ='bishop',//Слон
  Rook =  'rook',//Ладья
  Queen = 'queen',//Ферзь
  King =  'king',//Король
}
export const ChessGamePieceTypeNum = {
  'pawn':   1,//Пешка
  'knight': 2,//Конь
  'bishop': 3,//Слон
  'rook':   4,//Ладья
  'queen':  5,//Ферзь
  'king':   6,//Король
}

