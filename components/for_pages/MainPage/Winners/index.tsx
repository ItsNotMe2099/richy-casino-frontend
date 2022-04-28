import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import { useAppContext } from 'context/state'
import { Scrollbars } from 'react-custom-scrollbars-2'
import classNames from 'classnames'

interface IUser {
  nickname: string
  sort: number
  usdt: string
  amount: string
  avatar: string
}

interface Props {

}

export default function Winners(props: Props) {

  const context = useAppContext()

  const user = context.auth

  const users = [
    {nickname: 'Erohin', sort: 1, usdt: '45.1056915',  amount: '+ 0.02120625 BTC', avatar: '/img/Winners/folder.jpg'},
    {nickname: 'Enotova', sort: 2, usdt: '45.1056915',  amount: '+ 0.02120625 BTC', avatar: '/img/Winners/avatarF.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 0.02120625 BTC', avatar: '/img/Winners/avatarM.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 0.02120625 BTC', avatar: '/img/Winners/avatarM.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 0.02120625 BTC', avatar: '/img/Winners/avatarM.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 0.02120625 BTC', avatar: '/img/Winners/avatarM.svg'},
  ]

  //temporary
  const userTemp = {avatar: '/img/Winners/avatarM.svg', nickname: 'Blackjack 777', position: '50th+',
  done: '45.1056915 USDT', top10: '33.1056915 USDT', prize: '+ 00.2120625 BTC · '
}

  return (
      <div className={styles.root} id={'leader-board'}>
          <div className={styles.header}>
            <Header icon='/img/Winners/icon.svg' label='ТОП 10 победителей за сегодня' style='popover' shadowColor='violet'/>
          </div>
          <div className={styles.content}>
            <div className={styles.illustration}>
              <img src='/img/Winners/illustration.svg' alt=''/>
            </div>
            <div className={styles.outerWrapper}>
            <div className={styles.transparent}></div>
            <table className={classNames(styles.table)}>
        <thead>
        <tr className={styles.row}>
          <th className={styles.cell}>
            #
          </th>
          <th className={styles.cell}>
            Игрок
          </th>
          <th className={styles.cell}>
            Пари сделано
          </th>
          <th className={styles.cell}>
            Приз
          </th>
        </tr>
        </thead>
        <tbody>
        <Scrollbars className={styles.scroll}>
        {users.map((item, index) =>
                  <tr className={styles.user} key={index}>
                    <td className={styles.cell}>
                      <img
                      src={item.sort === 1 ? '/img/Winners/award1.svg' : item.sort === 2 ? '/img/Winners/award2.svg' : '/img/Winners/award3.svg'}
                      alt=''/>
                    </td>
                    <td className={styles.cell}>
                    <div className={styles.group}>
                      <div className={styles.avatar}>
                        <img src={item.avatar} alt=''/>
                      </div>
                      <div className={styles.nick}>
                        {item.nickname}
                      </div>
                    </div>
                    </td>
                    <td className={styles.cell}>
                      <div className={styles.group}>
                        <img src='/img/Winners/t.png' alt=''/>{item.usdt} USDT
                      </div>
                    </td>
                    <td className={styles.cell}>
                    <div className={styles.group}>
                        <img src='/img/Winners/BTC.png' alt=''/>{item.amount}
                      </div>
                    </td>
                  </tr>
                )}
        </Scrollbars>
        </tbody>
      </table>
            {/*<Scrollbars className={styles.scroll}>
              <div className={styles.table}>
              <div className={styles.row}>
                <div className={styles.cell}>
                  #
                </div>
                <div className={styles.cell}>
                  Игрок
                </div>
                <div className={styles.cell}>
                  Пари сделано
                </div>
                <div className={styles.cell}>
                  Приз
                </div>
              </div>
                {users.map((item, index) =>
                  <div className={styles.user} key={index}>
                    <div className={styles.cell}>
                      <img
                      src={item.sort === 1 ? '/img/Winners/award1.svg' : item.sort === 2 ? '/img/Winners/award2.svg' : '/img/Winners/award3.svg'}
                      alt=''/>
                    </div>
                    <div className={styles.cell}>
                    <div className={styles.group}>
                      <div className={styles.avatar}>
                        <img src={item.avatar} alt=''/>
                      </div>
                      <div className={styles.nick}>
                        {item.nickname}
                      </div>
                    </div>
                    </div>
                    <div className={styles.cell}>
                      <div className={styles.group}>
                        <img src='/img/Winners/t.png' alt=''/>{item.usdt} USDT
                      </div>
                    </div>
                    <div className={styles.cell}>
                    <div className={styles.group}>
                        <img src='/img/Winners/BTC.png' alt=''/>{item.amount}
                      </div>
                    </div>
                  </div>
                )}
            </div>
                </Scrollbars>*/}
            </div>
          </div>
          {user &&
            <div className={styles.bottom}>
              <div className={styles.group}>
                <div className={styles.avatar}>
                  <img src={userTemp.avatar} alt=''/>
                </div>
                <div className={styles.nick}>
                  {userTemp.nickname}
                </div>
              </div>
              <div className={styles.element}>
                <div className={styles.title}>
                  Моя позиция
                </div>
                <div className={styles.value}>
                  {userTemp.position}
                </div>
              </div>
              <div className={styles.element}>
                <div className={styles.title}>
                  Пари сделано
                </div>
                <div className={styles.value}>
                  <div className={styles.group}>
                    <img src='/img/Winners/t.png' alt=''/>{userTemp.done}
                  </div>
                </div>
              </div>
              <div className={styles.element}>
                <div className={styles.title}>
                  Что бы достичь <span>топ 10</span>
                </div>
                <div className={styles.value}>
                  <div className={styles.group}>
                    <img src='/img/Winners/t.png' alt=''/>{userTemp.top10}
                  </div>
                </div>
              </div>
              <div className={styles.element}>
                <div className={styles.title}>
                  Приз
                </div>
                <div className={styles.value}>
                  <div className={styles.group}>
                    <img src='/img/Winners/BTC.png' alt=''/>{userTemp.prize}<span> &nbsp;50%</span>
                  </div>
                </div>
              </div>
            </div>
          }
      </div>
  )
}