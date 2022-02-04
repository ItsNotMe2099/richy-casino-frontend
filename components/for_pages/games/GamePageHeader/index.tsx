import styles from 'pages/catalog/index.module.scss'
interface Props {
  icon: string,
  title: string
}
export default function GamePageHeader(props: Props) {
  const {icon, title} = props
  return (
    <div className={styles.root}>
      <div className={styles.icon}></div>
    </div>
  )
}


