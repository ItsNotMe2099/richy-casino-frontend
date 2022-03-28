import styles from 'components/for_pages/games/Hilo/Sidebar/HiloBetButton/index.module.scss'
import {HiloBetType} from 'components/for_pages/games/Hilo/data/enums'
import classNames from 'classnames'

interface Props {
  type: HiloBetType
  percent?: string
  onClick: (type: HiloBetType) => void
  disabled?: boolean
}

export default function HiloBetButton(props: Props) {

  const getIcon = () => {
    switch (props.type){
      case HiloBetType.Higher:
        return '/img/Games/hilo/bet_higher.svg'
      case HiloBetType.Lower:
        return '/img/Games/hilo/bet_lower.svg'
      case HiloBetType.Same:
        return '/img/Games/hilo/bet_same.svg'
      case HiloBetType.Skip:
        return '/img/Games/hilo/bet_skip.svg'
    }
  }
  const getText = () => {
    switch (props.type){
      case HiloBetType.Higher:
        return 'Выше или равная'
      case HiloBetType.Lower:
        return 'Ниже или равная'
      case HiloBetType.Same:
        return 'Равная'
      case HiloBetType.Skip:
        return 'Пропустить'
    }
  }
  const getPercentClass = () => {
    switch (props.type){
      case HiloBetType.Higher:
        return styles.green
      case HiloBetType.Lower:
        return styles.yellow
      case HiloBetType.Skip:
        return styles.white
    }
  }
  return (
    <div className={styles.root} onClick={() => props.onClick(props.type)}>
    <img src={getIcon()}/>
      <div className={styles.label}>{getText()}</div>
      {props.type !== HiloBetType.Skip && <div className={classNames(styles.percent, getPercentClass())}>{props.percent}%</div>}
    </div>

  )
}


