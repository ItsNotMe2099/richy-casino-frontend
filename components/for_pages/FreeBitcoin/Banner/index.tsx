import Timer from 'components/for_pages/Common/Timer'
import Button from 'components/ui/Button'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'

interface Props {
  children?: React.ReactNode
  className?: string
  state: string
  coins: string
}

export default function Banner(props: Props) {
  const {t} = useTranslation()
  const Digit = (prop: {digit: string}) => {
    return (
      <div className={styles.digit}>
        {prop.digit}
      </div>
    )
  }

  const chars = []

  for(let char of props.coins){
    chars.push(char)
  }

  const someDate = '2021-12-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
    <div className={styles.root}>
      <HiddenXs>
        <>
          <div className={styles.coinsLeft}><img src='/img/FreeBitcoin/coins-l.svg' alt=''/></div>
          <div className={styles.coinsRight}><img src='/img/FreeBitcoin/coins-r.svg' alt=''/></div>
        </>
      </HiddenXs>
      <VisibleXs>
        <>
          <div className={styles.coinsLeft}><img src='/img/FreeBitcoin/coins-mobile-l.svg' alt=''/></div>
          <div className={styles.coinsRight}><img src='/img/FreeBitcoin/coins-mobile-r.svg' alt=''/></div>
        </>
      </VisibleXs>
      <div className={styles.amount}>
        {chars.slice((chars.length - 5), chars.length).map((item, index) =>
          <Digit digit={item} key={index}/>
        )}
      </div>
      {props.state === 'play' &&
        <Button className={styles.btn} size='huge' background='blueGradient500'>   {t('freebitcoin_play_now')}</Button>
      }
      {props.state === 'win' &&
        <div className={styles.win}>
          <div className={styles.you}>{t('freebitcoin_win_title')}</div>
          <div className={styles.btns}>
            <div className={styles.coins}>
              <img src='/img/FreeBitcoin/bitcoin.svg' alt=''/>
              <div>{props.coins}</div>
            </div>
            <div className={styles.ticket}>
              <img src='/img/FreeBitcoin/ticket.svg' alt=''/>
              <div>{t('freebitcoin_win_tickets')}</div>
            </div>
          </div>
        </div>
      }
      {props.state === 'timer' &&
        <div className={styles.timer}>
          <Timer expiredAt={expiredAt} style='freebitcoin'/>
          <div className={styles.again}>
            {t('freebitcoin_before_play')}
          </div>
        </div>
      }
    </div>
  )
}

