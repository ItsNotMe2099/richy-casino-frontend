import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import {ProfileModalArguments} from 'types/interfaces'
import ProfileModalHeaderMobile from 'components/Profile/layout/ProfileModalHeader/ProfileModalHeaderMobile'
import ProfileModalHeaderDesktop from 'components/Profile/layout/ProfileModalHeader/ProfileModalHeaderDesktop'

interface Props {
  onClose?: () => void
  onBackClick?: () => void
  title?: string
  showId?: boolean
  showDeposit?: boolean
  showBack?: boolean
}

export default function ProfileModalHeader(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const args = context.modalArguments as ProfileModalArguments
  const handleClose = () => {
    context.hideModal()
  }
  const handleBackClick = () => {
    if(props.onBackClick){
      props.onBackClick()
    }else{
      context.goBackModalProfile()
    }
  }
  return (<div className={styles.root}>
    {context.isMobile ? <ProfileModalHeaderMobile title={props.title} onClose={props.onClose} onBackClick={handleBackClick} showDeposit={props.showDeposit}/>
    : <ProfileModalHeaderDesktop title={props.title} onClose={props.onClose} onBackClick={handleBackClick} showId={props.showId} showBack={props.showBack}/>}
  </div>)
}
ProfileModalHeader.defaultProps = {
  showDeposit: true
}

