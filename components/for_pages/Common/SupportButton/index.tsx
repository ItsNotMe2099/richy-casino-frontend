import styles from './index.module.scss'
import Button from 'components/ui/Button'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function SupportButton(props: Props) {

  return (
    <div className={styles.support}>
      <Button className={props.className} size='normal' background='dark700'><img src='/img/layout/footer/support.svg' alt=''/>Тех. поддержка</Button>
    </div>
  )
}

