import Layout from 'components/layout/Layout'
import AddNewAccountSelect from 'components/SelectPageForms/AddNewAccountSelect'
import ExchangeSelect from 'components/SelectPageForms/ExchangeSelect'
import RegistrationSelect from 'components/SelectPageForms/RegistrationSelect'
import SettingsSelect from 'components/SelectPageForms/SettingsSelect'
import StandartSelect from 'components/SelectPageForms/StandartSelect'
import WithdrawSelect from 'components/SelectPageForms/WithdrawSelect'
import {GetServerSideProps} from 'next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import styles from 'pages/selectPage/index.module.scss'

export default function SelectPage() {


  return (
    <Layout>
      <div className={styles.root}>
        <StandartSelect/>
        <RegistrationSelect/>
        <SettingsSelect/>
        <ExchangeSelect/>
        <WithdrawSelect/>
        <AddNewAccountSelect/>
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
