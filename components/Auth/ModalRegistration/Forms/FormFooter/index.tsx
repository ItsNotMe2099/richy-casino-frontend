import styles from './index.module.scss'
import {useTranslation} from 'react-i18next'
import Button from 'components/ui/Button'

import {ModalType} from 'types/enums'
import {useAppContext} from 'context/state'


interface Props {
}

export default function FormFooter(props: Props) {
  const {t} = useTranslation()
  const context = useAppContext()

  return (<>
        <Button type='submit' className={styles.button} size='submit' background='blueGradient500'>{t('registration_button')}</Button>
        <div className={styles.login}>
          {t('registration_has_account')} <span onClick={() => context.showModal(ModalType.login)}>{t('registration_login')}</span>
        </div>
    </>
  )
}
