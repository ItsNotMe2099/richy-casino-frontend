import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import {ReactElement, useState} from 'react'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {IGame} from 'data/interfaces/IGame'
import Formatter from 'utils/formatter'
import ContentLoader from 'components/ui/ContentLoader'
import {useTranslation} from 'next-i18next'
import GameCard from 'components/for_pages/Common/GameCard'
import ShowMoreButton from 'components/ui/ShowMoreButton'
interface Item extends IGame{
  link?: string
}
interface Props {
  items: Item[]
  title: string
  icon?: string
  iconClassName?: string
  loading: boolean
  totalItems: number
  switchFilter?: ReactElement
  onScrollNext?: () => void
  allLink?: string
  showAll?: boolean
  onSelect?: () => void
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
      <Header icon={props.icon} iconClassName={props.iconClassName} allLink={props.allLink} label={props.title} length={`${Formatter.formatNumber(props.totalItems)}`} shadowColor={getShadow(props.icon)}/>
      {props.switchFilter && <div className={styles.wrapper}>{props.switchFilter}</div>}
      {props.loading && props.totalItems === 0 && <ContentLoader style={'block'} isOpen={true}/>}
        <HiddenXs>
              <div className={styles.list}>
                {props.items && (isShow ? props.items : props.items.slice(0, 10)).map((item, index) =>
                  <GameCard item={item} key={item.id} link={item.link} onClickDemo={props.onSelect} onClickPlay={props.onSelect}/>
                )}
              </div>
        </HiddenXs>
        <VisibleXs>
          <div className={styles.list}>
            {props.items && (isShow ? props.items : props.items.slice(0, 12)).map((item, index) =>
              <GameCard  item={item} key={item.id} link={item.link} onClickDemo={props.onSelect} onClickPlay={props.onSelect}/>
            )}
          </div>
        </VisibleXs>

      {props.items.length < props.totalItems && !(props.loading && props.items.length === 0) && <ShowMoreButton loading={props.loading} onShow={handleShowTrigger}/>}
    </div>
  )
}
