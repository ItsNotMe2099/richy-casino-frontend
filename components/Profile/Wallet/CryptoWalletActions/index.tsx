import styles from './index.module.scss'
import Button from 'components/ui/Button'
import { useAppContext } from 'context/state'
import { ProfileModalType} from 'types/enums'
import {useTranslation} from 'next-i18next'

interface Props {

}

export const CryptoWalletActions = (props: Props) => {
  const context = useAppContext()
  const {t} = useTranslation()


  const handleClick = (modalType: ProfileModalType) => {
    context.showModalProfile(modalType)
    context.hideBottomSheet()
  }

  return (
    <div className={styles.actions}>
      <div className={styles.top}>
        <Button
          onClick={() => context.showModalProfile(ProfileModalType.buyCrypto)}
          className={styles.btn} background='dark600'><img src='/img/Wallet/buy.svg' alt=''/>{t('wallet_buy_crypto')}
        </Button>
        {/*<Button className={styles.btn} href={'https://trustwallet.com'} target={'_blank'} background='dark600'><img src='/img/Wallet/wallet+.svg' alt=''/>{t('wallet_create')}</Button>*/}
        <Button
          className={styles.btn}
          background='dark600'
          onClick={() => context.showModalProfile(ProfileModalType.exchange)}
        >
          <img src='/img/Wallet/exchange.svg' alt=''/>
          {t('wallet_exchange_crypto')}
        </Button>
      </div>
    </div>
  )
}
