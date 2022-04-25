import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'

interface Props {
  error: string[] | string | null
}
export default function FormError({ error }: Props) {
  const {t, i18n} = useTranslation()
  if (!error) {
    return <></>
  }
  return (
    <div className={styles.root}>
      <img src='/img/icons/error.svg' alt=''/>
      <div className={styles.list}>
        {Array.isArray(error)
          ? error.map((error, index) => <div className={styles.errorListItem} key={index}>{i18n.exists(error) ? t(error) : error}</div>)
          : error}
      </div>


    </div>
  )
}
