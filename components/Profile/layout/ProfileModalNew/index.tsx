import styles from './index.module.scss'
import ReactModal from 'react-modal'
import classNames from 'classnames'
import {useTranslation} from 'next-i18next'
import {ReactElement} from 'react'

interface IUser {
  id: string
  balance: string
}

interface Props {
  isOpen: boolean
  onRequestClose?: () => void
  fixed?: boolean
  size?: 'normal' | 'large' | 'small'
  children?: ReactElement
}

export default function ProfileModalNew(props: Props) {
  const {t} = useTranslation()
  const settings = {
    className: styles.modalContent,
    overlayClassName: classNames(styles.modalOverlay),
  }

  const getSizeClass = (size) => {
    switch (size) {
      case 'large':
        return styles.sizeLarge
      case 'small':
        return styles.sizeSmall
      default:
        return styles.sizeNormal
    }
  }


  return (
    <ReactModal {...settings} isOpen={props.isOpen} onRequestClose={props.onRequestClose} shouldCloseOnOverlayClick>
      <div className={styles.frame}>
        <div className={classNames(styles.root, getSizeClass(props.size))}>
          {props.children}
        </div>
        <div className={styles.overlay} onClick={() => props.onRequestClose()}/>
      </div>

    </ReactModal>
  )
}
ProfileModalNew.defaultProps = {
  size: 'normal',
}
