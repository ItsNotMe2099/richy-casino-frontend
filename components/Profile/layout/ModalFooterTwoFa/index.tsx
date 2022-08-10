import styles from './index.module.scss'
import Button from 'components/ui/Button'
import ProfileModalFooter from 'components/Profile/layout/ProfileModalFooter'
import classNames from 'classnames'
import {useAppContext} from 'context/state'
import {ProfileModalType, SnackbarType} from 'types/enums'
import UserRepository from 'data/repositories/UserRepository'
import {TwoFaModalArguments} from 'types/interfaces'
import {useState} from 'react'

interface Props {
  className?: string
}

export default function ModalFooterTwoFa(props: Props) {
  const context = useAppContext()
  const [loading, setLoading] = useState(false)
  const handleClick = async () => {
    setLoading(true)
    try {
      const qrUrl = await UserRepository.twoFaEnable()
      context.showModalProfile(ProfileModalType.FA, {qrUrl} as TwoFaModalArguments)
    }catch (error) {
      context.showSnackbar(Array.isArray(error) ? error[0] : error, SnackbarType.error)
    }
    setLoading(false)

  }
  if(context.user.flags.is2FaEnabled){
    return  null
  }
    return (
      <ProfileModalFooter className={classNames(styles.root, props.className)}>
        <div className={styles.text}>
          Повысьте безопасность аккаунта с помощью двухфакторной аутентификации
        </div>
        <Button background={'payGradient500'} spinner={loading} type='submit' className={styles.btn} onClick={handleClick}>
          Включить 2FA
        </Button>
      </ProfileModalFooter>
    )
}
