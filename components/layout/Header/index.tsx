import styles from './index.module.scss'
import { Row, Col } from 'react-grid-system'
import Button from 'components/ui/Button'
import LangSelect from 'components/LangSelect'
import Logo from 'components/svg/Logo'
import { useRouter } from 'next/router'
import Overflow from './components/Overflow'

interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Header(props: Props) {

  const { route: currentRoute, asPath: currentPath } = useRouter()

  const options = [
    { label: 'Главная', link: '/' },
    { label: 'Казино', link: '#' },
    { label: 'Richy Game', link: '#' },
    { label: 'Free Bitcoin', link: '#' },
    { label: 'Wheel of Fortuna', link: '#' },
    { label: 'Лотерея', link: '#' },
    { label: 'Live Casino', link: '#' },
    { label: 'Aviator', link: '#' },
    { label: 'Poker', link: '#' },
    { label: 'Some Option', link: '#' },
  ]

  return (
    <>
    <Row>
      <Col>
      <div className={styles.top}>
      <div className={styles.left}>
        <div className={styles.apps}>
          <div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/phone.svg' alt=''/></Button></div>
          <div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/android.svg' alt=''/></Button></div>
          <Button size='extraSmall' background='dark700'><img src='/img/layout/top/apple.svg' alt=''/></Button>
        </div>
        <div className={styles.bonuses}>
          <div className={styles.bonus}>
            <div className={styles.gift}>
              <img src='/img/layout/top/gift.svg' alt=''/>
            </div>
            <div className={styles.textGift}>Бонусы</div>
          </div>
          <div className={styles.bonus}>
            <div className={styles.free}>FREE</div>
            <div className={styles.bitcoin}>
              <img src='/img/layout/top/bitcoin.svg' alt=''/>
            </div>
            <div className={styles.textBitcoin}>Free Bitcoin</div>
          </div>
          <div className={styles.bonus}>
            <div className={styles.wheel}>
      
            </div>
            <div className={styles.textWheel}>Wheel of Fortune</div>
          </div>
        </div>
      </div>
      <div className={styles.logoMobile}><Logo/></div>
      <div className={styles.right}>
        <div className={styles.login}><Button size='small' background='dark700'>Войти</Button></div>
        <div className={styles.reg}><Button size='normal' background='payGradient500'><img src='/img/layout/top/person.svg' alt=''/>Регистрация</Button></div>
        <div className={styles.lang}><LangSelect/></div>
        <Button className={styles.chat} size='normal' background='dark700'><img src='/img/layout/top/chat.svg' alt=''/></Button>
      </div>
    </div>
      </Col>
    </Row>
    <Row>
      <Col>
        <div className={styles.menu}>
          <div className={styles.logo}><Logo/></div>
          <Overflow currentPath={currentPath} currentRoute={currentRoute} options={options}/>
        </div>
      </Col>
    </Row>
    </>
  )
}

