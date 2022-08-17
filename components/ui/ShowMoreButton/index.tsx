import styles from './index.module.scss'
import Spinner from 'components/ui/Spinner'
import {useTranslation} from 'next-i18next'

interface Props {
  loading?: boolean
  title?: string
  onShow?: () => void
}

export default function ShowMoreButton(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.root} onClick={props.loading ? null : props.onShow}>
      <div className={styles.icon}>
        {props.loading ?   <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/>
          : <img src='/img/CatalogPage/more.svg' alt=''/>}
      </div>
      <div className={styles.text}>
        {props.title ?? t('catalog_list_more')}
      </div>
    </div>
  )
}
