import styles from './index.module.scss'
import GField from 'components/for_pages/games/components/inputs/GField'

interface Props{
}
export default function GFieldProfit({...rest}:Props) {
 return   <GField  name={'profit'} label={'Сумма выигрыша'} type={'number'} disabled  prefix={'DG'} inputClassName={styles.input} {...rest}/>
}

