import styles from './index.module.scss'
import classNames from 'classnames'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import {useTranslation} from 'next-i18next'
import {IPagination} from 'types/interfaces'
import {useState} from 'react'
import TournamentCard from 'components/for_pages/TournamentListPage/TournamentCard'
import ShowMoreButton from 'components/ui/ShowMoreButton'
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
  initialData: IPagination<ITournamentHistory>
  title: string
  type: 'active' | 'completed'
  disabled?: boolean
}

export default function TournamentListBlock(props: Props) {
  const {t} = useTranslation()
  const [data, setData] = useState<IPagination<ITournamentHistory>>(props.initialData)
  const [isExpanded, setIsExpanded] = useState(false)
  const limit = 6
  const handleJoin = () => {

  }
  return (
    <div className={styles.block}>
      <BlockHeading title={props.title}/>
      <div className={styles.list}>
        {(isExpanded ? data.data : data.data.length > limit ? data.data.slice(0, limit) : data.data).map(i => <TournamentCard key={i.id} disabled={props.type === 'completed'} tournament={i}/>)}
      </div>
      {!isExpanded && data.data.length > limit  && <ShowMoreButton title={t('page_tournaments_show_more')} onShow={() => setIsExpanded(true)}/>}

    </div>

  )
}
