import { GetStaticProps, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import styles from 'pages/index.module.scss'
import { Container } from 'react-grid-system'
import Panel from 'components/layout/Panel'

export default function IndexPage() {
  return (
    <div className={styles.root}>
      <Container>
        <Panel>
          HomePage
        </Panel>
      </Container>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => ({
  props: {
    ...await serverSideTranslations(context.locale ?? 'en', ['common']),
  },
})
