import styles from './index.module.scss'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import {useTranslation} from 'next-i18next'
import Header from 'components/for_pages/Common/Header'
import {useAppContext} from 'context/state'

interface Props {
  tournament: ITournamentHistory
}
const ListItem = (props: {number: number, value: string}) => {
    return (<div className={styles.item}>
      <div className={styles.number}>{props.number}</div>
      <div className={styles.value}>{props.value}</div>
    </div>)
}
export default function TournamentConditions(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()

  return (
   <div className={styles.root}>
     <Header
       label={'Условия турнира'}/>
     <div className={styles.items}>
     <ListItem number={1} value={'dsadsada sad sadsa dsad sadas dsa da '}/>
     <ListItem number={2} value={'dsadsada sad sadsa dsad sadas dsa da '}/>
     <ListItem number={3} value={'dsadsada sad sadsa dsad sadas dsa da '}/>
     </div>
   </div>

  )
}
