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
  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      zIndex: '30',
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
        return styles.sizeLarge
      case 'small':
        return styles.sizeSmall
      default:
        return styles.sizeNormal
    }
  }




  return (
    <ReactModal style={customStyles} isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className={styles.frame}>
        <div className={classNames(styles.root, getSizeClass(props.size))}>
          {props.children}
        </div>
      </div>
    </ReactModal>
  )
}
ProfileModalNew.defaultProps = {
  size: 'normal',
}
