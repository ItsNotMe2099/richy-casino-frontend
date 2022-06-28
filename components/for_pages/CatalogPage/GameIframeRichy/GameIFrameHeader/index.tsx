import styles from './index.module.scss'
import ArrowBackSvg from 'components/svg/ArrowBackSvg'
import {useRouter} from 'next/router'
interface Props {
  icon?: string,
  title: string
}
export default function GameIFrameHeader(props: Props) {
  const {icon, title} = props
  const router = useRouter()

  const handleBack = () => {
  router.back()
  }
  return (
    <div className={styles.root}>
      <div className={styles.back} onClick={handleBack}>
        <ArrowBackSvg/>
      </div>
      {icon && <div className={styles.icon}><img src={icon}/></div>}
      <div className={styles.title}>{title}</div>
    </div>
  )
}


