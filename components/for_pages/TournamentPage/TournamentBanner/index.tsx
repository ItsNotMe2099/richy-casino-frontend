import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import Image from 'next/image'
import Timer from 'components/for_pages/Common/Timer'
import Formatter from 'utils/formatter'
import BitcoinSvg from 'components/svg/BitcoinSvg'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import {useTournamentContext} from 'context/tournament_state'
interface IUser {
  nickname: string
  sort: number
  usdt: string
  amount: string
  avatar: string
}

interface Props {
  tournament: ITournamentHistory
}
const PrizeBackgroundDesktop = () => {
  return (<svg width="536" height="109" viewBox="0 0 536 109" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M58.3555 14.2658C63.8169 5.39982 73.4852 0 83.8983 0H452.102C462.515 0 472.183 5.39981 477.644 14.2658L536 109H0L58.3555 14.2658Z" fill="#1D1E25"/>
    </svg>
  )
}
export default function TournamentBanner(props: Props) {
  const {t} = useTranslation()
  const tournamentContext = useTournamentContext()
  const context = useAppContext()
  const image = !context.isMobile ? props.tournament?.image ?? props.tournament?.imageMobile : props.tournament?.imageMobile ?? props.tournament?.image
  const css = { maxWidth: '100%', height: 'auto' }

  const handleJoin = async () => {

    const res = await tournamentContext.participate(props.tournament.tournamentId)


    if (res) {

    }
  }
  const prize = (<div className={styles.prize}>
    {context.isDesktop && <img src={'/img/Tournament/banner_prize_bg.svg'}/>}
    {context.isMobile && <svg width={'58.7px'} height={'55px'} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.7 55" ><path d="M58.4 0C54 0 49.8 1.8 46.8 5.1L0 55l58.7-.1L58.4 0z"  fill="#1d1e25"/></svg>}
    <div className={styles.wrapper}>
      {context.isDesktop && <div className={styles.wrapperLeft}>
        <BitcoinSvg color={'#FFC700'} className={styles.btc} />

      </div>}
      <div className={styles.wrapperRight}>
        <div className={styles.label}> {context.isMobile && <BitcoinSvg color={'#FFC700'} className={styles.btc} />}<div>{t('tournament_banner_prize')}</div>
        </div>
        <div className={styles.amount}>
          {Formatter.formatAmount(props.tournament.totalBankMoneyAmount, props.tournament.currency|| 'BTC')} {props.tournament?.currency || 'BTC'}
        </div>
      </div>


    </div>

  </div>)
  const isParticipate =!!tournamentContext.userActiveRounds?.find(i => i.roundId === props.tournament.id)
  const joinButton = ( <Button spinner={tournamentContext.participateLoading} onClick={handleJoin} className={classNames({[styles.btnMobile]: context.isMobile, [styles.btn]: !context.isMobile, [styles.hidden]: isParticipate && context.auth})}
                               size='normal' background='payGradient500'>
    <span>{t('tournament_banner_button')}</span>
  </Button>)
  const timer = ( <div className={styles.timer}>
    <Timer expiredAt={new Date(props.tournament?.timeEnd)} days style={context.isMobile ? 'tournamentMobile' : 'tournament'} />
    {context.isDesktop && joinButton}
  </div>)
  const title = (   <div className={styles.title}>{props.tournament.tournamentName}</div>)
  return (
    <div className={styles.root}>
      <div className={styles.image}>{image && <Image objectFit={'cover'} src={image} style={css} layout={'fill'} />}</div>

      {context.isDesktop && <div className={styles.content}>
        <div className={styles.left}>
        </div>
        <div className={styles.center}>
          <div></div>
          {title}
          {prize}
        </div>
        <div className={styles.right}>
          {timer}
        </div>
      </div>}
      {context.isMobile && <div className={styles.contentMobile}>
        <div className={styles.top}>
          {title}
        </div>
        <div className={styles.center}>
          {timer}
        </div>
        <div className={styles.center}>
          {context.isMobile && joinButton}
        </div>


        <div className={styles.bottom}>

          {prize}
        </div>

      </div>}
    </div>
  )
}
