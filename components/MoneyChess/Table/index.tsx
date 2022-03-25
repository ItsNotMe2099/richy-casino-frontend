import styles from './index.module.scss'
import Scrollbars from 'react-custom-scrollbars-2'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'

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

interface Props {
  items: IItem[]
  style?: 'games' | 'bets'
  isStats?: boolean
}

export default function Table(props: Props) {

  const tableClass = {
    [styles.games]: props.style === 'games'
  }

  const [dates, setDates] = useState([])

  const array = []

  const currentDate = format(new Date(), 'dd LLLL yyyy')

  useEffect(() => {
    for (let i = 0; i < props.items.length; ++i) {
      array.push(props.items[i].date)
    }
    const filtered = array.filter((el, id) => array.indexOf(el) === id)
    const sorted = filtered.sort((a, b) => b - a)
    setDates(sorted)
  }, [])

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
            <Scrollbars style={{ width: '100%', height: 250}} 
              renderTrackVertical={props => <div {...props} className={styles.track}/>}>
            {props.isStats ?
            dates.map((date, index) => 
              <>
              <div className={styles.date} key={index}>
                {format(new Date(date), 'dd LLLL yyyy') === currentDate ? <>Today</> : format(new Date(date), 'dd LLLL yyyy')}
              </div>
              <>
              {props.items.map((item, index) => 
              date === item.date &&
              <tr key={index}>
                {props.style !== 'games' &&
                <td>
                  {item.begin}
                </td>}
                <td>
                  <div className={styles.users}>
                  <div className={styles.user}>
                    <img src={item.users[0].avatar} alt=''/>
                    {item.users[0].name}
                  </div>
                  <span>VS</span>
                  <div className={styles.user}>
                    <img src={item.users[1].avatar} alt=''/>
                    {item.users[1].name}
                  </div>
                  </div>
                </td>
                <td>
                  <img className={styles.icon} src={item.gameType.icon} alt=''/>
                  {item.gameType.mult}
                </td>
                <td>
                  <img className={styles.rocket} src='/img/Chess/rocket.svg' alt=''/>
                  {item.time}
                </td>
                <td>
                  <div className={styles.pay}>{item.prize.amount}</div>&nbsp;<div className={styles.iso}>{item.prize.iso}</div>
                </td>
              </tr>)}
              </>
              </>
            )      
            :
             props.items.map((item, index) => 
              <tr key={index}>
                {props.style !== 'games' &&
                <td>
                  {item.begin}
                </td>}
                <td>
                  <div className={styles.users}>
                  <div className={styles.user}>
                    <img src={item.users[0].avatar} alt=''/>
                    {item.users[0].name}
                  </div>
                  <span>VS</span>
                  <div className={styles.user}>
                    <img src={item.users[1].avatar} alt=''/>
                    {item.users[1].name}
                  </div>
                  </div>
                </td>
                <td>
                  <img className={styles.icon} src={item.gameType.icon} alt=''/>
                  {item.gameType.mult}
                </td>
                <td>
                  <img className={styles.rocket} src='/img/Chess/rocket.svg' alt=''/>
                  {item.time}
                </td>
                <td>
                  <div className={styles.pay}>{item.prize.amount}</div>&nbsp;<div className={styles.iso}>{item.prize.iso}</div>
                </td>
              </tr>
             )}
             </Scrollbars>
            </tbody>
          </table>
          <section>
          <Scrollbars style={{ width: '100%', height: 250}} 
              renderTrackVertical={props => <div {...props} className={styles.track}/>}>
          {props.isStats ?
          dates.map((date, index) => 
          <>
          <div className={styles.date} key={index}>
            {format(new Date(date), 'dd LLLL yyyy') === currentDate ? <>Today</> : format(new Date(date), 'dd LLLL yyyy')}
          </div>
          <>
          {props.items.map((item, index) => 
            <div className={styles.item} key={index}>
              <div className={styles.top}>
              <div className={styles.users}>
                  <div className={styles.user}>
                    <img src={item.users[0].avatar} alt=''/>
                    {item.users[0].name}
                  </div>
                  <span>VS</span>
                  <div className={styles.user}>
                    <img src={item.users[1].avatar} alt=''/>
                    {item.users[1].name}
                  </div>
                  </div>
              </div>
              <div className={styles.bottom}>
              <div className={styles.left}>
              {props.style !== 'games' &&
                <HiddenXs>
                <div className={styles.begin}>
                  {item.begin}
                </div>
                </HiddenXs>
              }
              <div className={styles.time}>
                  <img className={styles.rocket} src='/img/Chess/rocket.svg' alt=''/>
                  {item.time}
                </div>
              <div className={styles.mult}>
                <img className={styles.icon} src={item.gameType.icon} alt=''/>
                {item.gameType.mult}
              </div>
              </div>
              <div className={styles.money}>
                <div className={styles.pay}>{item.prize.amount}</div>&nbsp;<div className={styles.iso}>{item.prize.iso}</div>
              </div>
            </div>
            </div>
          )}
          </>
          </>)
          :
          props.items.map((item, index) => 
            <div className={styles.item} key={index}>
              <div className={styles.top}>
              <div className={styles.users}>
                  <div className={styles.user}>
                    <img src={item.users[0].avatar} alt=''/>
                    {item.users[0].name}
                  </div>
                  <span>VS</span>
                  <div className={styles.user}>
                    <img src={item.users[1].avatar} alt=''/>
                    {item.users[1].name}
                  </div>
                  </div>
              </div>
              <div className={styles.bottom}>
              <div className={styles.left}>
              {props.style !== 'games' &&
                <HiddenXs>
                <div className={styles.begin}>
                  {item.begin}
                </div>
                </HiddenXs>
              }
              <div className={styles.time}>
                  <img className={styles.rocket} src='/img/Chess/rocket.svg' alt=''/>
                  {item.time}
                </div>
              <div className={styles.mult}>
                <img className={styles.icon} src={item.gameType.icon} alt=''/>
                {item.gameType.mult}
              </div>
              </div>
              <div className={styles.money}>
                <div className={styles.pay}>{item.prize.amount}</div>&nbsp;<div className={styles.iso}>{item.prize.iso}</div>
              </div>
            </div>
            </div>
          )}
          </Scrollbars>
          </section>
          </div>
  )
}
