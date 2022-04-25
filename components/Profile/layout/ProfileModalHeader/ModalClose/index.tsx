import styles from './index.module.scss'
import Close from 'components/svg/Close'
import {useAppContext} from 'context/state'

interface Props {
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
    <div className={styles.root} onClick={handleClose}>
      <Close/>
    </div>
  )
}

