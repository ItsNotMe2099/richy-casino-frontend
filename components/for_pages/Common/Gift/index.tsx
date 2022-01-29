import Timer from '../ShortBanner/Timer'
import styles from './index.module.scss'
import {useAppContext} from 'context/state'

interface Props {
  timer?: boolean
}

export default function Gift(props: Props) {
  const appContext = useAppContext()
  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
      <div className={styles.root} onClick={() => appContext.setBonusExpanded(true)}>
        <img src='/img/TopSlider/bonus.svg' alt=''/>
        {props.timer && <Timer expiredAt={expiredAt} size='small'/>}
      </div>
  )
}

