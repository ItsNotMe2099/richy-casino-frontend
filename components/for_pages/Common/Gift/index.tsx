import Timer from '../ShortBanner/Timer'
import styles from './index.module.scss'

interface Props {
  timer?: boolean
}

export default function Gift(props: Props) {

  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
      <div className={styles.root}>
        <img src='/img/TopSlider/bonus.svg' alt=''/>
        {props.timer && <Timer expiredAt={expiredAt} size='small'/>}
      </div>
  )
}

