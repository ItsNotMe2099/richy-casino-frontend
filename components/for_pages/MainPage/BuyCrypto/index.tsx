import Button from 'components/ui/Button'
import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import {ModalType, ProfileModalType} from 'types/enums'
import {useAppContext} from 'context/state'



interface Props {
  children?: React.ReactNode
  className?: string
}

export default function BuyCrypto(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const handleClick = () => {
    if (!appContext.auth) {
      appContext.showModal(ModalType.registration)
    } else {
      appContext.showModalProfile(ProfileModalType.buyCrypto)
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.no}>
        No Crypto? Take it
      </div>
      <div className={styles.pay}>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/google-pay.svg' alt=''/>
        </div>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/master-card.svg' alt=''/>
        </div>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/visa.svg' alt=''/>
        </div>
        <div className={styles.icon}>
        <img src='/img/BuyCrypto/apple.svg' alt=''/>
        </div>
        <div>
        <img src='/img/BuyCrypto/samsung-pay.svg' alt=''/>
        </div>
      </div>
      <Button className={styles.btn} size='normal' background='payGradient500' onClick={handleClick}>Buy Crypto</Button>
    </div>
  )
}

