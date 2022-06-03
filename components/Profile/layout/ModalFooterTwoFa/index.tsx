import styles from './index.module.scss'
import Button from 'components/ui/Button'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import {ProfileModalType} from 'types/enums'

interface Props {
  className?: string
}

export default function ModalFooterTwoFa(props: Props) {
  const context = useAppContext()
  if(context.user.flags.is2FaEnabled){
    return  null
  }
    return (
      <ProfileModalFooter className={classNames(styles.root, props.className)}>
        <div className={styles.text}>
          Повысьте безопасность аккаунта с помощью двухфакторной аутентификации
        </div>
        <Button background={'payGradient500'} type='submit' className={styles.btn} onClick={() => context.showModalProfile(ProfileModalType.FA)}>
          Включить 2FA
        </Button>
      </ProfileModalFooter>
    )
}
