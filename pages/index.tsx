import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from 'pages/index.module.scss'

export default function IndexPage() {
  return (
    <div className={styles.root}>
      HomePage
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: {
    ...await serverSideTranslations(context.locale ?? 'en', ['common']),
  },
})
