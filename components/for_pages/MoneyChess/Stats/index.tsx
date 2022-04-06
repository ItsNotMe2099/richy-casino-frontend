import styles from './index.module.scss'
import Button from 'components/ui/Button'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import classNames from 'classnames'

interface Props {

}

export default function ChessGameStats(props: Props) {



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
        <HiddenXs>
        <div className={styles.header}>
          <div className={styles.statistics}>
            <div className={styles.back}><img src='/img/Chess/arrow.svg' alt=''/></div>
            <div className={styles.stats}>Статистика</div>

          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
           </div>
        </div>
        </HiddenXs>

        <VisibleXs>
        <div className={styles.header}>
          <div className={classNames(styles.statistics, {[styles.altStats]: true})}>
            <div className={styles.back}><img src='/img/Chess/arrow.svg' alt=''/></div>
            <div className={styles.stats}>Статистика</div>
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
          </div>
        </div>
        </VisibleXs>
        {/*<Table items={items} style='games' isStats/>*/}
      </div>
  )
}
