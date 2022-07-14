import flags from 'country-flag-icons/react/3x2'
import styles from './index.module.scss'
interface Props{
  country: string,
  countryName: string,
}
export default function FlagIcon ({
  country,
  countryName,

}: Props){
  if (flags && flags[country]) {
    return      <div className={styles.root}>{flags[country]({ title: '' })}</div>
  }
  return null

}