import Filter from 'components/for_pages/Common/Filter'
import Layout from 'components/layout/Layout'
import styles from './index.module.scss'
import {Row, Col} from 'react-grid-system'
import {ReactElement, useState} from 'react'
import GameListRepository from 'data/repositories/GameListRepository'
import classNames from 'classnames'
import { debounce } from 'debounce'
import GamesListSearch from 'components/for_pages/CatalogPage/GamesListSearch'
interface Props{
  children?: ReactElement | ReactElement[]
  top?: ReactElement | ReactElement[]
  showMobile?: boolean
}
export default function WithGameFilterLayout(props: Props) {
const [searchGames, setSearchGames] = useState({data: [], total: 0})
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(false)
  const [searchPage, setSearchPage] = useState<number>(0)
  const [searchValue, setSearchValue] = useState<string | null>(null)
  const searchLimit = 30
  const handleSearch =  debounce(async (value: string) => {
    if(!value?.length){
      setIsSearch(false)
     setSearchValue(null)
      return
    }
    setSearchValue(value)
    setIsSearch(true)
    setIsSearchLoading(true)
    const res = await GameListRepository.fetchGames({name: value}, 1, searchLimit)
    setSearchGames(res)
  }, 300)
  const handleScrollNext = async () => {
    const newPage = searchPage + 1
    setSearchPage(newPage)
    setIsSearchLoading(true)
    const res = await GameListRepository.fetchGames({name: searchValue}, newPage, searchLimit)
    setSearchGames(data => ({data: [...data.data, ...res.data], total: res.total}))
    setIsSearchLoading(false)
  }
  return (
    <Layout>
      {props.top}
      <Row className={styles.desktop}>
        <Filter showMobile={props.showMobile} onSearch={handleSearch}/>
        <Col className={styles.content}>
          <div className={classNames(styles.children, {[styles.hidden]: isSearch})}>{props.children}</div>
          <div className={classNames(styles.search, {[styles.hidden]: !isSearch})}>
            <GamesListSearch data={searchGames} loading={isSearchLoading} onScrollNext={handleScrollNext}/>
          </div>
        </Col>
      </Row>
    </Layout>
  )
}
