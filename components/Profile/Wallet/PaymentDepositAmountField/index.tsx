import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import classNames from 'classnames'
import { useField} from 'formik'
import {IField} from 'types/interfaces'
import AmountPrefixField from 'components/ui/Inputs/AmountPrefixField'
import {ICurrency} from 'data/interfaces/ICurrency'
import Converter from 'utils/converter'

interface Props {
  isOpen?: boolean
  hasOptions?: boolean
  currency: string
  currencyObject?: ICurrency
  optionCurrency?: string
}

interface Props extends IField{
}

export const PaymentDepositAmountField = (props: Props) => {
  const {t} = useTranslation()
  const [field, meta, helpers] = useField(props)
  const options = [
    {label: '10', value: 10},
    {label: '20', value: 20},
    {label: '50', value: 50},
    {label: '75', value: 75},
    {label: '150', value: 150},
    {label: '500', value: 500},
    {label: '1000', value: 1000},
  ].map(i => {
    if( props.currencyObject && props.currencyObject.iso !== 'USD'){
      const val = Converter.convertRateToMin(props.currencyObject.toUsd, i.value)
      return {value: val, label: `${val}`}
    }
    return {...i, label: `${props.optionCurrency ?? ''}${i.label}`}
  })
  return (
    <div className={styles.root}>
      <AmountPrefixField name={'amount'} {...props} className={styles.input} staticSuffix={<div className={styles.prefix}>{props.currency}</div>}/>
      {props.hasOptions && <div className={styles.options}>
        {options.map((item, index) =>
          <div className={classNames(styles.option, {[styles.active]: item.value === field.value})}
               key={index}
               onClick={() => helpers.setValue( item.value)}>
            {item.label}
          </div>
        )}
      </div>}
    </div>
  )
}
