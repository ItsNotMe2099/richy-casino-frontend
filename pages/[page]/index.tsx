import Layout from 'components/layout/Layout'
import styles from './index.module.scss'
import HtmlText from 'components/ui/HtmlText'
import classNames from 'classnames'
import {ITextPage} from 'data/interfaces/ITextPage'
import {GetServerSideProps} from 'next'
import PagesRepository from 'data/repositories/PagesRepository'

interface Props {
  page: ITextPage
}

export default function PageItemPage(props: Props) {
  return (<Layout>
    <div className={styles.root}>
      <div className={styles.header}>
          {props.page.title}

      </div>
      <HtmlText className={classNames({
        [styles.content]: true,
      })}>
        {props.page.content}
      </HtmlText>
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
  const page = await PagesRepository.fetchBySlug(context.query.page as string)

  return {
    props: {
      page,
    } as Props,
    notFound: !page
  }
}
