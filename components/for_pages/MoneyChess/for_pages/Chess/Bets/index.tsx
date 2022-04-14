import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import styles from 'components/for_pages/MoneyChess/for_pages/Chess/Bets/index.module.scss'

interface Props {

}

export default function Bets(props: Props) {

  const items = [
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}],
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'},
      date: '2021-03-27T12:46:24.007Z'
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}],
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'},
      date: '2021-03-27T12:46:24.007Z'
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}],
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'},
      date: '2021-03-27T12:46:24.007Z'
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}],
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'},
      date: '2022-03-25T12:46:24.007Z'
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}],
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'},
      date: '2022-03-25T12:46:24.007Z'
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}],
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'},
      date: '2022-03-25T12:46:24.007Z'
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}],
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'},
      date: '2022-03-25T12:46:24.007Z'
    },
  ]

  return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <SwitchFilter chessBets/>
        </div>

      </div>
  )
}
