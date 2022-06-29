import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import BonusSlide from 'components/for_pages/Common/BonusSlide'
import {BonusDepositShowMode} from 'types/enums'

interface Props {
  isOpen?: boolean
  onRequestClose?: () => void
  size?: 'normal' | 'large' | 'fortune'
  title?: string
  image?: string
  children?: any
  loading?: boolean
  className?: string
  closeClassName?: string
  center?: boolean
  singlePage?: boolean
  noBorder?: boolean
  fortune?: boolean
  isBottomSheet?: boolean
}

export default function BonusModal(props: Props) {
  const {isOpen, onRequestClose} = props
  const appContext = useAppContext()
 
  const handleClose = () => {
    props.onRequestClose()
    appContext.setBonusShowMode(BonusDepositShowMode.Spoiler)
  }

  if(!props.isBottomSheet) {
    return (
      <BonusSlide style='modal' onRequestClose={handleClose}/>
    )
  }else{
    const openModal = () => {
   
    }
    const hideModal = () => {
    }
    /* eslint-disable */
    // @ts-ignore
    return (
    <Sheet isOpen={isOpen} onClose={onRequestClose}  onOpenStart={openModal} onCloseEnd={hideModal}>
      <div className={styles.sheet}>
      <Sheet.Container>
        <Sheet.Header  />
        <Sheet.Content >{isOpen && <div className={classNames(styles.centerSheet, {[styles.centerSheetFortune]: props.fortune})}>
          <BonusSlide style='sheet' onRequestClose={handleClose}/>
        </div>}
        </Sheet.Content>
      </Sheet.Container>
      </div>

      <Sheet.Backdrop onTap={handleClose}/>
    </Sheet>
    )
  }
}
BonusModal.defaultProps = {
  size: 'normal',
}
