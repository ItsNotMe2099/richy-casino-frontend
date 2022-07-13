import Timer from 'components/for_pages/Common/Timer'
import Button from 'components/ui/Button'
import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import { useMeasure } from 'react-use'
//import {useEffect} from 'react'
//import TournamentRepository from 'data/repositories/TournamentRepository'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import TournamentRepository from 'data/repositories/TournamentRepository'
import { useEffect, useState } from 'react'
import { ITournamentRichy } from 'data/interfaces/ITournamentRichy'
import Formatter from 'utils/formatter'
import { useTournamentContext } from 'context/tournament_state'
import * as Scroll from 'react-scroll'
import classNames from 'classnames'
interface Props {

}

export default function Tournament(props: Props) {
  const { t } = useTranslation()
  const appContext = useAppContext()
  const tournamentContext = useTournamentContext()
  const [tournament, setTournament] = useState<ITournamentRichy | null>(null)

  useEffect(() => {
    TournamentRepository.fetchRichyTournament().then(i => {
      setTournament(i)
    })
  }, [])

  const [ref, { width }] = useMeasure()
  const isMobile = appContext.isMobile

  const handleJoin = async () => {
    if (!tournament) {
      return
    }
    const res = await tournamentContext.participate(tournament.tournamentId)
   

    if (res) {
      TournamentRepository.fetchRichyTournament().then(i => {
        setTournament(i)
      })
      setTimeout(() => {
        Scroll.scroller.scrollTo('tournament-user-position', {
          duration: 1500,
          delay: 100,
          smooth: true,
          offset: -250, 
        })
      }, 300)
    }
  }
  if (!tournament) {
    return null
  }

  return (
    <>
      <HiddenXs>
        <div className={styles.root} id={'tournaments'}>
          <div className={styles.hero}><img src={`/img/Tournament/${appContext.isMobile ? 'hero_mobile' : 'hero@3x'}.png`} alt='' /></div>
          <div className={styles.coinsBlur}><img src='/img/Tournament/coins-blur.png' alt='' /></div>
          <div className={styles.money}><img src='/img/Tournament/money.svg' alt='' /></div>
          <div className={styles.money2}><img src='/img/Tournament/money2.svg' alt='' /></div>
          <div className={styles.moneyRight}><img src='/img/Tournament/right.svg' alt='' /></div>
          <div className={styles.left}>
            <div className={styles.title}>
              {t('tournament_banner_title')}
            </div>
            <div className={styles.fund}>
              <div className={styles.prize}>
                {t('tournament_banner_prize')}
              </div>
              <div className={styles.balance}>
                {Formatter.formatAmount(tournament?.totalBankMoneyAmount, tournament.currency)}  {tournament.currency}
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Timer expiredAt={new Date(tournament?.timeEnd)} days style='tournament' />
            {tournamentContext.userActiveRounds.length == 0 && <div className={styles.btnContainer}><Button spinner={tournamentContext.participateLoading} onClick={handleJoin} className={styles.btn} size='normal' background='payGradient500'>{t('tournament_banner_button')}</Button></div>}
          </div>
        </div>
      </HiddenXs>
      <VisibleXs>
        <div className={styles.mobile} ref={ref}>
          <div className={styles.leftMobile}>
            <div className={styles.heroMobile}>
              <Image src='/img/Tournament/hero-mobile.png' layout='fill' />
            </div>
          </div>
          <div className={styles.rightMobile}>
              <div className={styles.title} style={{ fontSize: isMobile && `${width / 12.5}px` }}>
                {t('tournament_banner_title')}
              </div>
        
            <div className={styles.fund}>
              <div className={styles.prize}>
                <span style={{ fontSize: isMobile && `${width / 29}px` }}>{t('tournament_banner_prize')}</span>
                <div className={styles.balance} style={{ fontSize: isMobile && `${width / 33}px` }}>
                  {Formatter.formatAmount(tournament?.totalBankMoneyAmount, tournament.currency)} {tournament.currency}
                </div>
              </div>
            </div>
            <div className={styles.timerMobile}>
              <Timer expiredAt={new Date(tournament.timeEnd)} days style='tournamentMobile' />
            </div>
             <Button spinner={tournamentContext.participateLoading} onClick={handleJoin} className={classNames({[styles.btnMobile]: true, [styles.hidden]: tournamentContext.userActiveRounds.length == 0})}
              size='normal' background='payGradient500'>
              <span style={{ fontSize: isMobile && `${width / 24}px` }}>{t('tournament_banner_button')}</span>
            </Button>
          </div>
        </div>
      </VisibleXs>
    </>
  )
}
