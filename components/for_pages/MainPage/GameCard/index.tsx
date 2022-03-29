import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { useAppContext } from 'context/state'

interface Props {
  poker?: boolean
}

export default function GameCard(props: Props) {

  const context = useAppContext()

  const getShadow = (shadowColor) => {
    switch (shadowColor){
      case 'blue':
        if(context.isDesktop) {
          return'/img/shadows/light-blue-chess.png'
        }
        else{
          return'/img/shadows/light-blue-gamecard-mobile.png'
        }
      case 'red':
        if(context.isDesktop){
          return '/img/shadows/light-red-poker.png'
        }
        else{
          return'/img/shadows/light-blue-gamecard-mobile.png'
        }
    }
  }

  return (
      <div className={classNames(styles.root, {[styles.chess]: !props.poker})}>
        <div className={styles.bg}>
          <img src={props.poker ? '/img/GameCard/poker.svg' : '/img/GameCard/chess.svg'} alt=''/>
        </div>
        <div className={styles.image}>
          <div className={styles.shadow}><img src={getShadow(props.poker ? 'red' : 'blue')} alt=''/></div>
          <img src={props.poker ? '/img/GameCard/poker-small.png' : '/img/GameCard/chess-small.svg'} alt=''/>
        </div>
        <div className={styles.text}>
          <div className={styles.label}>
            {props.poker ? <>Poker</> : <>Chess</>}
          </div>
          <div className={styles.desc}>
            Покори своей игрой уже сейчас!
          </div>
        </div>
        <div className={styles.btn}><Button href='#' size='play' background='blueGradient500'>Играть</Button></div>
        <div className={styles.btnMobile}><Button href='#'><img src='/img/GameCard/arrow.svg' alt=''/></Button></div>
      </div>
  )
}
