import styles from './index.module.scss'
import classNames from 'classnames'
import { Col } from 'react-grid-system'

interface Props {
  
}

export default function Prizes(props: Props) {

  const PlaceBlock = (prop: {place: number, bitcoin: string, className?: string}) => {

    const rootClass = classNames({
      [styles.first]: prop.place === 1,
      [styles.second]: (prop.place === 2 || prop.place === 3),
      [styles.third]: (prop.place > 3 && prop.place < 7),
      [styles.fourth]: prop.place > 6
  })

  const getEnding = () => {
    switch(prop.place){
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
    [styles.green]: prop.place === 1,
    [styles.orange]: (prop.place === 2 || prop.place === 3),
    [styles.blue]: (prop.place > 3 && prop.place < 7),
    [styles.purple]: prop.place > 6
  })

  const getBtcColor = (place: number) => {
        if(place === 1){
          return '/img/Lottery/bitcoin-green.svg'
        }
        else if(place > 1 && place < 4){
          return '/img/Lottery/bitcoin-orange.svg'
        }
        else if(place > 4 && place < 7){
          return '/img/Lottery/bitcoin-blue.svg'
        }
        else if(place > 6){
          return '/img/Lottery/bitcoin-purple.svg'
        }
    }

    return (
      <div className={classNames(styles.place, rootClass, prop.className)}>
        <div className={classNames(styles.free, colorClass)}>{prop.place}{getEnding()}</div>
        <div className={classNames(styles.bitcoin, {[styles.column]: prop.place > 1})}>
          <img src={getBtcColor(prop.place)} alt=''/>{prop.bitcoin}
        </div>
      </div>
    )
  }

  return (
    <Col className={styles.root}>
      <div className={styles.top}>
        <PlaceBlock place={1} bitcoin='0.0068175151'/>
        <PlaceBlock place={2} bitcoin='0.0068175151' className={styles.secondPlace}/>
        <PlaceBlock place={3} bitcoin='0.0068175151' className={styles.thirdPlace}/> 
      </div>
      <div className={styles.middle}>
        <PlaceBlock place={4} bitcoin='0.0068175151'/>
        <PlaceBlock place={5} bitcoin='0.0068175151'/>
        <PlaceBlock place={6} bitcoin='0.0068175151'/> 
      </div>
      <div className={styles.bottom}>
        <PlaceBlock place={7} bitcoin='0.0068175151'/>
        <PlaceBlock place={8} bitcoin='0.0068175151'/>
        <PlaceBlock place={9} bitcoin='0.0068175151'/> 
        <PlaceBlock place={10} bitcoin='0.0068175151'/> 
      </div>
    </Col>
  )
}

