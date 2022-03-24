import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import styles from './index.module.scss'
import Table from '../Table'

interface Props {

}

export default function Bets(props: Props) {

  const items = [
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}], 
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'}
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}], 
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'}
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}], 
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'}
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}], 
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'}
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}], 
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'}
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}], 
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'}
    },
    {begin: '14:30', users: [{name: 'Frida Zevik', avatar: '/img/Chess/avatar1.png'}, {name: 'Frida', avatar: '/img/Chess/avatar2.png'}], 
      gameType: {icon: '/img/Chess/game-type.svg', mult: '2x'}, time: '3 мин + 3 сек', prize: {amount: '+1548.05148', iso: 'RUB'}
    },
  ]

  return (
      <div className={styles.root}>
        <div className={styles.wrapper}>
          <SwitchFilter chessBets/>
        </div>
          <Table items={items}/>
      </div>
  )
}
