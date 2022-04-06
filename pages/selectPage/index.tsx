import Layout from 'components/layout/Layout'
import ExchangeSelect from 'components/SelectPageForms/ExchangeSelect'
//import AddNewAccountSelect from 'components/SelectPageForms/AddNewAccountSelect'
import RegistrationSelect from 'components/SelectPageForms/RegistrationSelect'
import SettingsSelect from 'components/SelectPageForms/SettingsSelect'
import WithdrawSelect from 'components/SelectPageForms/WithdrawSelect'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import styles from 'pages/selectPage/index.module.scss'
import BuyCryptoForm from 'components/Profile/BuyCrypto/Form'

export default function SelectPage() {


  return (
    <Layout>
      <div className={styles.root}>
        <RegistrationSelect/>
        <SettingsSelect/>
        <ExchangeSelect/>
        <WithdrawSelect/>
        <BuyCryptoForm user={null} onSubmit={null}/>
      </div>
    </Layout>
  )
}
export const getServerSideProps: GetServerSideProps = async (context ) => {
  return {
    props: {
      ...await serverSideTranslations(context.locale ?? 'en', ['common']),
    },
  }
}
