import {CONTACTS} from 'types/constants'
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
import {useState} from 'react'
import {useRouter} from 'next/router'
import SupportButton from 'components/for_pages/Common/SupportButton'
import {useAppContext} from 'context/state'
import {format} from 'date-fns'
import {useTranslation} from 'next-i18next'
import {BonusDepositShowMode} from 'types/enums'
import {usePwaContext} from 'context/pwa_state'

interface Props {
  children?: React.ReactNode
  className?: string
}

interface Lang {
  icon: string
  lang: string
}

export default function Footer(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  const pwaContext = usePwaContext()

  const options = [
    { label: t('footer_menu_terms_of_service'), link: '/terms_of_service' },
    { label: t('footer_menu_bonuses'), link: '/bonuses' },
    { label: t('footer_menu_info'), link: '/info' },
    { label: t('footer_menu_affiliate'), link: 'https://richy.partners', blank: true },
  ]

  const items = [
    { label: t('footer_menu_privacy_policy'), link: '/privacy_policy' },
    { label: t('footer_menu_user_agreements'), link: '/user_agreements' },
    { label: t('footer_menu_user_gambling_aware'), link: '/gambling_aware' },
    { label: t('footer_menu_user_kyc_and_aml'), link: '/kyc_and_aml' },
  ]

  const allItems = options.concat(items)

  const slidesTop = [
    {image: 'https://cdn.freekassa.ru/banners/small-dark-2.png', link: 'https://freekassa.ru'},
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

  const langs = [
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
    {icon: '/img/layout/top/russia.svg', lang: 'En'},
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
    {icon: '/img/layout/top/russia.svg', lang: 'Ru'},
  ]
  const [showAllItems, setShowAllItems] = useState(false)

  const { route: currentRoute, asPath: currentPath } = useRouter()

  return (
    <div className={styles.root} style={{
      paddingBottom: `${(appContext.auth  ? 81 : 0) + (appContext.showBonus && appContext.bonusShowMode === BonusDepositShowMode.Spoiler ? 20 : 0)}px`
    }}>
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
                {t('footer_text_1')}
              </div>
            <div className={styles.mail}>
              <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
            </div>
            </>
            }
          </div>
          <div className={classNames(styles.show, {[styles.notShow]: !showAllItems})}>
            <Button className={styles.menuMobileToggle} onClick={() => showAllItems ? setShowAllItems(false) : setShowAllItems(true)} size='extraSmall' background='dark700'><img src='/img/layout/footer/up.svg' alt=''/></Button>
          </div>
          <div className={styles.left}>
            <div className={styles.desc}>
              {t('footer_text_1')}
            </div>
            <div className={styles.mail}>
              <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
            </div>
            <div className={styles.btns}>
              <SupportButton className={styles.support}/>
              <div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/apple.svg' alt=''/></Button></div>
              <Button size='extraSmall' background='dark700'><img src='/img/layout/top/android.svg' alt=''/></Button>
            </div>
            </div>
            <div className={styles.list}>
            {options.map((option, index) =>
              <Link href={option.link} key={index}>
                <a className={styles.item} target={option.blank ? '_blank' : null}>
                  {option.label}
                </a>
              </Link>
            )}
            </div>
            <div className={styles.list}>
            {items.map((option, index) =>
              <Link href={option.link} key={index} >
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
              <div style={{flex: 1}}>
              <SupportButton className={styles.support}/>
              </div>
              <div className={styles.btn}><Button size='extraSmall' background='dark700' onClick={() => pwaContext.install()}><img src='/img/layout/top/apple.svg' alt=''/></Button></div>
              <Button size='extraSmall' background='dark700' onClick={() => pwaContext.install()}><img src='/img/layout/top/android.svg' alt=''/></Button>
            </div>
        </div>
        <div className={styles.sliders}>

            <div className={styles.sliderTop}>
              {slidesTop.map((slide, index) => <Link href={slide.link ?? '#'} key={index} >
                <a className={styles.slide} target={slide.link ? '_blank' : null}>
                  <img src={slide.image} alt=''/>
                </a>
                </Link>
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
                  <div className={styles.lang}><LangSelect style='footer' /></div>
                </div>
          <div className={styles.bottom}>
            <div className={styles.bottomIcons}>
            <div className={styles.eighteen}>
              <img src='/img/layout/footer/eighteen.svg' alt=''/>
            </div>
            <div className={styles.logoLicense}>
              <img src='/img/licenses/richycuracaointeractivelicenlogo.png' alt=''/>
            </div>
            </div>
              <div className={styles.desc}>
                © {format(new Date(),'y')} {t('footer_text_2')}
              </div>
                <div className={styles.copyright}>
                  © {format(new Date(),'y')} {t('footer_copyright')}
                </div>
                <div className={styles.btns}>
                  <div className={styles.btn}><Button href="#top" size='extraSmall' background='dark700'><img src='/img/layout/footer/up.svg' alt=''/></Button></div>
                  {/*<div className={styles.btn}><Button size='extraSmall' background='dark700'><img src='/img/layout/top/phone.svg' alt=''/></Button></div>*/}
                  <div className={styles.lang}><LangSelect style='footer'/></div>
                </div>
          </div>
    </div>
  )
}

