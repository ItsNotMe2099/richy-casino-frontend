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
export enum GamePlayerActionType {
  Exit = 'exit',//игрок вышел со стола (сдался)
  GiveUp = 'giveUp',//игрок сдался
  OfferDraw = 'offerDraw',
  AcceptDraw = 'acceptDraw',
  NewDices = 'newDices',
  Move = 'move',
  NextMove = 'nextMove',
  NewGame = 'newGame',//создаем новую игрю, расставляем фигуры, делаем ставки
  StartGame = 'startGame',//оппонент сел за стол
  SelectPiece = 'selectPiece',//выбираем фигуру для хода (перед отображаем доступных ходов)
  TimeOut = 'timeOut',//тур закончился по timeout, игрок проиграл
  WaitAccept = 'waitAccept',//ожидание подтверждения допуска оппонента
}
export enum GameActionType {
  AcceptDraw = 'acceptDraw',//согласились на ничью
  GiveUp = 'giveUp',//игрок сдался
  OfferDraw = 'offerDraw',//игрок предложил ничью
  NewDices = 'newDices',//бросаем кости
  NewGame = 'newGame',//ожидаем оппонента
  NewTurn = 'newTurn',//новый тур (игрок сделал все доступные ходы)
  Move = 'move',//делаем ход
  NextMove = 'nextMove',//ожидаем следующий ход, обновляем доступные фигуры для хода
  SetPieceCapture = 'setPieceCapture',//захватили фигуру
  SetPawnPromoted = 'setPawnPromoted',//пешка стала ферзем
  SelectPiece = 'selectPiece',//отображаем доступные ходы для выбранной фигуры
  //SetPlayerPieces = 'setPlayerPieces',//расставить фигуры
  TimeOut = 'timeOut',//завершилось время хода
  //Collect = 'collect',//перечисляем выигрыш
  Finish = 'finish',//игрок принял ничью или одержал победу
  Exit = 'exit',//игрок вышел из игры
};
export enum ChessGameTableActionType {
  Sit = 'sit',
  NewGame = 'newGame',
  Start = 'start',
  NewBoard = 'newBoard',
  Exit = 'exit',
  AddCoins = 'addCoins',
  Finish = 'finish'//новая партия
};

export const ChessGameDices: ChessGamePieceType[] = [ChessGamePieceType.Pawn, ChessGamePieceType.Rook, ChessGamePieceType.Bishop, ChessGamePieceType.Knight, ChessGamePieceType.Queen, ChessGamePieceType.King]
