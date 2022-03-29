import BuyCryptoForm from './Form'
import styles from './index.module.scss'

interface IUser{
  id: string
  balance: string
}

interface Props {
  isOpen?: boolean
  user: IUser
}

export default function BuyCrypto(props: Props) {
  
  return (
    <div className={styles.root}>
      <BuyCryptoForm user={props.user}/>
    </div>
  )
}
