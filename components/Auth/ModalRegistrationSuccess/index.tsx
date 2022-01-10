import styles from './index.module.scss'
import { useTranslation } from 'react-i18next'
import classNames from 'classnames'
import { useModal } from 'store/modal-store'
import Button from 'components/ui/Button'

interface Props {
  
}

interface FieldProps {
  text: string
  value: string
  className?: string
}

export default function ModalRegistrationSuccess(props: Props) {

  const { t } = useTranslation('common')

  const {open, modalProps} = useModal()

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
        Регистрация завершена
      </div>
      <div className={styles.reminder}>
        Не забудьте сохранить
          логин и пароль:
      </div>
      <Field text='Логин' value={/*modalProps.login*/'Alex'}/>
      <Field text='Пароль' value={/*modalProps.password*/'Password1234'} className={styles.password}/>
      <Button className={styles.button} size='submit' background='blueGradient500'>Скачать в TXT</Button>
    </div>
  )
}
