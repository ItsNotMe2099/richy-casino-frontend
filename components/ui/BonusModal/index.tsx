import styles from './index.module.scss'
import ReactModal from 'react-modal'
import Sheet from 'react-modal-sheet'
import {useAppContext} from 'context/state'
import classNames from 'classnames'
import ConstantSlide from 'components/for_pages/Common/ConstantSlide'

interface Props {
  isOpen: boolean
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
}

export default function BonusModal(props: Props) {
  const {isOpen, onRequestClose} = props
  const appContext = useAppContext()
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage  ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '20',
    },
    content: {
      width: '34%',
      borderRadius: '21px',
      padding: '0',
      border: '0',
      margin: 'auto',
      position: 'static',
      inset: '0',
      overflow: 'hidden',
      background: 'none',
    },
  }

  if(appContext.isDesktop) {
    return (
      <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <ConstantSlide modal onRequestClose={props.onRequestClose}/>
      </ReactModal>
    )
  }else{
    const openModal = () => {
      document.body.classList.add('modal-open')
    }
    const hideModal = () => {
      document.body.classList.remove('modal-open')
    }
    /* eslint-disable */
    // @ts-ignore
    return (
    <Sheet isOpen={isOpen} onClose={onRequestClose}  onOpenStart={openModal} onCloseEnd={hideModal}>
      <div className={styles.sheet}>
      <Sheet.Container onViewportBoxUpdate>
        <Sheet.Header onViewportBoxUpdate />
        <Sheet.Content onViewportBoxUpdate>{isOpen && <div className={classNames(styles.centerSheet, {[styles.centerSheetFortune]: props.fortune})}>

          <ConstantSlide sheet noBack modal onRequestClose={props.onRequestClose}/></div>}
        </Sheet.Content>
      </Sheet.Container>
      </div>

      <Sheet.Backdrop onViewportBoxUpdate/>
    </Sheet>
    )
  }
}
BonusModal.defaultProps = {
  size: 'normal',
}
