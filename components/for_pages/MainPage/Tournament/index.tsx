import Timer from 'components/for_pages/Common/Timer'
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'

interface Props {
  balance: string
}

export default function Tournament(props: Props) {
    const appContext = useAppContext()
  const someDate = '2022-05-01T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
    <>
    <HiddenXs>
    <div className={styles.root}>
        <div className={styles.hero}><img src={`/img/Tournament/${appContext.isMobile ? 'hero_mobile' : 'hero@3x'}.png`} alt=''/></div>
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
    </HiddenXs>
    <VisibleXs>
      <div className={styles.mobile}>
      <div className={styles.leftMobile}>
        <div className={styles.coins}>
          <img src='/img/Tournament/coins-blur-mobile.png' alt=''/>
        </div>
        <div className={styles.moneyMobile}>
          <img src='/img/Tournament/money-mobile.svg' alt=''/>
        </div>
        <div className={styles.heroMobile}>
          <img src='/img/Tournament/hero-mobile.png' alt=''/>
          <div className={styles.cash}>
          <img src='/img/Tournament/cash.svg' alt=''/>
        </div>
        <div className={styles.coins2}>
          <img src='/img/Tournament/coins-blur-mobile.png' alt=''/>
        </div>
        </div>
        <div className={styles.coin}>
          <img src='/img/Tournament/coin.svg' alt=''/>
        </div>
      </div>
        <div className={styles.rightMobile}>
        <div className={styles.title}>
          ТУРНИР
        </div>
        <div className={styles.fund}>
          <div className={styles.prize}>
            <span>Призовой фонд</span>
            <div className={styles.balance}>
              {props.balance}
            </div>
          </div>
        </div>
        {appContext.auth && <Button className={styles.btnMobile} size='normal' background='payGradient500'>Участвовать</Button>}
        <Timer expiredAt={expiredAt} days style='tournamentMobile'/>
      </div>
      </div>
    </VisibleXs>
    </>
  )
}
