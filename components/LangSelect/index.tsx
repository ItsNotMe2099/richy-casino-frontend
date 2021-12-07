import styles from './index.module.scss'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function LangSelect(props: Props) {
  return (
    <div className={styles.root}>
        <img src='/img/layout/top/russia.svg' alt=''/> Ru
    </div>
  )
}

