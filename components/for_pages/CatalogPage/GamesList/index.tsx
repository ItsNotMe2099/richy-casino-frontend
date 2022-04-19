import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import {ReactElement, useState} from 'react'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import ItemGame from 'components/for_pages/Common/ItemGame'
import {IGame} from 'data/interfaces/IGame'
import InfiniteScroll from 'react-infinite-scroll-component'
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

  const [isShow, setIsShow] = useState(false)


  return (
    <div className={styles.root}>
      <Header icon={props.icon} label={props.title} length={props.totalItems} shadowColor={getShadow(props.icon)}/>
      {props.switchFilter && <HiddenXs>
        <div className={styles.wrapper}>{props.switchFilter}</div>
      </HiddenXs>}

        <HiddenXs>
            <InfiniteScroll
              dataLength={props.items.length}
              next={props.onScrollNext}
              loader={<div></div>}
              hasMore={isShow && props.totalItems !== props.items.length}
              style={{overflow: 'inherit'}}
              className={styles.list}
            >
            {props.items && (isShow ? props.items : props.items.slice(0, 10)).map((item, index) =>
              <ItemGame style='catalog' item={item} key={item.id} link={item.link}/>
            )}
            </InfiniteScroll>
        </HiddenXs>
        <VisibleXs>
          <InfiniteScroll
            dataLength={props.items.length}
            next={props.onScrollNext}
            loader={<div></div>}
            hasMore={isShow && props.totalItems !== props.items.length}
            style={{overflow: 'inherit'}}
            className={styles.list}
          >
            {props.items && (isShow ? props.items : props.items.slice(0, 9)).map((item, index) =>
              <ItemGame  style='catalog' item={item} key={item.id} link={item.link}/>
            )}
          </InfiniteScroll>
        </VisibleXs>

      {props.totalItems > 10 && <div className={styles.more} onClick={() => isShow ? setIsShow(false) : setIsShow(true)}>
        <div className={styles.icon}>
          <img src='/img/CatalogPage/more.svg' alt=''/>
        </div>
        <div className={styles.text}>
          {isShow ? <>Меньше игр</> : <>Больше игр</>}
        </div>
      </div>}
    </div>
  )
}
