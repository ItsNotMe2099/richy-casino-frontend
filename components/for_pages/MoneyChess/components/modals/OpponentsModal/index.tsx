import styles from 'components/for_pages/MoneyChess/components/modals/OpponentsModal/index.module.scss'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import { useTimer } from 'react-timer-hook'
import {useChessGameLobbyContext} from 'components/for_pages/MoneyChess/context/lobby_state'


interface Props {

}

interface IUser {
  avatar: string
  name: string
  ready?: boolean
}

interface OpponentProps {
  user: IUser
}

interface StatusProps {
  ready?: boolean
}

interface OptionProps {
  image: string
  label: string
  value: string
  money?: boolean
  dg?: string
}

interface TimerProps {
  expiredAt: Date
}

export default function OpponentsModal(props: Props) {
  const lobbyContext = useChessGameLobbyContext()


  const users = [
    {avatar: '/img/CreateGame/ava1.png', name: 'Alex Terner', ready: true},
    {avatar: '/img/CreateGame/ava2.png', name: 'Frida Zevik3', ready: false}
  ]

  const options = [
    {image: '/img/CreateGame/clock.svg', label: 'Время', value: '10 мин + 10 сек'},
    {image: '/img/CreateGame/coins.svg', label: 'Тип игры', value: '×2'},
    {image: '/img/CreateGame/money.svg', label: 'Ставка', value: '3136.00000', dg: '0.0000004'},
  ]

  const someDate = '2022-07-27T12:46:24.007Z'

      const expiredAt = new Date(someDate)

    const Status = (props: StatusProps) => {
      return (
        <div className={classNames(styles.status, {[styles.ready]: props.ready})}>
          <div className={classNames(styles.text, {[styles.textReady]: props.ready})}>
            {props.ready ? <>Готов</> : <>Ожидание</>}
          </div>
        </div>
      )
    }

    const Opponent = (props: OpponentProps) => {
      return (
        <div className={styles.opponent}>
          <div className={styles.user}>
            <div className={styles.avatar}>
              <img src={props.user.avatar} alt=''/>
            </div>
            <div className={styles.name}>
              {props.user.name}
            </div>
          </div>
          <Status ready={props.user.ready}/>
        </div>
      )
    }

    const Option = (props: OptionProps) => {
      return (
        <div className={styles.option}>
          <div className={styles.icon}>
            <img src={props.image} alt=''/>
          </div>
          <div className={styles.label}>
            {props.label}
          </div>
          <div className={classNames(styles.value, {[styles.green]: props.money})}>
            <div className={styles.money}>{props.value}{props.money && <div className={styles.usdt}>USDT</div>}</div>
            {props.dg && <div className={styles.dg}>{props.dg}<div className={styles.usdt}>DG</div></div>}
          </div>
        </div>
      )
    }

    const Timer = (props: TimerProps) => {

      const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
      } = useTimer({ expiryTimestamp: props.expiredAt, onExpire: () => console.warn('onExpire called') })

      return (
        <div className={styles.timer}>
          <div className={styles.time}>{minutes}:{seconds}</div>
        </div>
      )
    }

    return (
       <div className={styles.root}>
          <div className={styles.top}>
            {users.map((item, index) =>
              <Opponent user={item} key={index}/>
            )}
          </div>
          <div className={styles.options}>
            {options.map((item, index) =>
              <Option image={item.image} label={item.label} value={item.value} key={index} money={index === 2 ? true : false} dg={index === 2 ? item.dg : null}/>
            )}
          </div>
          <Timer expiredAt={expiredAt}/>
          <div className={styles.btns}>
            <Button onClick={lobbyContext.hideModal} background='dark500' className={styles.cancel}>Назад</Button>
            <Button type='submit' background='blueGradient500' className={styles.begin}>Начать игру</Button>
          </div>
        </div>
    )
}
