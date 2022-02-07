import styles from './index.module.scss'
import ArrowBackSvg from 'components/svg/ArrowBackSvg'
interface Props {
  icon: string,
  title: string
}
export default function GamePageHeader(props: Props) {
  const {icon, title} = props
  return (
    <div className={styles.root}>
      <div className={styles.back}>
        <ArrowBackSvg/>
      </div>
      {icon && <div className={styles.icon}><img src={icon}/></div>}
      <div className={styles.title}>{title}</div>
    </div>
  )
}


