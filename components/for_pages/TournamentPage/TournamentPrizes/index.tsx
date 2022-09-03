import styles from './index.module.scss'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import {useTranslation} from 'next-i18next'
import Header from 'components/for_pages/Common/Header'
import {useAppContext} from 'context/state'
import {useEffect, useState} from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'
import {ITournamentTop10} from 'data/interfaces/ITournamentTop10'

interface Props {
  tournament: ITournamentHistory
}
const getAmountAndCurrency = (list: ITournamentTop10[], place: number): {place: number, amount: number, currency: string} | null => {
  const top10 = list[place + 1] ?? null
  if(!top10){
    return null
  }
  return {place, amount: top10.bankWinAmount, currency: top10.tournamentCurrencyIso}
}
const ListItem = (props: {place: number, prize: string | number, currency: string}) => {
    return (<div className={styles.item}>
      <div className={styles.place}>{props.place}</div>
      <div className={styles.value}>{props.prize} {props.currency}</div>
    </div>)
}
export default function TournamentPrizes(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const [top10, setTop10] = useState<ITournamentTop10[]>([])
  useEffect(() => {
    TournamentRepository.fetchTop10({roundId: 5408}).then(i => {
        setTop10(top10)
    })
  }, [])
  const places = [1, 2, 3, 4, 5, 6].map(i => getAmountAndCurrency(top10, i)).filter(i => !!i)
  console.log('places', places, top10)
  return (
   <div className={styles.root}>
     <Header
       label={'Призовые места'}/>
     <div className={styles.items}>
       {places.map(i => <ListItem key={i.place} place={i.place} prize={i.amount} currency={i.currency}/>)}
     </div>
   </div>
  )
}
