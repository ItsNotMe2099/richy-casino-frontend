import styles from './index.module.scss'
import ReactModal from 'react-modal'
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

export default function CreateGameModal(props: Props) {
  const {isOpen, onRequestClose} = props
  const appContext = useAppContext()
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage  ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '20',
    },
    content: {
      width: '42.9rem',
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

    return (
      <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
        <div className={styles.root}>
          
        </div>
      </ReactModal>
    )
}