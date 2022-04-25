import styles from './index.module.scss'
import ArrowBackSvg from 'components/svg/ArrowBackSvg'
import {useRouter} from 'next/router'
import {Routes} from 'types/routes'
interface Props {
  icon: string,
  title: string
}
export default function GamePageHeader(props: Props) {
  const router = useRouter()
  const {icon, title} = props
  return (
    <div className={styles.root}>
      <div className={styles.back} onClick={() => router.replace(Routes.catalog)}>
        <ArrowBackSvg/>
      </div>
      {icon && <div className={styles.icon}><img src={icon}/></div>}
      <div className={styles.title}>{title}</div>
    </div>
  )
}


