import styles from './index.module.scss'
import classNames from 'classnames'
import {ILotterySlot} from 'data/interfaces/ILotteryRound'

interface Props {
  slots: ILotterySlot[]
}
const PlaceBlock = (props: {place: number, bitcoin: number, className?: string, color: 'green' | 'orange' | 'blue' | 'purple'}) => {

  const rootClass = classNames({
    [styles.first]: props.place === 1,
    [styles.second]: (props.place === 2 || props.place === 3),
    [styles.third]: (props.place > 3 && props.place < 7),
    [styles.fourth]: props.place > 6
  })

  const getEnding = () => {
    switch(props.place){
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const colorClass = classNames({
    [styles.green]: props.color === 'green',
    [styles.orange]:  props.color === 'orange',
    [styles.blue]:  props.color === 'blue',
    [styles.purple]: props.color === 'purple'
  })

  const getBtcColor = (place: number) => {
    if(place === 1){
      return '/img/Lottery/bitcoin-green.svg'
    }
    else if(place > 1 && place < 4){
      return '/img/Lottery/bitcoin-orange.svg'
    }
    else if(place > 3 && place < 7){
      return '/img/Lottery/bitcoin-blue.svg'
    }
    else if(place > 6){
      return '/img/Lottery/bitcoin-purple.svg'
    }
  }

  const bitcoinClass = classNames({
    [styles.column]: props.place > 1,
    [styles.mediumFont]: props.place > 1 && props.place < 4,
    [styles.smallFont]: props.place > 3 && props.place < 7,
    [styles.exSmallFont]: props.place > 6
  })

  return (
    <div className={classNames(styles.place, rootClass, props.className)}>
      <div className={classNames(styles.free, colorClass)}>{props.place}{getEnding()}</div>
      <div className={classNames(styles.bitcoin, bitcoinClass)}>
        <img src={getBtcColor(props.place)} alt=''/><span>{props.bitcoin}</span>
      </div>
    </div>
  )
}
export default function Prizes(props: Props) {

  return (
    <div className={styles.root}>
      {props.slots.length >=1 && <div className={styles.top}>
        {props.slots.length >= 1 && <PlaceBlock place={1} bitcoin={props.slots[0].winMoneyAmount} color={'green'}/>}
        {props.slots.length >= 2 && <PlaceBlock place={2} bitcoin={props.slots[1].winMoneyAmount}  color={'orange'} className={styles.secondPlace}/>}
        {props.slots.length >= 3 && <PlaceBlock place={3} bitcoin={props.slots[2].winMoneyAmount}  color={'orange'} className={styles.thirdPlace}/>}
      </div>}
      {props.slots.length >=4 && <div className={styles.middle}>
        {props.slots.length >= 4 && <PlaceBlock place={4} bitcoin={props.slots[3].winMoneyAmount}  color={'blue'}/>}
        {props.slots.length >= 5 && <PlaceBlock place={5} bitcoin={props.slots[4].winMoneyAmount}  color={'blue'}/>}
        {props.slots.length >= 6 && <PlaceBlock place={6} bitcoin={props.slots[5].winMoneyAmount}  color={'blue'}/>}
      </div>}
      {props.slots.length >=7 && <div className={styles.bottom}>
        {props.slots.length >= 7 && <PlaceBlock place={7} bitcoin={props.slots[6].winMoneyAmount}  color={'purple'}/>}
        {props.slots.length >= 8 && <PlaceBlock place={8} bitcoin={props.slots[7].winMoneyAmount}  color={'purple'}/>}
        {props.slots.length >= 9 && <PlaceBlock place={9} bitcoin={props.slots[8].winMoneyAmount}  color={'purple'}/>}
        {props.slots.length >= 10 && <PlaceBlock place={10} bitcoin={props.slots[9].winMoneyAmount}  color={'purple'}/>}
      </div>}
    </div>
  )
}

