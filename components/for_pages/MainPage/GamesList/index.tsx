import styles from './index.module.scss'
import Header from '../Header'
import { TabSelect } from 'components/ui/TabSelect'
import { useState } from 'react'
import classNames from 'classnames'
import Button from 'components/ui/Button'

interface IItem {
  image: string
  label: string
  category: string
  provider: string
}

interface Props {
  icon: string
  label: string
  items: IItem[]
}

export default function GamesList(props: Props) {

  const Item = (prop:{item: IItem}) => {

    const [inFavorite, setInFavorite] = useState(false)

    return(
    <div className={styles.item}>
              <div className={styles.shade}></div>
              <Button 
              onClick={() => inFavorite ? setInFavorite(false) : setInFavorite(true)} 
              className={classNames(styles.favorite, {[styles.active]: inFavorite})} 
              size='superExtraSmall' 
              background='blackTransparent'>
                {inFavorite ? 
                <img src='/img/GamesList/star-fill.svg' alt=''/> 
                : 
                <img src='/img/GamesList/star-stroke.svg' alt=''/>}
              </Button>
              <div className={styles.btns}>
                <Button className={styles.btn} size='small' background='blueGradient500'>Играть</Button>
                <Button className={styles.btn} size='small' background='blackTransparent'>Демо</Button>
              </div>
              <img src={prop.item.image} alt=''/>
            </div>
    )
  }

  const categories = [
    {label: 'category1'},
    {label: 'category2'},
  ]

  const providers = [
    {label: 'provider1'},
    {label: 'provider2'},
    {label: 'provider3'},
  ]

  const [category, setCategory] = useState('')
  const [provider, setProvider] = useState('')

  const items = 
  props.items.filter(item => ((category === item.category && provider === '') || 
  (category === '' && provider === item.provider) ||
  (category === item.category && provider === item.provider) ||
  (provider === '' && category === '')
  ))

  return (
      <div className={classNames(styles.root, {[styles.none]: props.items.length === 0})}>
        <Header icon={props.icon} label={props.label} games length={props.items.length}/>
        <div className={styles.filters}>
          <TabSelect tabs={categories} label='Категория' allOption
           onAll={() => setCategory('')} onChange={(item) => setCategory(item.label)} activeTab={category} type='category'/>
          <TabSelect tabs={providers} label='Провайдеры' allOption
            onAll={() => setProvider('')}
           onChange={(item) => setProvider(item.label)} activeTab={provider} type='provider'/>
        </div>
        <div className={styles.list}>
          {items.slice(0, 9).map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </div>
        <div className={styles.mobile}>
          <div className={styles.row}>
          {items.slice(0, (props.items.length/2)).map((item, index) =>
            <Item item={item} key={index}/>
          )}
          </div>
          <div className={styles.row}>
          {items.slice(((props.items.length/2) + 1), props.items.length).map((item, index) =>
            <Item item={item} key={index}/>
          )}
          </div>
        </div>
      </div>
  )
}
