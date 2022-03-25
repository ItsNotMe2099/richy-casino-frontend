import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Table from '../Table'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useState } from 'react'
import classNames from 'classnames'
import CreateGame from '../CreateGame'

interface Props {

}

export default function Games(props: Props) {

  const [isStatsView, setStatsView] = useState(false)
  const [isCreateView, setCreateView] = useState(false)

  const handleStatistics = () => {
    setStatsView(true)
    setCreateView(false)
  }

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
      <>
      {isCreateView ?
      <CreateGame onClick={handleStatistics}/>
      :
      <div className={styles.root}>
        <HiddenXs>
        <div className={styles.header}>
          <div className={styles.statistics}>
            {isStatsView && 
            <>
            <div className={styles.back} onClick={() => setStatsView(false)}><img src='/img/Chess/arrow.svg' alt=''/></div>
            <div className={styles.stats}>Статистика</div>
            </>
            }
            {!isStatsView && <Button background='dark500' onClick={() => setStatsView(true)}>Статистика</Button>}
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
            {!isStatsView && <Button onClick={() => setCreateView(true)} className={styles.create} background='blueGradient500'>Создать игру</Button>}
          </div>
        </div>
        </HiddenXs>
        {isStatsView &&
        <VisibleXs>
        <div className={styles.header}>
          <div className={classNames(styles.statistics, {[styles.altStats]: isStatsView})}>
            <div className={styles.back} onClick={() => setStatsView(false)}><img src='/img/Chess/arrow.svg' alt=''/></div>
            <div className={styles.stats}>Статистика</div>
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
          </div>
        </div>
        </VisibleXs>}
        <Table items={items} style='games' isStats={isStatsView}/>
        {!isStatsView &&
        <VisibleXs>
        <div className={styles.header}>
          <div className={styles.statistics}>
          {isStatsView && 
            <>
            <div className={styles.back} onClick={() => setStatsView(false)}><img src='/img/Chess/arrow.svg' alt=''/></div>
            <div className={styles.stats}>Статистика</div>
            </>
          }
          <Button background='dark500' onClick={() => setStatsView(true)}>Статистика</Button>
          </div>
          <div className={styles.btnsGroup}>
            <Button className={styles.filter} background='dark500'>Фильтр</Button>
            <Button onClick={() => setCreateView(true)} className={styles.create} background='blueGradient500'>Создать игру</Button>
          </div>
        </div>
        </VisibleXs>}
      </div>}
      </>
  )
}
