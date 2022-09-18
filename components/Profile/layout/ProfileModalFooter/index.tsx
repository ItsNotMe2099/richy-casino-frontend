import styles from './index.module.scss'
import classNames from 'classnames'
import {ReactElement} from 'react'
import useDetectKeyboardOpen from 'hooks/useKeyboardOpen'
import {useAppContext} from 'context/state'

interface Props {
  fixed?: boolean
  children?: ReactElement | ReactElement[]
  className?: string
  detectKeyboard?: boolean
}

export default function ProfileModalFooter(props: Props) {
  const appContext = useAppContext()
  const [isKeyboardOpen, keyboardHeight] = useDetectKeyboardOpen()

  return (
    <div className={classNames(styles.root, {[styles.fixed]: props.fixed}, props.className)} style={{...(isKeyboardOpen && appContext.isMobile && props.detectKeyboard ? {bottom: `${keyboardHeight}px`} : {})}}>
      {props.children}
    </div>
    )
}
