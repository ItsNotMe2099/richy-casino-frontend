import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import { useAppContext } from 'context/state'
import { Scrollbars } from 'react-custom-scrollbars-2'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import TournamentRepository from 'data/repositories/TournamentRepository'
import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import { ITournamentWinner } from 'data/interfaces/ITournamentWinner'
import Formatter from 'utils/formatter'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'
import { useTournamentContext } from 'context/tournament_state'

interface IUser {
  nickname: string
  sort: number
  usdt: string
  amount: string
  avatar: string
}

interface Props {

}

export default function Winners(props: Props) {
  const { t } = useTranslation()
  const context = useAppContext()
  const tournamentContext = useTournamentContext()
  const [winners, setWinners] = useState<ITournamentWinner[]>([])
  const isMobile = context.isMobile
  useEffect(() => {
    TournamentRepository.fetchLastWinners().then(i => {
      setWinners(i)
    })


  }, [])


  const user = context.auth



  return (
    <div className={styles.root} id={'leader-board'}>
      <div className={styles.header}>
        <Header icon='/img/Winners/icon.svg' label={t('tournament_top10_title')} style='popover' shadowColor='violet' popoverText={t('tournament_info_popover')} />
      </div>
      <div className={styles.content}>
        <div className={styles.illustration}>
          <Image src='/img/Winners/illustration.svg' width={392} height={218} />
        </div>
        <div className={styles.outerWrapper}>
          <div className={styles.transparent}></div>
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
                  {t('tournament_top10_header_pari')}
                </th>
                <th className={styles.cell}>
                  {t('tournament_top10_header_prize')}
                </th>
              </tr>
            </thead>
            <tbody>
              <Scrollbars className={styles.scroll}>
                {(winners ?? []).slice(0, 10).map((item, index) =>
                  <tr className={styles.user} key={index}>
                    <td className={classNames(styles.cell, styles.cellSort)}>
                      <div className={styles.nick}>{index + 1}</div>
                      <img className={classNames({ [styles.none]: index + 1 > 3 })}
                        src={index + 1 === 1 ? '/img/Winners/award1.svg' : index + 1 === 2 ? '/img/Winners/award2.svg' : index + 1 === 3 ? '/img/Winners/award3.svg' : null}
                        alt='' />
                    </td>
                    <td className={styles.cell}>
                      <div className={styles.group}>
                        <div className={styles.avatar}>
                          <Image src={'/img/Winners/avatarM.svg'} width={isMobile ? 16 : 32} height={isMobile ? 16 : 32} />
                        </div>
                        <div className={styles.nick}>
                          {item.nickname}
                        </div>
                      </div>
                    </td>
                    <td className={styles.cell}>
                      <div className={styles.group}>
                        <CurrencySvg className={styles.currency} color currencyIso={item.userCurrencyIso} />
                        {Formatter.formatAmount(item.spentMoneyAmount, item.userCurrencyIso)} {item.userCurrencyIso}
                      </div>
                    </td>
                    <td className={styles.cell}>
                      <div className={styles.group}>
                        <CurrencySvg className={styles.currency} color currencyIso={item.tournamentCurrencyIso} />
                        {Formatter.formatAmount(parseFloat(item.bankWinAmount), item.tournamentCurrencyIso)} {item.tournamentCurrencyIso}
                      </div>
                    </td>
                  </tr>
                )}
              </Scrollbars>
            </tbody>
          </table>
          {/*<Scrollbars className={styles.scroll}>
              <div className={styles.table}>
              <div className={styles.row}>
                <div className={styles.cell}>
                  #
                </div>
                <div className={styles.cell}>
                  Игрок
                </div>
                <div className={styles.cell}>
                  Пари сделано
                </div>
                <div className={styles.cell}>
                  Приз
                </div>
              </div>
                {users.map((item, index) =>
                  <div className={styles.user} key={index}>
                    <div className={styles.cell}>
                      <img
                      src={item.sort === 1 ? '/img/Winners/award1.svg' : item.sort === 2 ? '/img/Winners/award2.svg' : '/img/Winners/award3.svg'}
                      alt=''/>
                    </div>
                    <div className={styles.cell}>
                    <div className={styles.group}>
                      <div className={styles.avatar}>
                        <img src={item.avatar} alt=''/>
                      </div>
                      <div className={styles.nick}>
                        {item.nickname}
                      </div>
                    </div>
                    </div>
                    <div className={styles.cell}>
                      <div className={styles.group}>
                        <img src='/img/Winners/t.png' alt=''/>{item.usdt} USDT
                      </div>
                    </div>
                    <div className={styles.cell}>
                    <div className={styles.group}>
                        <img src='/img/Winners/BTC.png' alt=''/>{item.amount}
                      </div>
                    </div>
                  </div>
                )}
            </div>
                </Scrollbars>*/}
        </div>
      </div>
      {tournamentContext.userPosition &&
        <div className={styles.bottom} id={'tournament-user-position'}>
          <div className={styles.group}>
            <div className={styles.avatar}>
              <img src={'/img/Winners/avatarM.svg'} alt='' />
            </div>
            <div className={styles.nick}>
              {tournamentContext.userPosition.nickname}
            </div>
          </div>
          <div className={styles.element}>
            <div className={styles.title}>
              {t('tournament_top10_user_position')}
            </div>
            <div className={styles.value}>
              {tournamentContext.userPosition.userPosition}
            </div>
          </div>
          <div className={styles.element}>
            <div className={styles.title}>
              {t('tournament_top10_user_pari')}
            </div>
            <div className={styles.value}>
              <div className={styles.group}>
                <CurrencySvg className={styles.currency} currencyIso={tournamentContext.userPosition.userCurrencyIso} />
                {Formatter.formatAmount(tournamentContext.userPosition.spentMoneyAmount, tournamentContext.userPosition.userCurrencyIso)} {tournamentContext.userPosition.userCurrencyIso}

              </div>
            </div>
          </div>
          <div className={styles.element}>
            <div className={styles.title}>
              {t('tournament_top10_user_label_1')} <span>{t('tournament_top10_user_label_1_top')}</span>
            </div>
            <div className={styles.value}>
              <div className={styles.group}>
                <CurrencySvg className={styles.currency} currencyIso={tournamentContext.userPosition.userCurrencyIso} />
                {Formatter.formatAmount(tournamentContext.userPosition.sumToReachTop10, tournamentContext.userPosition.userCurrencyIso)} {tournamentContext.userPosition.userCurrencyIso}

              </div>
            </div>
          </div>
          <div className={styles.element}>
            <div className={styles.title}>
              {t('tournament_top10_user_prize')}
            </div>
            <div className={styles.value}>
              <div className={styles.group}>
                <CurrencySvg className={styles.currency} currencyIso={tournamentContext.userPosition.tournamentCurrencyIso} />

                {Formatter.formatAmount(tournamentContext.userPosition.totalBankMoneyAmount, tournamentContext.userPosition.tournamentCurrencyIso)} {tournamentContext.userPosition.tournamentCurrencyIso}
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}
