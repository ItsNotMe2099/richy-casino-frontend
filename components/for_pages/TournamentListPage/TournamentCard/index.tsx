import styles from './index.module.scss'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import TournamentCardTimer from 'components/for_pages/TournamentListPage/TournamentCardTimer'
import {useTranslation} from 'next-i18next'
import Link from 'next/link'
import {Routes} from 'types/routes'
import TournamentCardFinished from 'components/for_pages/TournamentPage/TournamentCardFinished'
import ArrowRightButtonSvg from 'components/svg/ArrowRightButtonSvg'
import {colors} from 'scss/variables'
import BitcoinSvg from 'components/svg/BitcoinSvg'
import {useAppContext} from 'context/state'
import Image from 'next/image'
import {useTournamentContext} from 'context/tournament_state'
import {useState} from 'react'
import Formatter from 'utils/formatter'
interface Props {
  tournament: ITournamentHistory
  disabled?: boolean
}

export default function TournamentCard(props: Props) {
  const appContext = useAppContext()
  const tournamentContext = useTournamentContext()
  const [sending, setSending] = useState(false)
  const {t} = useTranslation()
  const isParticipate =!!tournamentContext.userActiveRounds?.find(i => i.roundId === props.tournament.id)

  const handleJoin = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    setSending(true)
    const res = await tournamentContext.participate(props.tournament.tournamentId)

    setSending(false)

  }
  const image = !appContext.isMobile ? props.tournament?.icon ?? props.tournament?.imageMobileSmall : props.tournament?.imageMobileSmall ?? props.tournament?.icon
  return (
    <Link href={Routes.tournamentPage(props.tournament.tournamentId)}>
    <a className={classNames(styles.root, {[styles.disabled]: props.disabled})}>
      <div className={styles.image}>{image && <Image objectFit={'cover'} src={image} layout={'fill'}/>}
        <div className={styles.imageTitle}>{props.tournament.tournamentName.split(' ').join('\n')}</div>
      </div>
      <div className={styles.wrapper}>

      <div className={styles.name}>{props.tournament.tournamentName}</div>
      <div className={styles.prizeFond}>
        <div className={styles.label}>{t('tournament_card_prize_label')}</div>
        <div className={styles.prizeValue}>
          <BitcoinSvg color={props.disabled ? colors.dark100 : '#FFC700' } />
          <div className={styles.value}>{Formatter.formatAmount(props.tournament.totalBankMoneyAmount, props.tournament.currency|| 'BTC')} {props.tournament?.currency || 'BTC'}</div>
        </div>
      </div>
        {!props.disabled && props.tournament.timeEnd && <div className={styles.timer}>
          <TournamentCardTimer expiredAt={new Date(props.tournament.timeEnd)}/>
        </div>}
        {props.disabled && <div className={styles.timer}><TournamentCardFinished tournament={props.tournament}/></div>}
        {!props.disabled && !isParticipate && <Button spinner={sending}  onClick={handleJoin} className={classNames(styles.buttonJoin)}
                                                      size='normal' background='payGradient500'>
          {t('tournament_card_button_join')}
        </Button>}
        {!props.disabled && isParticipate && <Button spinner={sending}  onClick={handleJoin} className={classNames(styles.buttonJoin)}
                                                      size='normal' background='dark700'>
          {t('tournament_card_button_joined')}
        </Button>}
        {props.disabled && <Button disabled onClick={handleJoin} className={classNames(styles.buttonWinners)}
                                    size='normal' >
          <div className={styles.buttonWinnersWrapper}>
            <div>{t('tournament_card_button_winners')}</div>
            <ArrowRightButtonSvg color={colors.white} className={styles.buttonWinnersArrow}/>
          </div>
        </Button>}
      </div>
    </a>
    </Link>

  )
}
