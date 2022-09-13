import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import {useEffect, useRef, useState} from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import Formatter from 'utils/formatter'
import {useTournamentContext} from 'context/tournament_state'
import {ITournamentHistory} from 'data/interfaces/ITournamentHistory'
import {IPagination} from 'types/interfaces'
import {ITournamentStanding} from 'data/interfaces/ITournamentStanding'
import Pagination from 'components/ui/Pagination'

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

export default function TournamentTop10(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const tournamentContext = useTournamentContext()
  const [standings, setStandings] = useState<IPagination<ITournamentStanding>>({data: [], total: 0})
  const [page, setPage] = useState(1)
  const abortControllerRef = useRef<AbortController | null>(null)

  const isMobile = context.isMobile
  const limit = 10
  useEffect(() => {
    TournamentRepository.fetchRoundStandings(props.tournament.id, 1, limit).then(i => {
      setStandings(i)
    })


  }, [])

  const handlePageClick = async ({selected}) => {
    const page = selected + 1
    setPage(page )
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    abortControllerRef.current = new AbortController()

    try {
      const data = await TournamentRepository.fetchRoundStandings(props.tournament.id, page, limit, {signal: abortControllerRef.current.signal})

      setStandings(data)
      abortControllerRef.current = null
    }catch (e) {

    }
  }

  return (
    <div className={styles.root} id={'leader-board'}>
      <div className={styles.header}>
        <div className={styles.title}>{t('tournament_page_top')}</div>
        <div className={styles.participants}>
          {context.isDesktop && <img src={'/img/Tournament/users.svg'}/>}
          <div className={styles.label}>{t('tournament_page_top_participants')}</div>
          <div className={styles.total}>{standings.total}</div>
        </div>
      </div>
      <div className={styles.content}>
        <table className={classNames(styles.table)}>
          <thead>
          <tr className={styles.row}>
            <th className={styles.cell}>
              #
            </th>
            <th className={styles.cell}>
              {t('tournament_top10_header_player')}
            </th>
            <th className={styles.cell}>
              {t('tournament_top10_header_wager')}
            </th>
            <th className={styles.cell}>
              {t('tournament_top10_header_prize')}
            </th>
          </tr>
          </thead>
          <tbody>
          {(standings.data ?? []).slice(0, 10).map((item, index) =>
            <tr className={styles.user} key={index}>
              <td className={classNames(styles.cell, styles.cellSort)}>
                {item.place > 3 && <div className={styles.place}>{item.place}</div>}
                <img className={classNames({[styles.none]: item.place > 3})}
                     src={item.place === 1 ? '/img/Winners/award1.svg' : item.place === 2 ? '/img/Winners/award2.svg' : item.place === 3 ? '/img/Winners/award3.svg' : null}
                     alt=''/>
              </td>
              <td className={styles.cell}>
                <div className={styles.group}>
                  <div className={styles.avatar}>
                    <Image src={'/img/Winners/avatarM.svg'} width={isMobile ? 16 : 32} height={isMobile ? 16 : 32}/>
                  </div>
                  <div className={styles.nick}>
                    {item.nickname || t('stats_player_hidden')}
                  </div>
                </div>
              </td>
              <td className={classNames(styles.cell, styles.wager)}>
                <div className={styles.group}>
                  {Formatter.formatAmount(item.spentMoneyAmount, item.currencyIso)} {item.currencyIso}
                </div>
              </td>
              <td className={classNames(styles.cell, styles.prize)}>
                {item.sumPrize && <div className={styles.group}>
                  {Formatter.formatAmount(item.sumPrize, item.currencyIso)} {item.currencyIso}
                </div>}
              </td>
            </tr>
          )}
          </tbody>
        </table>


      </div>
      <div className={styles.pagination}>
      <Pagination pageCount={Math.ceil(standings.total / 10) >= 5 ? 5 : Math.ceil(standings.total / 10)} page={page}
                  handlePageClick={handlePageClick} isMobile={context.isMobile}
      />
      </div>

    </div>
  )
}
