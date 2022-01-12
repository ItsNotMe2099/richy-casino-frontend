import styles from './index.module.scss'
import Header from 'components/for_pages/Common/Header'
import SwitchFilter from 'components/for_pages/Common/SwitchFilter'
import Slider from 'react-slick'

interface IGame{
  label: string
  image: string
  top: boolean
  createdAt: string
  lastWin: string
  category: string
  provider: string
}

interface Props {
  items?: IGame[]
}

export default function GamesListTop(props: Props) {

  const Item = (prop:{item: IGame}) => {

    return(
    <div className={styles.item}>
      <img src={prop.item.image} alt=''/>
      <div className={styles.label}>
        {prop.item.label}
      </div>
      <div className={styles.user}>
        Username
      </div>
      <div className={styles.win}>
        <span>Win:</span> 8410 Р
      </div>
    </div>
    )
  }

  const settings = {
    className: `${styles.list}`,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    variableWidth: false,
    adaptiveHeight: false,
    arrows: false,
    dotsClass: `${styles.dots}`,

    responsive: [
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
        }
      },
    ]
  }

  return (
      <div className={styles.root}>
        <div className={styles.header}>
          <Header icon='/img/Contents/money.svg' label='ТОП игры' games length={1} catalogTop/>
        </div>
        <div className={styles.wrapper}><SwitchFilter top/></div>
        <Slider {...settings}>
          {props.items && props.items.slice(0, 6).map((item, index) =>
            <Item item={item} key={index}/>
          )}
        </Slider>
      </div>
  )
}
