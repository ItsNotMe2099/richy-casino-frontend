import { CONTACTS } from 'types/interfaces'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Link from 'next/link'
import Facebook from 'components/svg/Facebook'
import classNames from 'classnames'
import Youtube from 'components/svg/Youtube'
import LinkedIn from 'components/svg/LinkedIn'
import Twitter from 'components/svg/Twitter'
import Logo from 'components/svg/Logo'
import LangSelect from 'components/for_pages/Common/LangSelect'
import { useState } from 'react'
import { useRouter } from 'next/router'


interface Props {
  children?: React.ReactNode
  className?: string
}

export default function Footer(props: Props) {

  const options = [
    { label: 'Правила', link: '#' },
    { label: 'Призы и бонусы', link: '#' },
    { label: 'О нас', link: '#' },
    { label: 'Партнерская программа', link: '#' },
  ]

  const items = [
    { label: 'Осознание азартных игр', link: '#' },
    { label: 'Пользовательское соглашение', link: '#' },
    { label: 'Политика конфиденциальности', link: '#' },
  ]

  const allItems = options.concat(items)

  const slidesTop = [
    {image: '/img/layout/footer/sliders/top/discover.svg'},
    {image: '/img/layout/footer/sliders/top/jcb.svg'},
    {image: '/img/layout/footer/sliders/top/piastrix.svg'},
    {image: '/img/layout/footer/sliders/top/webmoney.svg'},
    {image: '/img/layout/footer/sliders/top/paytm.svg'},
    {image: '/img/layout/footer/sliders/top/skrill.svg'},
    {image: '/img/layout/footer/sliders/top/usdt.svg'},
    {image: '/img/layout/footer/sliders/top/ethereum.svg'},
    {image: '/img/layout/footer/sliders/top/qiwi.svg'},
    {image: '/img/layout/footer/sliders/top/gpay.svg'},
    {image: '/img/layout/footer/sliders/top/master-card.svg'},
    {image: '/img/layout/footer/sliders/top/visa.svg'},
    {image: '/img/layout/footer/sliders/top/apay.svg'},
    {image: '/img/layout/footer/sliders/top/bitcoin.svg'},
  ]

  const slidesBottom = [
    {image: '/img/layout/footer/sliders/bottom/netent.svg'},
    {image: '/img/layout/footer/sliders/bottom/elk.svg'},
    {image: '/img/layout/footer/sliders/bottom/gamomat.svg'},
    {image: '/img/layout/footer/sliders/bottom/merkur.svg'},
    {image: '/img/layout/footer/sliders/bottom/truelab.svg'},
    {image: '/img/layout/footer/sliders/bottom/hacksaw.svg'},
    {image: '/img/layout/footer/sliders/bottom/relax.svg'},
    {image: '/img/layout/footer/sliders/bottom/jftw.svg'},
    {image: '/img/layout/footer/sliders/bottom/microgaming.svg'},
  ]



  const [showAllItems, setShowAllItems] = useState(false)

  const { route: currentRoute, asPath: currentPath } = useRouter()

  return (
    <div className={styles.root}>
        <div className={styles.wrapper}>
        {currentRoute === '/' || currentPath === '/' ?
          <div className={styles.logo}><Logo/></div>
            :
          <Link href='/'>
            <a className={styles.logo}><Logo/></a>
          </Link>
        }
        <div className={styles.top}>
          <div className={styles.mobile}>
            {(showAllItems ? allItems : allItems.slice(0, 3)).map((item, index) => 
              <Link href={item.link} key={index}>
              <a className={styles.item}>
                {item.label}
              </a>
            </Link>
            )}
            {showAllItems && 
            <>
              <div className={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </div>
            <div className={styles.mail}>
              <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
            </div>
            </>
            }
          </div>
          <div className={classNames(styles.show, {[styles.notShow]: !showAllItems})}>
            <Button onClick={() => showAllItems ? setShowAllItems(false) : setShowAllItems(true)} size='extraSmall' background='dark700'><img src='/img/layout/footer/up.svg' alt=''/></Button>
          </div>
          <div className={styles.left}>
            <div className={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
            <div className={styles.mail}>
              <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
            </div>
            <div className={styles.btns}>
              <div className={styles.support}>
                <Button size='normal' background='dark700'><img src='/img/layout/footer/support.svg' alt=''/>Тех. поддержка</Button>
              </div>
              <div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/apple.svg' alt=''/></Button></div>
              <Button size='extraSmall' background='dark700'><img src='/img/layout/top/android.svg' alt=''/></Button>
            </div>
            </div>
            <div className={styles.list}>
            {options.map((option, index) =>
              <Link href={option.link} key={index}>
                <a className={styles.item}>
                  {option.label}
                </a>
              </Link>
            )}
            </div>
            <div className={styles.list}>
            {items.map((option, index) =>
              <Link href={option.link} key={index}>
                <a className={styles.item} >
                  {option.label}
                </a>
              </Link>
            )}
            </div>
            <div className={styles.socials}>
              <div className={classNames(styles.btn, styles.facebook)}>
                <Button href={CONTACTS.facebook} size='extraSmall' background='dark500'>
                  <Facebook/>
                </Button>
              </div>
              <div className={classNames(styles.btn, styles.youtube)}>
                <Button href={CONTACTS.youtube} size='extraSmall' background='dark500'>
                  <Youtube/>
                </Button>
              </div>
              <div className={classNames(styles.btn, styles.twitter)}>
                <Button href={CONTACTS.twitter} size='extraSmall' background='dark500'>
                  <Twitter/>
                </Button>
              </div>
              <div className={classNames(styles.btn, styles.linkedIn)}>
                <Button href={CONTACTS.linkedIn} size='extraSmall' background='dark500'>
                  <LinkedIn/>
                </Button>
              </div>
            </div>
          </div>
            <div className={styles.supportMobile}>
              <div className={styles.support}>
                <Button size='normal' background='dark700'><img src='/img/layout/footer/support.svg' alt=''/>Тех. поддержка</Button>
              </div>
              <div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/apple.svg' alt=''/></Button></div>
              <Button size='extraSmall' background='dark700'><img src='/img/layout/top/android.svg' alt=''/></Button>
            </div>
        </div>
        <div className={styles.sliders}>
            <div className={styles.sliderTop}>
              {slidesTop.map((slide, index) => 
                <div className={styles.slide} key={index}>
                  <img src={slide.image} alt=''/>
                </div>
              )}
            </div>
            <div className={styles.sliderBottom}>
              {slidesBottom.map((slide, index) => 
                <div className={styles.slide} key={index}>
                  <img src={slide.image} alt=''/>
                </div>
              )}
            </div>
          </div>
          <div className={styles.socialsMobile}>
              <div className={classNames(styles.btn, styles.facebook)}>
                <Button href={CONTACTS.facebook} size='extraSmall' background='dark500'>
                  <Facebook/>
                </Button>
              </div>
              <div className={classNames(styles.btn, styles.youtube)}>
                <Button href={CONTACTS.youtube} size='extraSmall' background='dark500'>
                  <Youtube/>
                </Button>
              </div>
              <div className={classNames(styles.btn, styles.twitter)}>
                <Button href={CONTACTS.twitter} size='extraSmall' background='dark500'>
                  <Twitter/>
                </Button>
              </div>
              <div className={classNames(styles.btn, styles.linkedIn)}>
                <Button href={CONTACTS.linkedIn} size='extraSmall' background='dark500'>
                  <LinkedIn/>
                </Button>
              </div>
          </div>
          <div className={styles.btnsMobile}>
                  <div className={styles.btn}><Button href="#top" size='extraSmall' background='dark700'><img src='/img/layout/footer/up.svg' alt=''/></Button></div>
                  {/*<div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/phone.svg' alt=''/></Button></div>*/}
                  <div className={styles.lang}><LangSelect other/></div>
                </div>
          <div className={styles.bottom}>
              <div className={styles.eighteen}>
                <img src='/img/layout/footer/eighteen.svg' alt=''/>
              </div>
              <div className={styles.desc}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </div>
                <div className={styles.copyright}>
                  ©2021 CRYPLL ALL RIGHTS RESERVED
                </div>
                <div className={styles.btns}>
                  <div className={styles.btn}><Button href="#top" size='extraSmall' background='dark700'><img src='/img/layout/footer/up.svg' alt=''/></Button></div>
                  {/*<div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/phone.svg' alt=''/></Button></div>*/}
                  <div className={styles.lang}><LangSelect other/></div>
                </div>
          </div>
    </div>
  )
}

