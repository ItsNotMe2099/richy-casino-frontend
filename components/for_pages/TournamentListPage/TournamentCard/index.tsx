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

interface Props {
  tournament: ITournamentHistory
  disabled?: boolean
}

export default function TournamentCard(props: Props) {
  const {t} = useTranslation()
  const handleJoin = () => {

  }
  return (
    <Link href={Routes.tournamentPage(props.tournament.tournamentId)}>
    <a className={classNames(styles.root, {[styles.disabled]: props.disabled})}>
      <div className={styles.image}></div>
      <div className={styles.wrapper}>

      <div className={styles.name}>{props.tournament.tournamentName}</div>
      <div className={styles.prizeFond}>
        <div className={styles.label}>{t('tournament_card_prize_label')}</div>
        <div className={styles.prizeValue}>
          <BitcoinSvg color={props.disabled ? colors.dark100 : '#FFC700' } />
          <div className={styles.value}>{props.tournament.totalBankMoneyAmount} BTC</div>
        </div>
      </div>
        {!props.disabled && props.tournament.timeEnd && <div className={styles.timer}>
          <TournamentCardTimer expiredAt={new Date(props.tournament.timeEnd)}/>
        </div>}
        {props.disabled && <div className={styles.timer}><TournamentCardFinished tournament={props.tournament}/></div>}
        {!props.disabled && <Button  onClick={handleJoin} className={classNames(styles.buttonJoin)}
                size='normal' background='payGradient500'>
          {t('tournament_card_button_join')}
        </Button>}
        {props.disabled && <Button  onClick={handleJoin} className={classNames(styles.buttonWinners)}
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
