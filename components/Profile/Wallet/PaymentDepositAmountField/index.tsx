import styles from './index.module.scss'
import {useTranslation} from 'next-i18next'
import classNames from 'classnames'
import InputField from 'components/ui/Inputs/InputField'
import { useField} from 'formik'
import {IField} from 'types/interfaces'

interface Props {
  isOpen?: boolean
}

interface Props extends IField{

}

export const PaymentDepositAmountField = (props: Props) => {
  const {t} = useTranslation()
  const [field, meta, helpers] = useField(props)

  const options = [
    {value: '$10'},
    {value: '$20'},
    {value: '$50'},
    {value: '$75'},
    {value: '$150'},
    {value: '$500'},
    {value: '$1000'},
  ]
  return (
    <div className={styles.root}>
      <InputField name={'amount'} {...props} className={styles.input} placeholder='$0'/>
      <div className={styles.options}>
        {options.map((item, index) =>
          <div className={classNames(styles.option, {[styles.active]: item.value === field.value})}
               key={index}
               onClick={() => helpers.setValue( item.value)}>
            {item.value}
          </div>
        )}
      </div>
    </div>
  )
}
