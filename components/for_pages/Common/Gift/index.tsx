import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import Timer from 'components/for_pages/Common/Timer'

interface Props {
  timer?: boolean
}

export default function Gift(props: Props) {
  const appContext = useAppContext()
  const someDate = '2022-03-27T12:46:24.007Z'

  const expiredAt = new Date(someDate)

  return (
      <div className={styles.root} onClick={() => appContext.setBonusExpanded(true)}>
        <div className={styles.imgWrapper}>
          <img src='/img/TopSlider/bonus.svg' alt=''/>
        </div>
        {props.timer && <Timer style='gift' expiredAt={expiredAt}/>}
      </div>
  )
}

