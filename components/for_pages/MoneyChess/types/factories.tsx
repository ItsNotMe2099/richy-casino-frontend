import {ChessGameType} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {ChessGameTime} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import {getObjectFromChessGameTypeStr} from 'components/for_pages/MoneyChess/utils/chess'
import {ChessGamePieceType, ChessGameSide} from 'components/for_pages/MoneyChess/data/enums'
import ChessFigureBishop from 'components/for_pages/MoneyChess/for_pages/Chess/components/Figures/Bishop'
import ChessFigureKing from 'components/for_pages/MoneyChess/for_pages/Chess/components/Figures/King'
import ChessFigureKnight from 'components/for_pages/MoneyChess/for_pages/Chess/components/Figures/Knight'
import ChessFigurePawn from 'components/for_pages/MoneyChess/for_pages/Chess/components/Figures/Pawn'
import ChessFigureQueen from 'components/for_pages/MoneyChess/for_pages/Chess/components/Figures/Queen'
import ChessFigureRook from 'components/for_pages/MoneyChess/for_pages/Chess/components/Figures/Rook'

export const ChessGameTypeIconFactory = ({type}: {type: ChessGameType}) => {
      return <img src={getChessGameTypeIcon(type)}/>
}

export const getChessGameTypeIcon = (type: ChessGameType) => {
  switch (type){
    case ChessGameType.Classic:
      return '/img/Chess/game_type_classic.svg'
    case ChessGameType.WithDoubling:
      return '/img/Chess/game_type_double.svg'
  }
}
export const ChessGameTypeNameFactory = ({type}: {type: ChessGameType}) => {
  switch (type){
    case ChessGameType.Classic:
      return <>1×</>
    case ChessGameType.WithDoubling:
      return <>1×</>
  }
}
export const ChessGameTimeIconFactory = ({timeKey, times}: {timeKey: string, times: ChessGameTime[]}) => {
  const index = times.findIndex( i => `${i.lifetime}:${i.increaseTime}` === timeKey)
  const style = {width: '24px', height: '24px'}
      return <img style={style} src={getChessGameTimeIcon({timeKey, times})}/>

}

export const getChessGameTimeIcon = ({timeKey, times}: {timeKey: string, times: ChessGameTime[]}) => {
  const index = times.findIndex( i => `${i.lifetime}:${i.increaseTime}` === timeKey)
  switch (index){
    case 0:
      return '/img/Chess/game_time_rocket.svg'
    case 1:
      return '/img/Chess/game_time_lightning.svg'
    case 2:
    default:
      return '/img/Chess/game_time_clock.svg'
  }
}

export const getChessGameTypeName = (type: ChessGameType) => {
  switch (type){
    case ChessGameType.Classic:
      return '1×'
    case ChessGameType.WithDoubling:
      return '2×'
  }
}

export const getChessGameTimeName = (timeKey: string) => {
  const parts = getObjectFromChessGameTypeStr(timeKey)
  const mins = (parts.lifetime / 60)
 return `${parts.lifetime % 60 === 0 ? parts.lifetime / 60 :  (parts.lifetime/ 60).toFixed(1)} мин + ${parts.increaseTime} сек`
}
export const ChessGamePieceFactory = ({piece, side}: {piece: ChessGamePieceType, side: ChessGameSide}) => {
  switch (piece){
    case ChessGamePieceType.Rook:
      return <ChessFigureRook side={side}/>
    case ChessGamePieceType.Bishop:
      return <ChessFigureBishop side={side}/>
    case ChessGamePieceType.King:
      return <ChessFigureKing side={side}/>
    case ChessGamePieceType.Knight:
      return <ChessFigureKnight side={side}/>
    case ChessGamePieceType.Pawn:
      return <ChessFigurePawn side={side}/>
    case ChessGamePieceType.Queen:
      return <ChessFigureQueen side={side}/>
    default:
      return null

  }
}
