import styles from './index.module.scss'
import Header from '../Header'
import { TabSelect } from 'components/ui/TabSelect'
import { useState } from 'react'
import classNames from 'classnames'
import Slider from 'react-slick'

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

  const settings = {
    className: `${styles.slider}`,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: items.length < 9 ? items.length : 9,
    slidesToScroll: 1,
    rows: 2,
    variableWidth: false,
    adaptiveHeight: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 570,
        settings: {
          slidesToShow: items.length < 4 ? items.length : 4,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: items.length < 3 ? items.length : 3,
        },
      }
    ]
  }

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
            <div className={styles.item} key={index}>
              <img src={item.image} alt=''/>
            </div>
          )}
        </div>
        <div className={styles.mobile}>
          <Slider {...settings}>
          {items.map((item, index) =>
            <div className={styles.item} key={index}>
              <img src={item.image} alt=''/>
            </div>
          )}
          </Slider>
        </div>
      </div>
  )
}
