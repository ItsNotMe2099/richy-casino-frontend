import styles from './index.module.scss'
import Scrollbars from 'react-custom-scrollbars-2'
import classNames from 'classnames'
import {ReactElement} from 'react'

interface IGameType {
  icon: string
  mult: string
}

interface IPrize {
  amount: string
  iso: string
}

interface IUser {
  name: string
  avatar: string
}

interface IItem {
  begin: string
  users: IUser[]
  gameType: IGameType
  time: string
  prize: IPrize
  date: string
}

interface Props<T> {
  items: T[]
  style?: 'games' | 'bets'
  isStats?: boolean
  row: (isMobile: boolean, item: T) => ReactElement
}

export default function Table<T>(props: Props<T>) {

  const tableClass = {
    [styles.games]: props.style === 'games'
  }


  return (
    <div className={styles.root}>
      <table className={classNames(styles.table, tableClass)}>
        <thead>
        <tr>
          {props.style !== 'games' &&
          <th>
            Время
          </th>}
          <th>
            Игроки
          </th>
          <th>
            Тип игры
          </th>
          <th>
            Время
          </th>
          <th>
            {props.style === 'games' ? <>Ставка</> : <>Выигрыш</>}
          </th>
        </tr>
        </thead>
        <tbody>
        <Scrollbars style={{width: '100%', height: 250}}
                    renderTrackVertical={props => <div {...props} className={styles.track}/>}>
          {props.items.map((item) => props.row(false, item))}

        </Scrollbars>
        </tbody>
      </table>
      <section>
        <Scrollbars style={{width: '100%', height: 250}}
                    renderTrackVertical={props => <div {...props} className={styles.track}/>}>
          {props.items.map((item) => props.row(true, item))}
        </Scrollbars>
      </section>
    </div>
  )
}
