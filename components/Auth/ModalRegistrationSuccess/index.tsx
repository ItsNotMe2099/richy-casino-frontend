import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import Button from 'components/ui/Button'
import {saveDownloadedData} from 'utils/txt'
import {useAppContext} from 'context/state'

interface Props {

}

interface FieldProps {
  text: string
  value: string
  className?: string
}

export default function ModalRegistrationSuccess(props: Props) {

  const { t } = useTranslation()

  const {modalArguments} = useAppContext()
  const handleDownload = () => {
    saveDownloadedData('richy_casino-credentials.txt', `${t('registration_completed_field_login')}: ${modalArguments.login}\r\n ${t('registration_completed_field_password')}: ${modalArguments.password}`)
  }
  const Field = ({text, value, className}: FieldProps) => {

    return(
      <div className={classNames(styles.content, className)}>
        <div className={styles.left}>
        <div className={styles.text}>
          {text}
        </div>
        <div className={styles.value}>
          <input type='text' value={value} id='myInput' disabled/>
        </div>
        </div>
        <div className={styles.copy} onClick={() => {navigator.clipboard.writeText(value)}}>
          <img src='/img/icons/copy.svg' alt=''/>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <img src='/img/Auth/Vector.svg' alt=''/>
      </div>
      <div className={styles.title}>
        {t('registration_completed_title')}
      </div>
      <div className={styles.reminder}>
        {t('registration_completed_text')}
      </div>
      <Field text={t('registration_completed_field_login')} value={modalArguments.login}/>
      <Field text={t('registration_completed_field_password')} value={modalArguments.password} className={styles.password}/>
      <Button className={styles.button} size='submit' background='blueGradient500' onClick={handleDownload}>{t('registration_completed_download')}</Button>
    </div>
  )
}
