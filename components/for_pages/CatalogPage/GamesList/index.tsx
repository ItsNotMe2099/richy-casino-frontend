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
}

export default function GamesList(props: Props) {


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

  const [toShow, setToShow] = useState(10)


  const handleShowTrigger = () => {
    setToShow(toShow => props.items.length > 10 ? toShow + 20 : toShow + 5)
    props.onScrollNext && props.onScrollNext()
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
                {props.items && props.items.slice(0, toShow).map((item, index) =>
                  <ItemGame item={item} key={item.id} link={item.link}/>
                )}
              </div>
        </HiddenXs>
        <VisibleXs>
          <div className={styles.list}>
            {props.items && props.items.slice(0, toShow).map((item, index) =>
              <ItemGame item={item} key={item.id} link={item.link}/>
            )}
          </div>
        </VisibleXs>

      {(props.totalItems > 20 && props.items.length < props.totalItems && !(props.loading && props.items.length === 0) || props.title === 'Richy Games' && props.items.length > 10 && toShow < props.items.length) && <div className={styles.more} onClick={props.loading ? null : handleShowTrigger}>
        <div className={styles.icon}>
          {props.loading ?   <Spinner size={22} color="#fff" secondaryColor="rgba(255,255,255,0.4)"/>
            : <img src='/img/CatalogPage/more.svg' alt=''/>}
        </div>
        <div className={styles.text}>
          Больше игр
        </div>
      </div>}
    </div>
  )
}
