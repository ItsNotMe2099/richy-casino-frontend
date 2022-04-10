import styles from './index.module.scss'

interface Props {
  error: string[] | string | null
}
export default function FormError({ error }: Props) {
  if (!error) {
    return <></>
  }
  return (
    <div className={styles.root}>
      <img src='/img/icons/error.svg' alt=''/>
      <div className={styles.list}>
        {Array.isArray(error)
          ? error.map((error, index) => <div className={styles.errorListItem} key={index}>{error}</div>)
          : error}
      </div>


    </div>
  )
}
