import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from 'pages/index.module.scss'
import { Container } from 'react-grid-system'
import Layout from 'components/layout/Layout'

export default function IndexPage() {
  return (
    <div className={styles.root}>
      <Container style={{height: '100%', minHeight: '100%'}}>
        <Layout>
          
        </Layout>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: {
    ...await serverSideTranslations(context.locale ?? 'en', ['common']),
  },
})
