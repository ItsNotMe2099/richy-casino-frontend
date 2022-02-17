import Timer from 'components/for_pages/Common/Timer'
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import {useAppContext} from 'context/state'

interface Props {
  balance: string
}

export default function Tournament(props: Props) {
    const appContext = useAppContext()
  const someDate = '2022-05-01T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
    <div className={styles.root}>
        <div className={styles.hero}><img src={`/img/Tournament/${appContext.isMobile ? 'hero_mobile' : 'hero'}.png`} alt=''/></div>
        <div className={styles.coinsBlur}><img src='/img/Tournament/coins-blur.png' alt=''/></div>
        <div className={styles.money}><img src='/img/Tournament/money.svg' alt=''/></div>
        <div className={styles.money2}><img src='/img/Tournament/money2.svg' alt=''/></div>
        <div className={styles.moneyRight}><img src='/img/Tournament/right.svg' alt=''/></div>
        <div className={styles.left}>
        <div className={styles.title}>
          ТУРНИР
        </div>
        <div className={styles.fund}>
          <div className={styles.prize}>
            Призовой фонд
          </div>
          <div className={styles.balance}>
            {props.balance}
          </div>
        </div>
        </div>
        <div className={styles.right}>
            <Timer expiredAt={expiredAt} days style='tournament'/>
          {appContext.auth && <div className={styles.btnContainer}><Button className={styles.btn} size='normal' background='payGradient500'>Участвовать</Button></div>}
        </div>
    </div>
  )
}
