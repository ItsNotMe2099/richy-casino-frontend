import styles from './index.module.scss'
import {CoinType} from 'components/for_pages/games/ConiFlip/data/enums'
import {useEffect, useState} from 'react'
import classNames from 'classnames'
import has = Reflect.has

interface Props{
  type?: CoinType
  hasResult: boolean
  showLabel?: boolean
}
export default function Coin({type, hasResult, showLabel}: Props) {
  const [trigger, setTrigger] = useState(false)
  useEffect(() => {
    if(hasResult){
      setTrigger(true)
    }else{
      setTrigger(false)
    }
  }, [hasResult, type])
  useEffect(() => {
    if(hasResult){
      setTrigger(true)
    }
  }, [trigger])
  const getIcon = (type) => {
    switch (type){
      case CoinType.Eagle:
        return '/img/Games/coinflip/eagle.svg'
      case CoinType.Tail:
        return '/img/Games/coinflip/tail.svg'
    }
  }
  return (
    <div className={styles.root}>
      <div className={classNames(styles.coin, {[styles.heads]: trigger && type === CoinType.Eagle, [styles.tails]: trigger && type === CoinType.Tail})}>
        <div className={styles.sideB}><img src={getIcon(CoinType.Tail)}/></div>
        <div className={styles.sideA}><img src={getIcon(CoinType.Eagle)}/></div>
      </div>

       <div className={classNames(styles.label, {[styles.hidden]: !showLabel})}>{type === CoinType.Tail ? 'Решка' : 'Орел'}</div>
    </div>
  )
}


