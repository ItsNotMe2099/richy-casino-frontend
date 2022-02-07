import styles from './index.module.scss'
import GField from 'components/for_pages/games/components/inputs/GField'

interface Props{
  balance?: string
}
export default function GFieldBet({balance, ...rest}:Props) {
 return   <GField  name={'bet'} label={'Сумма'} labelSuffix={balance} prefix={'DG'} suffix={'arrow'} inputClassName={styles.input} {...rest}/>
}

