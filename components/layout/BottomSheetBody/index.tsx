import styles from './index.module.scss'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import useDetectKeyboardOpen from 'hooks/useKeyboardOpen'

interface Props {
  children: React.ReactNode
  className?: string
  detectKeyboard?: boolean
  footerHeight?: number
}

export default function BottomSheetBody(props: Props) {
  const appContext = useAppContext()
  const [isKeyboardOpen, keyboardHeight, screenHeight] = useDetectKeyboardOpen()
  console.log('isKeyboardOpen', isKeyboardOpen, keyboardHeight, screenHeight)
  return (
    <div className={classNames(styles.root, props.className)}  style={{...(isKeyboardOpen && appContext.isMobile && props.detectKeyboard ? {maxHeight: `${screenHeight as number - 38 - (props.footerHeight ?? 0)}px`} : {})}}>
      {props.children}
    </div>
  )
}
