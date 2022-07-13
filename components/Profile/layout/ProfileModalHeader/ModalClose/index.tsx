import styles from './index.module.scss'
import Close from 'components/svg/Close'
import {useAppContext} from 'context/state'
import classNames from 'classnames'

interface Props {
  className?: string
  onClick?: () => void
}

export default function ModalClose(props: Props) {
  const context = useAppContext()
  const handleClose = () => {
    if(props.onClick){
      props.onClick()
    }else {
      context.hideModal()
    }
  }
  return (
    <div className={classNames(styles.root, props.className)} onClick={handleClose}>
      <Close/>
    </div>
  )
}

