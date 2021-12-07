import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from 'pages/index.module.scss'
import { Container } from 'react-grid-system'
import Header from 'components/layout/Header'

export default function IndexPage() {
  return (
    <div className={styles.root}>
      <Container>
        <Header/>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: {
    ...await serverSideTranslations(context.locale ?? 'en', ['common']),
  },
})
