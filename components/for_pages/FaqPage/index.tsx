import Layout from 'components/layout/Layout'
import styles from './index.module.scss'
import classNames from 'classnames'
import {ITextPage} from 'data/interfaces/ITextPage'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import DropdownMenu from 'components/ui/DropdownMenu'
import SupportButton from 'components/for_pages/Common/SupportButton'
import {IPagination} from 'types/interfaces'
import {useRouter} from 'next/router'
import HtmlText from 'components/ui/HtmlText'
import Link from 'next/link'
interface Props {
  pages: IPagination<ITextPage>
  page: ITextPage
}

export default function FaqPage(props: Props) {
  const router = useRouter()
  const options = props.pages.data?.map(i => ({label: i.title, text: i.content, url: `/${i.internalName}`})) ?? []

  const Menu = () => {
    return (
      <div className={styles.menu}>
        <HiddenXs>
          <div className={styles.filter}>
            {options.map((item, index) => <Link  key={index} href={item.url}>
              <a className={classNames(styles.item, {[styles.active]: item.url === `/${props.page.internalName}`})} onClick={() => router.push(item.url)}>
                {item.label}
              </a>
              </Link>
            )}
          </div>
        </HiddenXs>
        <VisibleXs>
          <DropdownMenu className={styles.drop} options={options} onChange={(item) => router.push((item as any).url)} activeTab={options.find(i => i.url === `/${props.page.internalName}`)?.label}/>
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
        <div  className={styles.row}>
          <Menu/>
            <div className={styles.content}>
              <div className={styles.label}>
                {props.page.title}
              </div>
              <HtmlText className={classNames({
                [styles.text]: true,
              })}>
                {props.page.content}
              </HtmlText>
          </div>
        </div>
      </div>
    </Layout>
  )
}

