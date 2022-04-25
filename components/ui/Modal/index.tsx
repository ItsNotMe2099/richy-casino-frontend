import styles from './index.module.scss'
import ReactModal from 'react-modal'
import Close from 'components/svg/Close'
import HiddenXs from '../HiddenXS'
import VisibleXs from '../VisibleXS'
import Sheet from 'react-modal-sheet'
import {useAppContext} from 'context/state'
import classNames from 'classnames'

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

export default function Modal(props: Props) {
  const {isOpen, onRequestClose} = props
  const appContext = useAppContext()
  const customStyles = {
    overlay: {
      backgroundColor: !props.singlePage ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
      display: 'flex',
      zIndex: '30',
    },
    content: {
      //width: '100%',
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
      case 'fortune':
        return styles.rootFortune
      default:
        return styles.rootNormal
    }
  }

  if (appContext.isDesktop) {
    return (
      <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
          <div
            className={`${!props.fortune && styles.root} ${getSizeClass(props.size)} ${props.className} ${
              props.center && styles.rootFlex} ${props.fortune && styles.fortune}
            `}
          >
            <HiddenXs>
              <div className={classNames(styles.top, {[styles.noBorder]: props.noBorder})}>
                <div className={styles.title}>
                  {props.title}
                </div>
                <div className={styles.right}>
                  {props.onRequestClose && (
                    <div className={styles.close} onClick={props.onRequestClose}>
                      <Close/>
                    </div>
                  )}
                </div>
              </div>
            </HiddenXs>
            <VisibleXs>
              <div className={styles.top}>
                <div className={styles.line}></div>
                {props.onRequestClose && (
                  <div className={styles.close} onClick={props.onRequestClose}>
                    <Close/>
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
              {props.isOpen && props.children}
            </div>
          </div>
      </ReactModal>
    )
  } else {
    const openModal = () => {
      document.body.classList.add('modal-open')
    }
    const hideModal = () => {
      document.body.classList.remove('modal-open')
    }
    /* eslint-disable */
    // @ts-ignore
    return (
      <Sheet isOpen={isOpen} onClose={onRequestClose} onOpenStart={openModal} onCloseEnd={hideModal}   snapPoints={[620]}>
        <Sheet.Container >
        <div className={classNames(styles.rootSheet, {[styles.sheet]: props.fortune})}>

            <Sheet.Header />
            <div className={classNames(styles.title, {[styles.mobile]: true})}>
              {props.title}
            </div>
            {props.onRequestClose && (
              <div className={styles.close} onClick={props.onRequestClose}>
                <Close/>
              </div>
            )}
            <Sheet.Content >{isOpen &&
            <div className={classNames(styles.centerSheet, {[styles.centerSheetFortune]: props.fortune})}>

              {props.isOpen && props.children}
            </div>}</Sheet.Content>

        </div>
        </Sheet.Container>
        <Sheet.Backdrop  onTap={props.onRequestClose}/>
      </Sheet>
    )
  }
}
Modal.defaultProps = {
  size: 'normal',
}
