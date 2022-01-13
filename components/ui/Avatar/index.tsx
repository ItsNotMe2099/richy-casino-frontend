import styles from './index.module.scss'

interface Props {
  avatar: string
}

export default function Avatar({avatar}: Props) {
  return (
    <div className={styles.root}>
      <img src={avatar} alt=''/>
    </div>
  )
}
