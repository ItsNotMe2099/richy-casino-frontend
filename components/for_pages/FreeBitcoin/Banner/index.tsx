import Timer from 'components/for_pages/Common/Timer'
import Button from 'components/ui/Button'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {IFreeBitcoinUserStatus} from 'data/interfaces/IFreeBitcoinUserStatus'
import {useEffect, useState} from 'react'
import FreeBitcoinRepository from 'data/repositories/FreeBitcoinRepository'
import {useAppContext} from 'context/state'
import {differenceInSeconds} from 'date-fns'
import {IFreeBitcoinGame, IFreeBitcoinGameStatus} from 'data/interfaces/IFreeBitcoinGame'
import Formatter from 'utils/formatter'

enum State{
  Timer = 'timer',
  Play = 'play',
  Win = 'win'
}
interface Props {
}

export default function Banner(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const [userStatus, setUserStatus] = useState<IFreeBitcoinUserStatus>(null)
  const [result, setResult] = useState<IFreeBitcoinGame>(null)

  const [state, setState] = useState<State | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState(null)
  useEffect(() => {
    if(!context.auth){
      setState(null)
      setUserStatus(null)
    }
    FreeBitcoinRepository.fetchUserStatus().then(i => {
      setUserStatus(i)
      console.log('Date111', new Date(i.freebitcoinTimeNewFreeAccrual))
      const isExpired = differenceInSeconds(new Date(i.freebitcoinTimeNewFreeAccrual), new Date()) <= 0
      console.log('Date111', new Date(i.freebitcoinTimeNewFreeAccrual), isExpired, state)

      if(isExpired && !state){
        setState(State.Play)
      }else if(!state && !isExpired){
        setState(State.Timer)
      }
    })
  }, [context.auth])
  const Digit = (prop: {digit: string}) => {
    return (
      <div className={styles.digit}>
        {prop.digit}
      </div>
    )
  }

  const handleExpired = () => {
    if(!state || state === State.Timer){
      setState(State.Play)
    }
  }
  const handlePlay = async () => {
    setSending(true)
    try {
      const res = await FreeBitcoinRepository.play()
      setResult(res)
      if(res){
        setUserStatus((status) => ({...status, balanceFreebitcoin: res.balanceLeft}))
      }
      setState(State.Win)
    }catch (e){
      setError(e)
    }
    setSending(false)
  }
  const getNumber = () => {
    return Formatter.pad('00000',userStatus?.balanceFreebitcoin ?? 0)
  }
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
        {getNumber().split('').map((item, index) =>
          <Digit digit={item} key={index}/>
        )}
      </div>
      {state === State.Play &&
        <Button className={styles.btn} spinner={sending} size='huge' background='blueGradient500' onClick={handlePlay}>   {t('freebitcoin_play_now')}</Button>
      }
      {state === State.Win &&
        <div className={styles.win}>
          <div className={styles.you}>{result.status === IFreeBitcoinGameStatus.Win ?  t('freebitcoin_win_title') : 'YOU LOSE'}</div>
          <div className={styles.btns}>
            <div className={styles.coins}>
              <img src='/img/FreeBitcoin/bitcoin.svg' alt=''/>
              <div>{result.amount}</div>
            </div>
            <div className={styles.ticket} onClick={handlePlay}>
              <img src='/img/FreeBitcoin/ticket.svg' alt=''/>
              <div>{result.status} {t('freebitcoin_win_tickets')}</div>
            </div>
          </div>
        </div>
      }
      {state === State.Timer &&
        <div className={styles.timer}>
          <Timer expiredAt={new Date(userStatus.freebitcoinTimeNewFreeAccrual)} style='freebitcoin' onExpire={handleExpired}/>
          <div className={styles.again}>
            {t('freebitcoin_before_play')}
          </div>
        </div>
      }
    </div>
  )
}
