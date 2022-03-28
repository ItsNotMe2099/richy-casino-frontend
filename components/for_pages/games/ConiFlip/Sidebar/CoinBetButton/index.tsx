import styles from './index.module.scss'
import {CoinType} from 'components/for_pages/games/ConiFlip/data/enums'
import classNames from 'classnames'

interface Props {
  type: CoinType
  onClick: (type: CoinType) => void
  disabled?: boolean
  active?: boolean
}

export default function CoinBetButton(props: Props) {

  const getIcon = () => {
    switch (props.type){
      case CoinType.Eagle:
        return '/img/Games/coinflip/eagle.svg'
      case CoinType.Tail:
        return '/img/Games/coinflip/tail.svg'
    }
  }

  return (
    <div className={classNames(styles.root, {[styles.active]: props.active})} onClick={() => props.onClick(props.type)}>
    <img src={getIcon()}/>
    <div className={styles.label}>{props.type === CoinType.Tail ? 'Решка' : 'Орел'}</div>
    </div>

  )
}


