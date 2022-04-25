import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import Timer from 'components/for_pages/Common/Timer'
import {BonusDepositShowMode} from 'types/enums'

interface Props {
  timer?: boolean
}

export default function Gift(props: Props) {
  const appContext = useAppContext()
  const details = appContext.bonusBannerDetails
  const expiredAt = new Date(details?.validTill)

  return (
      <div className={styles.root} onClick={() => appContext.setBonusShowMode(BonusDepositShowMode.Spoiler)}>
        <div className={styles.imgWrapper}>
          <img src='/img/TopSlider/bonus.svg' alt=''/>
        </div>
        {props.timer && expiredAt && <Timer minutes style='gift' expiredAt={expiredAt}/>}
      </div>
  )
}

