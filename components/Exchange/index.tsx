import ExchangeForm from './Form'
import styles from './index.module.scss'

interface IUser{
  id: string
  balance: string
}

interface Props {
  isOpen?: boolean
  user: IUser
}

export default function Exchange(props: Props) {
  
  return (
    <div className={styles.root}>
      <ExchangeForm user={props.user}/>
    </div>
  )
}
