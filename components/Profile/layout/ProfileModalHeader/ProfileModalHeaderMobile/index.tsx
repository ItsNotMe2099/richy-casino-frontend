import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import {ProfileModalType} from 'types/enums'
import { useRouter } from 'next/router'
import Header from 'components/layout/Header'
import ModalClose from '../ModalClose'

interface Props {
  onClose?: () => void
  onBackClick?: () => void
  title?: string
  showDeposit?: boolean
}

export default function ProfileModalHeaderMobile(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const {route: currentRoute, asPath: currentPath} = useRouter()
  const user = context.user

  const getBackTitle = (type: ProfileModalType) => {
    switch (type) {
      case ProfileModalType.betsHistory:
        return t('bets_history_title')
      case ProfileModalType.buyCrypto:
        return t('buy_crypto_title')
      case ProfileModalType.exchange:
        return t('exchange_title')
      case ProfileModalType.FA:
        return t('2fa_title')
      case ProfileModalType.favorite:
        return t('favorite_title')
      case ProfileModalType.paymentHistory:
        return t('payment_history_title')
      case ProfileModalType.profile:
        return t('profile_title')
      case ProfileModalType.settings:
        return t('settings_title')
      case ProfileModalType.wallet:
        return t('wallet_title')
      case ProfileModalType.withdraw:
        return t('withdraw_title')
    }
  }
 return (
    <div className={styles.root}>
      <div className={styles.header}>
      <Header rightButton={<ModalClose className={styles.close} onClick={props.onClose}/>}/>
      </div>
      {(context.lastProfileModal?.type || props.title) && <div className={styles.footer}>
        {!!context.lastProfileModal?.type && <div className={styles.backArea}>
          <div className={styles.arrow} onClick={() => props.onBackClick()}>
            <img src='/img/icons/back-arrow.svg' alt=''/>
          </div>
          <div className={styles.backTitle} onClick={() => props.onBackClick()}>
            {getBackTitle(context.lastProfileModal?.type) ?? ''}
          </div>
        </div>}
        {props.title && <div className={styles.title}>
          {props.title}
        </div>}
      </div>}
    </div>
  )
}
ProfileModalHeaderMobile.defaultProps = {}

