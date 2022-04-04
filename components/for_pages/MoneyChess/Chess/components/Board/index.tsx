import styles from './index.module.scss'
import classNames from 'classnames'
import { ReactElement } from 'react'
import WhiteBishop from '../Figures/white/WhiteBishop'
import WhiteRook from '../Figures/white/WhiteRook'
import WhiteKnight from '../Figures/white/WhiteKnight'
import WhiteKing from '../Figures/white/WhiteKing'
import WhiteQueen from '../Figures/white/WhiteQueen'
import WhitePawn from '../Figures/white/WhitePawn'
import BlackRook from '../Figures/black/BlackRook'
import BlackKnight from '../Figures/black/BlackKnight'
import BlackBishop from '../Figures/black/BlackBishop'
import BlackKing from '../Figures/black/BlackKing'
import BlackQueen from '../Figures/black/BlackQueen'
import BlackPawn from '../Figures/black/BlackPawn'

interface Props {
  
}

interface SquareProps {
  index?: number
  figure?: ReactElement
}

export default function Board(props: Props) {

  const Square = (props: SquareProps) => {

    const squareClass = {
      [styles.reverse]: (props.index > 8 && props.index < 17) || (props.index > 24 && props.index < 33) || (props.index > 40 && props.index < 49) || (props.index > 56)
    }

    return (
      <div className={classNames(styles.square, squareClass)}>
        {props.figure}
      </div>
    )
  }

  const squares = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37,
    38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64
  ]

  return (
    <div className={styles.root}>
      {squares.map((index) =>
        (index === 1 || index === 8) ?
        <Square index={index} key={index} figure={<WhiteRook/>}/>
        :
        (index === 2 || index === 7) ?
        <Square index={index} key={index} figure={<WhiteKnight/>}/>
        :
        (index === 3 || index === 6) ?
        <Square index={index} key={index} figure={<WhiteBishop/>}/>
        :
        (index === 4) ?
        <Square index={index} key={index} figure={<WhiteKing/>}/>
        :
        (index === 5) ?
        <Square index={index} key={index} figure={<WhiteQueen/>}/>
        :
        (index > 8 && index < 17) ?
        <Square index={index} key={index} figure={<WhitePawn/>}/>
        :
        (index === 57 || index === 64) ?
        <Square index={index} key={index} figure={<BlackRook/>}/>
        :
        (index === 58 || index === 63) ?
        <Square index={index} key={index} figure={<BlackKnight/>}/>
        :
        (index === 59 || index === 62) ?
        <Square index={index} key={index} figure={<BlackBishop/>}/>
        :
        (index === 60) ?
        <Square index={index} key={index} figure={<BlackKing/>}/>
        :
        (index === 61) ?
        <Square index={index} key={index} figure={<BlackQueen/>}/>
        :
        (index > 48 && index < 57) ?
        <Square index={index} key={index} figure={<BlackPawn/>}/>
        :
        <Square index={index} key={index}/>
      )}
    </div>
  )
}
