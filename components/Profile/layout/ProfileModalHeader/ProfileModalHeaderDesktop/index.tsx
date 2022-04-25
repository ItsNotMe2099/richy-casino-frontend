import styles from './index.module.scss'
import {useAppContext} from 'context/state'
import {useTranslation} from 'next-i18next'
import {ProfileModalArguments} from 'types/interfaces'
import ModalClose from 'components/Profile/layout/ProfileModalHeader/ModalClose'
import classNames from 'classnames'

interface Props {
  onClose?: () => void
  onBackClick?: () => void
  title?: string
  showId?: boolean
  showBack?: boolean
}

export default function ProfileModalHeaderDesktop(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()
  const args = context.modalArguments as ProfileModalArguments


  return (
    <div className={classNames(styles.root)}>
      <div className={styles.left}>
        {(props.showBack || context.lastProfileModal?.type)  &&
        <div className={styles.back}
             onClick={props.onBackClick}>
          <img src='/img/icons/back.svg' alt=''/>
        </div>}
        <div className={styles.title}>
          {props.title}
        </div>
      </div>
      <div className={styles.right}>
        {props.showId && context.user && <div className={styles.id}>
          ID {context.user?.id}
        </div>}

        <ModalClose/>

      </div>
    </div>
  )
}


