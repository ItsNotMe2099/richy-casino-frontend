import styles from './index.module.scss'
import BottomSheetHeader from 'components/layout/BottomSheetHeader'
import ProfileModalHeader from 'components/Profile/layout/ProfileModalHeader'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'


interface Props {
  isBottomSheet?: boolean
  showBack?: boolean
  onBackClick?: ()  => void
}

export const WalletHeader = (props: Props) => {
  const context = useAppContext()
  const {t} = useTranslation()
  if (props.isBottomSheet) {
    return (  <BottomSheetHeader className={styles.mobileHeader} title={t('wallet_title')}  suffix={ <div className={styles.userId}>ID {context.user?.id}</div>}/>)
  } else {
    return ( <ProfileModalHeader title={t('wallet_title')} showId  showBack={props.showBack} onBackClick={props.onBackClick}></ProfileModalHeader>)
  }
}
