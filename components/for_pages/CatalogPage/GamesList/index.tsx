import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import {ReactElement, useState} from 'react'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import ItemGame from 'components/for_pages/Common/ItemGame'
import {IGame} from 'data/interfaces/IGame'
import Formatter from 'utils/formatter'
import Spinner from 'components/ui/Spinner'
import ContentLoader from 'components/ui/ContentLoader'
import {useTranslation} from 'next-i18next'
interface Item extends IGame{
  link?: string
}
interface Props {
  items: Item[]
  title: string
  icon?: string
  loading: boolean
  totalItems: number
  switchFilter?: ReactElement
  onScrollNext?: () => void
  allLink?: string
  showAll?: boolean
}

export default function GamesList(props: Props) {
  const {t} = useTranslation()
  const getShadow = (icon) => {
    switch (icon){
      case '/img/Contents/live.svg':
        return 'blue'
      case '/img/Contents/all-games.png':
        return 'red'
      case '/img/Contents/gamepad.svg':
        return 'blue'
    }
  }

  const [isShow, setIsShow] = useState(props.showAll)

  const handleShowTrigger = () => {
    setIsShow(true)
    props.onScrollNext()
  }

  return (
    <div className={styles.root}>
      <Header icon={props.icon} allLink={props.allLink} label={props.title} length={`${Formatter.formatNumber(props.totalItems)}`} shadowColor={getShadow(props.icon)}/>
      {props.switchFilter && <HiddenXs>
        <div className={styles.wrapper}>{props.switchFilter}</div>
      </HiddenXs>}
      {props.loading && props.totalItems === 0 && <ContentLoader style={'block'} isOpen={true}/>}
        <HiddenXs>
              <div className={styles.list}>
                {props.items && (isShow ? props.items : props.items.slice(0, 10)).map((item, index) =>
                  <ItemGame item={item} key={item.id} link={item.link}/>
                )}
              </div>
        </HiddenXs>
        <VisibleXs>
          <div className={styles.list}>
            {props.items && (isShow ? props.items : props.items.slice(0, 9)).map((item, index) =>
              <ItemGame  item={item} key={item.id} link={item.link}/>
            )}
          </div>
        </VisibleXs>

      {props.totalItems > 20 && props.items.length < props.totalItems && !(props.loading && props.items.length === 0) && <div className={styles.more} onClick={props.loading ? null : handleShowTrigger}>
        <div className={styles.icon}>
          {props.loading ?   <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/>
            : <img src='/img/CatalogPage/more.svg' alt=''/>}
        </div>
        <div className={styles.text}>
          {t('catalog_list_more')}
        </div>
      </div>}
    </div>
  )
}
