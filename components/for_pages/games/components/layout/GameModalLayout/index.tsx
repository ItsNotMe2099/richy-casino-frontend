import styles from './index.module.scss'
import {ReactElement} from 'react'
import GameModalCloseSvg from 'components/for_pages/games/components/svg/GameModalCloseSvg'
import classNames from 'classnames'
import {RemoveScroll} from 'react-remove-scroll'

interface Props{
  children: ReactElement | ReactElement[],
  open?: boolean
  onClose: () => void,
  fixed?: boolean
  fade?: boolean
}

export default function GameModalLayout(props: Props) {
  const {children, onClose, fixed, fade, open} = props
  const handleOverlayClick = (e) => {
    e.stopPropagation()
    if(onClose){
      onClose()
    }
  }
  return (
    <RemoveScroll enabled={!!fixed && open}>
    <div className={classNames(styles.root, {[styles.fixed]: fixed, [styles.fade]: fade, [styles.open]: open})}>
     <div className={styles.overlay} onClick={handleOverlayClick}/>
     <div className={styles.content}>
       <div className={styles.close} onClick={onClose}><GameModalCloseSvg/></div>
       {children}
     </div>
    </div>
    </RemoveScroll>
  )
}


