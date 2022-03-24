import styles from './index.module.scss'
import Scrollbars from 'react-custom-scrollbars-2'
import Button from 'components/ui/Button'
import Table from '../Table'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {

}

export default function Games(props: Props) {

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
        <HiddenXs>
        <div className={styles.header}>
          <div className={styles.statistics}>
            <Button background='dark500'>Статистика</Button>
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
            <Button className={styles.create} background='blueGradient500'>Создать игру</Button>
          </div>
        </div>
        </HiddenXs>
        <Table items={items} style='games'/>
        <VisibleXs>
        <div className={styles.header}>
          <div className={styles.statistics}>
            <Button background='dark500'>Статистика</Button>
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
            <Button className={styles.create} background='blueGradient500'>Создать игру</Button>
          </div>
        </div>
        </VisibleXs>
      </div>
  )
}
