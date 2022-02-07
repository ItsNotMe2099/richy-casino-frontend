import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'

interface Props {
  
}

export default function Winners(props: Props) {

  const users = [
    {nickname: 'Erohin', sort: 1, usdt: '45.1056915',  amount: '+ 00.2120625 BTC · ', avatar: '/img/Winners/folder.jpg'},
    {nickname: 'Enotova', sort: 2, usdt: '45.1056915',  amount: '+ 00.2120625 BTC · ', avatar: '/img/Winners/avatarF.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 00.2120625 BTC · ', avatar: '/img/Winners/avatarM.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 00.2120625 BTC · ', avatar: '/img/Winners/avatarM.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 00.2120625 BTC · ', avatar: '/img/Winners/avatarM.svg'},
    {nickname: 'Sychev', sort: 3, usdt: '45.1056915',  amount: '+ 00.2120625 BTC · ', avatar: '/img/Winners/avatarM.svg'},
  ]

  return (
      <div className={styles.root}>
          <div className={styles.header}>
            <Header icon='/img/Winners/icon.svg' label='ТОП 10 победителей за сегодня' style='labelOnly' shadowColor='violet'/>
          </div>
          <div className={styles.content}>
            <div className={styles.illustration}>
              <img src='/img/Winners/illustration.svg' alt=''/>
            </div>
            <div className={styles.outerWrapper}>
            <div className={styles.wrapper}>
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
                        <img src='/img/Winners/BTC.png' alt=''/>{item.amount} <span> &nbsp;50%</span>
                      </div>
                    </div>
                  </div>
                )}
                <div className={styles.transparent}></div>
            </div>
            </div>
            </div>
            {/*<div className={styles.list}>
              {users.slice(0, 3).map((item, index) => 
                <div className={styles.user} key={index}>
                  <div className={styles.userLeft}>
                    <div className={styles.award}>
                      <img 
                      src={item.sort === 1 ? '/img/Winners/award1.svg' : item.sort === 2 ? '/img/Winners/award2.svg' : '/img/Winners/award3.svg'} 
                      alt=''/>
                    </div>
                  <div className={styles.avatar}>
                    <img src={item.avatar} alt=''/>
                  </div>
                  <div className={styles.nick}>
                    {item.nickname}
                  </div>
                </div>
                <div className={styles.game}>
                  {item.game}
                </div>
                <div className={styles.amount}>
                  +{item.amount} BTC
                </div>
                </div>
              )}
              </div>*/}
          </div>
      </div>
  )
}
