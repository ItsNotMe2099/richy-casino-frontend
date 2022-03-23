import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import styles from './index.module.scss'
import { StickyContainer, Sticky } from 'react-sticky'
import Scrollbars from 'react-custom-scrollbars-2'

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
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  Время
                </th>
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
                  Выигрыш
                </th>
              </tr>
            </thead>
            <tbody>
            <Scrollbars style={{ width: '100%', height: 250}} 
        renderTrackVertical={props => <div {...props} className={styles.track}/>}
        renderView={props => <div {...props} className={styles.view}/>}>
             {items.map((item, index) => 
              <tr key={index}>
                <td>
                  {item.begin}
                </td>
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
                  <img src={item.gameType.icon} alt=''/>
                  {item.gameType.mult}
                </td>
                <td>
                  <img className={styles.rocket} src='/img/Chess/rocket.svg' alt=''/>
                  {item.time}
                </td>
                <td>
                  {item.prize.amount}&nbsp;{item.prize.iso}
                </td>
              </tr>
             )}
             </Scrollbars>
            </tbody>
          </table>
      </div>
  )
}
