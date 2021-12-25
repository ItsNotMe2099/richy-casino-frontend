import styles from './index.module.scss'
import ReactModal from 'react-modal'
import Close from 'components/svg/Close'
import HiddenXs from '../HiddenXS'
import VisibleXs from '../VisibleXS'

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  size?: 'normal' | 'large'
  title?: string
  image?: string
  children?: any
  loading?: boolean
  className?: string
  closeClassName?: string
  center?: boolean
  singlePage?: boolean
}

export default function Modal(props: Props) {
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage  ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '11',
    },
    content: {
      width: '100%',
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

  const getSizeClass = (size) => {
    switch (size) {
      case 'large':
        return styles.rootLarge
      default:
        return styles.rootNormal
    }
  }
  return (
    <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className={styles.frame}>
        <div
          className={`${styles.root} ${getSizeClass(props.size)} ${props.className} ${
            props.center && styles.rootFlex
          }`}
        >
          <HiddenXs>
          <div className={styles.top}>
          <div className={styles.title}>
            {props.title}
          </div>
          {props.onRequestClose && (
            <div className={styles.close} onClick={props.onRequestClose}>
              <Close />
            </div>
          )}
          </div>
          </HiddenXs>
          <VisibleXs>
          <div className={styles.top}>
          <div className={styles.line}></div>
          {props.onRequestClose && (
            <div className={styles.close} onClick={props.onRequestClose}>
              <Close />
            </div>
          )}
          <div className={styles.title}>
            {props.title}
          </div>
          </div>
          </VisibleXs>
          <div className={styles.center}>
            {props.image && !props.loading && (
              <div className={styles.image}>
                <img src={props.image} alt=''/>
              </div>
            )}
            {props.children}
          </div>
        </div>
      </div>
    </ReactModal>
  )
}
Modal.defaultProps = {
  size: 'normal',
}
