import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import {useAppContext} from 'context/state'

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

export default function ProfileBurger(props: Props) {
  const {isOpen, onRequestClose} = props
  const appContext = useAppContext()
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage  ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '11',
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

  if(appContext.isMobile) {
    /* eslint-disable */
    // @ts-ignore
    return (
    <Sheet isOpen={isOpen} onClose={onRequestClose}>
      <div className={styles.sheet}>
      <Sheet.Container onViewportBoxUpdate>
        <Sheet.Header onViewportBoxUpdate />
        <Sheet.Content onViewportBoxUpdate>{isOpen && 
        <div>
          BLANK
        </div>}
        </Sheet.Content>
      </Sheet.Container>
      </div>

      <Sheet.Backdrop onViewportBoxUpdate/>
    </Sheet>
    )
  }
}
