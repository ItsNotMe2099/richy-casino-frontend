import {ChessGameType} from 'components/for_pages/MoneyChess/data/interfaces/IChessGame'
import {ChessGameTime} from 'components/for_pages/MoneyChess/data/interfaces/IChessGameTime'
import {getObjectFromChessGameTypeStr} from 'components/for_pages/MoneyChess/utils/chess'

export const ChessGameTypeIconFactory = ({type}: {type: ChessGameType}) => {
  switch (type){
    case ChessGameType.Classic:
      return <img src={'/img/Chess/game_type_classic.svg'}/>
    case ChessGameType.WithDoubling:
      return <img src={'/img/Chess/game_type_double.svg'}/>
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
  switch (index){
    case 0:
      return <img style={style} src={'/img/Chess/game_time_rocket.png'}/>
    case 1:
      return <img style={style} src={'/img/Chess/game_time_lightning.png'}/>
    case 2:
    default:
      return <img style={style} src={'/img/Chess/game_time_clock.png'}/>
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
