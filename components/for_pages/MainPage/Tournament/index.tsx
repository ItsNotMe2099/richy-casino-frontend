import Timer from 'components/for_pages/Common/Timer'
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { ModalType } from 'types/enums'
import { useMeasure } from 'react-use'
import {useEffect} from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'

interface Props {
  balance: string
}

export default function Tournament(props: Props) {
    const appContext = useAppContext()
  const someDate = '2022-05-01T12:46:24.007Z'
  useEffect(() => {
    TournamentRepository.fetchRichyTournaments().then(i => {

    })
  }, [])

  const [ref, { width }] = useMeasure()
  const isMobile = appContext.isMobile

  const expiredAt = new Date(someDate)

  const handleJoin = () => {
    if(!appContext.auth){
      appContext.showModal(ModalType.registration)
    }
  }

  return (
    <>
    <HiddenXs>
    <div className={styles.root} id={'tournaments'}>
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
          <div className={styles.btnContainer}><Button onClick={handleJoin} className={styles.btn} size='normal' background='payGradient500'>Участвовать</Button></div>
        </div>
    </div>
    </HiddenXs>
    <VisibleXs>
      <div className={styles.mobile} ref={ref}>
      <div className={styles.leftMobile}>
        <div className={styles.heroMobile}>
          <img src='/img/Tournament/hero-mobile.png' alt=''/>
        </div>
      </div>
        <div className={styles.rightMobile}>
        <div className={styles.title} style={{fontSize: isMobile && `${width /12.5}px`}}>
          ТУРНИР
        </div>
        <div className={styles.fund}>
          <div className={styles.prize}>
            <span style={{fontSize: isMobile && `${width /29}px`}}>Призовой фонд</span>
            <div className={styles.balance} style={{fontSize: isMobile && `${width /33}px`}}>
              {props.balance}
            </div>
          </div>
        </div>
        <Button onClick={handleJoin} className={styles.btnMobile} size='normal' background='payGradient500'>
          <span style={{fontSize: isMobile && `${width /24}px`}}>Участвовать</span>
        </Button>
        <Timer expiredAt={expiredAt} days style='tournamentMobile'/>
      </div>
      </div>
    </VisibleXs>
    </>
  )
}
