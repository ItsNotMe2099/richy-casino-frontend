import styles from './index.module.scss'
import Sheet from 'react-modal-sheet'
import { useAppContext } from 'context/state'
import Close from 'components/svg/Close'


interface Props {
  children: React.ReactNode
  lineOver?: boolean
  closeIconColor?: string
  dragListener?: boolean
}

export default function BottomSheetLayout(props: Props) {
  const appContext = useAppContext()
  return (
    <>
    <Sheet.Container style={{ background: '#1A1C23', borderRadius: '36px 36px 0 0' }}>
      <Sheet.Content dragListener={!!props.dragListener} >
        <div className={styles.root}>
          <Sheet.Header style={{ position: props.lineOver ? 'absolute' : 'static', zIndex: 1 }} />
          <div className={styles.content}>
            {props.children}
          </div>
          <div className={styles.closeBtn} onClick={() => { appContext.hideBottomSheet() }}>
            <Close/>
          </div>
        </div>
      </Sheet.Content>
    </Sheet.Container>
      <Sheet.Backdrop  onTap={() => { appContext.hideBottomSheet() }}/>
    </>
  )
}

