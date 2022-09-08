import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import {useTournamentContext} from 'context/tournament_state'
import SliderArrowSvg from 'components/svg/SliderArrowSvg'
import classNames from 'classnames'
import {useRouter} from 'next/router'
import {Routes} from 'types/routes'
const BlockHeading = (props: {title: string}) => {
  return (<div className={classNames(styles.heading)}>

    <div className={classNames(styles.headingIcon)}>
      <div className={styles.headingIconShadow}>
        <img src={'/img/shadows/yellow-tournament.png'} alt=''/>
      </div>
      <img src={'/img/Contents/cup.svg'} alt=''/>
    </div>
    <div className={styles.headingTitle}>
      {props.title}
    </div>
  </div>)
}
interface Props {
  tournament: ITournamentHistory
}

export default function TournamentHeader(props: Props) {
  const {t} = useTranslation()
  const tournamentContext = useTournamentContext()
  const context = useAppContext()
  const router = useRouter()
  const handleBack = () => {
    router.replace(Routes.tournaments)
  }
  return (
    <div className={styles.root}>
      <div className={styles.back} onClick={handleBack}><SliderArrowSvg />{!context.isMobile && <div>{t('tournament_page_back')}</div>}</div>
      <BlockHeading title={props.tournament.tournamentName}/>
    </div>
  )
}
