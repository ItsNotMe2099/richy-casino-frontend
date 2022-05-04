import styles from 'components/Profile/layout/ProfileModalHeader/ProfileModalHeaderMobile/index.module.scss'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import Logo from 'components/svg/Logo'
import Button from 'components/ui/Button'
import {ProfileModalType} from 'types/enums'
import ModalClose from 'components/Profile/layout/ProfileModalHeader/ModalClose'

interface Props {
  onClose?: () => void
  onBackClick?: () => void
  title?: string
  showDeposit?: boolean
}

export default function ProfileModalHeaderMobile(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()

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

  console.log('context.lastProfileModal?.type', context.lastProfileModal?.type)
  return (
    <div className={styles.root}>
      <div className={styles.header}>
      <div className={styles.left}>
        <Logo className={styles.logo}/>
        {context.user && <div className={styles.balance}>
          <div className={styles.label}>
            BALANCE
          </div>
          <div className={styles.amount}>
            {context.user.balance.totalCalculatedAmount} {context.user.currencyIso}
          </div>
        </div>}
        </div>
        <div className={styles.right}>
        <Button background='payGradient500' className={styles.deposit}
                onClick={() => context.showModalProfile(ProfileModalType.wallet, props.title)}><img
          src='/img/icons/wallet.svg' alt=''/>{t('profile_deposit')}</Button>
        <ModalClose onClick={props.onClose}/>
        </div>
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

