import styles from './index.module.scss'
import Dice from 'components/svg/Dice'
import Favorite from 'components/svg/Favorite'
import New from 'components/svg/New'
import Roulettes from 'components/svg/Roulettes'
import Slots from 'components/svg/Slots'
import Blackjack from 'components/svg/Blackjack'
import Top from 'components/svg/Top'
import Calendar from 'components/svg/Calendar'
import { useState } from 'react'
import classNames from 'classnames'

interface IGame{
  label: string
  image: string
  top: boolean
  createdAt: string
  lastWin: string
  category: string
  provider: string
}


interface Props {
  top?: boolean
  all?: boolean
  payment?: boolean
  chessBets?: boolean
  items?: IGame[]
  onClick?: () => void
}

export default function SwitchFilter(props: Props) {

  const items = [
    {label: 'Все', icon: <Dice/>},
    {label: 'Популярные', icon: <Favorite/>},
    {label: 'Новинки', icon: <New/>},
    {label: 'Рулетки', icon: <Roulettes/>},
    {label: 'Слоты', icon: <Slots/>},
    {label: 'Блэкджек', icon: <Blackjack/>},
  ]

  const options = [
    {label: 'Выигрывают сейчас', icon: <New/>},
    {label: 'Топ игр за неделю', icon: <Top/>},
    {label: 'Топ игр месяца', icon: <Calendar/>},
  ]

  const payments = [
    {label: 'Все'},
    {label: 'Пополнения'},
    {label: 'Выводы'},
  ]

  const chessBets = [
    {label: 'Все ставки'},
    {label: 'Мои ставки'}
  ]

  const [active, setActive] = useState(props.top ? 'Выигрывают сейчас' : props.chessBets ? 'Все ставки' : 'Все')

  return (
      <div className={styles.root}>
        {props.top ?
          options.map((item, index) =>
            <div className={classNames(styles.item, {[styles.active]: item.label === active})} key={index} onClick={() => setActive(item.label)}>
              {item.icon}
              <div className={styles.label}>{item.label}</div>
            </div>
          )
          :
          props.all ? items.map((item, index) =>
            <div className={classNames(styles.item, {[styles.active]: item.label === active})} key={index} onClick={() => setActive(item.label)}>
              {item.icon}
              <div className={styles.label}>{item.label}</div>
            </div>
          )
          :
          props.payment ? payments.map((item, index) =>
            <div className={classNames(styles.item, {[styles.active]: item.label === active})} key={index} onClick={() => setActive(item.label)}>
              <div className={styles.label}>{item.label}</div>
            </div>
          )
          :
          props.chessBets ? chessBets.map((item, index) =>
            <div className={classNames(styles.item, {[styles.active]: item.label === active})} key={index} onClick={() => setActive(item.label)}>
              <div className={styles.label}>{item.label}</div>
            </div>
          )
          :
          items.slice(0, 3).map((item, index) =>
            <div className={classNames(styles.item, {[styles.active]: item.label === active})} key={index} onClick={() => setActive(item.label)}>
              {item.icon}
              <div className={styles.label}>{item.label}</div>
            </div>
          )
        }
      </div>
  )
}
