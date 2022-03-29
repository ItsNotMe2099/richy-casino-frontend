import AddNewAccount from 'components/Profile/Profile/components/AddNewAccount'
import styles from 'pages/selectPage/index.module.scss'

export default function AddNewAccountSelect() {

  const currencies = [
    {label: 'USD (USD)', value: 'USD', symbol: '$'},
    {label: 'BTC (BTC)', value: 'BTC', symbol: '$'},
  ]

  return (
      <div className={styles.select}>
        <div className={styles.text}>
          Add New Account
        </div>
        <AddNewAccount 
          options={currencies}
        />
      </div>
  )
}
