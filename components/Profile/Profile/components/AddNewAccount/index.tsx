import styles from './index.module.scss'
import { IOption } from 'types/interfaces'
import Select from 'components/ui/Select'
import classNames from 'classnames'
import {useTranslation} from 'next-i18next'
import {useState} from 'react'
import Spinner from 'components/ui/Spinner'
import {SnackbarType} from 'types/enums'
import PaymentsRepository from 'data/repositories/PaymentsRepository'
import {useAppContext} from 'context/state'
import CurrencySvg from 'components/svg/CurrencySvg/CurrencySvg'

export interface ICustomSelectViewOption extends IOption<string>{

}


const Option = (props: {
  option?: ICustomSelectViewOption
  onClick?: () => void
}) => {
  return (
    <div className={styles.option} onClick={props.onClick}>
      <CurrencySvg currencyIso={props.option.value} color className={styles.symbol}/> {props.option.label}
    </div>
  )
}

interface PlaceHolderProps{
  isActive?: boolean
  isLoading?: boolean
}
const Placeholder = (props: PlaceHolderProps) => {
  const {t} = useTranslation()
  return (
    <div className={styles.placeholder}>
      {!props.isActive ?
        props.isLoading ? <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/> : <div className={styles.newAccount}>
          <div className={styles.subtract}>
            <img src='/img/DropdownMenu/subtract.svg' alt=''/>
          </div>
          <div className={styles.label}>
            {t('profile_account_new')}
          </div>
        </div>
        :
        <div className={classNames(styles.newAccount, {[styles.active]: props.isActive})}>
          <div className={styles.label}>
            {t('profile_account_new')}
          </div>
          <div className={classNames(styles.arrow, {[styles.active]: props.isActive})}><img
            src='/img/DropdownMenu/arrow.svg' alt=''/></div>
        </div>
      }
    </div>
  )
}
interface Props{
  options?: IOption<string>[],

}

export default function AddNewAccount(props: Props){
  const context = useAppContext()
  const [loading, setLoading] = useState(false)

  const handleChange = async (item: IOption<string>) => {
    setLoading(true)
    try {
      await PaymentsRepository.createBalance(item.value)
      await context.updateUserFromCookies()
    }catch (e) {
      context.showSnackbar(e, SnackbarType.error)
    }
    setLoading(false)
  }
  return (
    <div className={styles.root}>
      <Select
      placeholder={(isActive) => <Placeholder isLoading={loading} isActive={isActive}/>}
      options={props.options}
      onChange={handleChange}
      rootClassName={styles.select}
      className={styles.dropDown}
      itemComponent={(option, onClick) => <Option key={option.value} option={option} onClick={onClick}/>}
      />
    </div>
  )
}
