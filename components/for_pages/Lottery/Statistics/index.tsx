import styles from './index.module.scss'
import classNames from 'classnames'

interface Props {
  className?: string
}

export default function Statistics(props: Props) {

  const TopItem = (prop:{title: string, number: string, className: string, classColor: string}) => {

    return (
      <div className={classNames(styles.item, prop.className)}>
        <div className={classNames(styles.title, prop.classColor)}>
          {prop.title}
        </div>
        <div className={styles.number}>
          {prop.number}
        </div>
      </div>
    )
  }

  return (
  <div className={classNames(styles.root, props.className)}>
    <TopItem title='Your ticket' number='16' className={styles.your} classColor={styles.blue}/>
    <TopItem title='Total tickets' number='125.261.166' className={styles.total} classColor={styles.green}/>
    <TopItem title='Win chance' number='125.261.166' className={styles.win} classColor={styles.orange}/>
  </div>
  )
}

