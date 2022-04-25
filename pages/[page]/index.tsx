import Layout from 'components/layout/Layout'
import styles from './index.module.scss'
import classNames from 'classnames'
import {ITextPage} from 'data/interfaces/ITextPage'
import {GetServerSideProps} from 'next'
import PagesRepository from 'data/repositories/PagesRepository'
import {getServerSideTranslation} from 'utils/i18'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import DropdownMenu from 'components/ui/DropdownMenu'
import SupportButton from 'components/for_pages/Common/SupportButton'
import {Col, Row} from 'react-grid-system'
import {IPagination} from 'types/interfaces'
import {useRouter} from 'next/router'

interface Props {
  pages: IPagination<ITextPage>
  page: ITextPage
}

export default function PageItemPage(props: Props) {
  const router = useRouter()
  const options = props.pages.data?.map(i => ({label: i.title, text: i.content, url: `/${i.internal_name}`})) ?? []

  const Contents = () => {
    return (
      <div className={styles.root}>
        <HiddenXs>
          <div className={styles.filter}>
            {options.map((item, index) =>
              <div key={index} className={classNames(styles.item, {[styles.active]: item.url === `/${props.page.internal_name}`})} onClick={() => router.push(item.url)}>
                {item.label}
              </div>
            )}
          </div>
        </HiddenXs>
        <VisibleXs>
          <DropdownMenu className={styles.drop} options={options} onChange={(item) => router.push((item as any).url)} activeTab={options.find(i => i.url === `/${props.page.internal_name}`)?.label}/>
        </VisibleXs>
      </div>
    )
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.title}>
            F.A.Q.
          </div>
          <SupportButton className={styles.support}/>
        </div>
        <Row className={styles.row}>
          <Col className={styles.contents}>
            <Contents/>
          </Col>
          <Col>
            <div className={styles.content}>
              <div className={styles.label}>
                {props.page.title}
              </div>
              <div className={styles.text}>{props.page.content}</div>
            </div>
          </Col>
        </Row>
      </div>
    </Layout>
  )
}


export const getServerSideProps: GetServerSideProps = async (context ) => {
 if(context.query.page === 'index'){
   return {
     notFound: true
   }
 }
  const page = await PagesRepository.fetchBySlug(context.query.page as string, context.locale ?? 'en')
  const pages = await PagesRepository.fetchList(1, 30)
    console.log('page', page, context.query.page)
  return {
    props: {
      ...await getServerSideTranslation(context),
      page,
      pages,
    },
    notFound: !page
  }
}
