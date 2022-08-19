import {CONTACTS} from 'types/constants'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Link from 'next/link'
import Facebook from 'components/svg/Facebook'
import classNames from 'classnames'
import Youtube from 'components/svg/Youtube'
import LinkedIn from 'components/svg/LinkedIn'
import Twitter from 'components/svg/Twitter'
import LangSelect from 'components/for_pages/Common/LangSelect'
import {useState} from 'react'
import {useRouter} from 'next/router'
import SupportButton from 'components/for_pages/Common/SupportButton'
import {useAppContext} from 'context/state'
import {format} from 'date-fns'
import {useTranslation} from 'next-i18next'
import {BonusDepositShowMode, ModalType} from 'types/enums'
import {usePwaContext} from 'context/pwa_state'
import {isDesktop} from 'react-device-detect'
import {isMobile} from 'mobile-device-detect'
import Image from 'next/image'
import VisibleXs from 'components/ui/VisibleXS'
import HiddenXs from 'components/ui/HiddenXS'
import ArrowSvg from 'components/svg/ArrowSvg'
import {colors} from 'scss/variables'
import ClampLines from 'react-clamp-lines'
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
  const [textExpanded, setTextExpanded] = useState(false)

  const text = t('footer_main_text')
  const options = [
    {label: t('footer_menu_terms_of_service'), link: '/terms_of_service'},
    {label: t('footer_menu_bonuses'), link: '/bonuses'},
    {label: t('footer_menu_info'), link: '/info'},
    {label: t('footer_menu_affiliate'), link: 'https://richy.partners', blank: true},
  ]

  const items = [
    {label: t('footer_menu_privacy_policy'), link: '/privacy_policy'},
    {label: t('footer_menu_user_agreements'), link: '/user_agreements'},
    {label: t('footer_menu_user_gambling_aware'), link: '/gambling_aware'},
    {label: t('footer_menu_user_kyc_and_aml'), link: '/kyc_and_aml'},
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

  const {route: currentRoute, asPath: currentPath} = useRouter()

  const handleAppClick = (apple: boolean = false) => {
    if (isDesktop) {
      appContext.showModal(ModalType.mobileApp)
    } else if (isMobile && apple) {
      appContext.showBottomSheet(ModalType.mobileApp)
    } else if (isMobile && !apple) {
      pwaContext.install()
    }
  }
  const socialButtons = (<div className={styles.socials}>
     <Button className={classNames(styles.socialButton, styles.facebook)} href={CONTACTS.facebook} size='extraSmall' background='dark500'>
        <Facebook/>
      </Button>
      <Button className={classNames(styles.socialButton, styles.youtube)} href={CONTACTS.youtube} size='extraSmall' background='dark500'>
        <Youtube/>
      </Button>
      <Button className={classNames(styles.socialButton, styles.twitter)} href={CONTACTS.twitter} size='extraSmall' background='dark500'>
        <Twitter/>
      </Button>
      <Button className={classNames(styles.socialButton, styles.linkedIn)} href={CONTACTS.linkedIn} size='extraSmall' background='dark500'>
        <LinkedIn/>
      </Button>
   </div>)

  const apps = (<div className={styles.apps}>
    <Button size='extraSmall' background={appContext.isMobile ? 'dark700' : 'dark500'} onClick={() => handleAppClick(true)}><img
      src='/img/layout/top/apple.svg' alt=''/></Button>
    <Button size='extraSmall' background={appContext.isMobile ? 'dark700' : 'dark500'} onClick={() => handleAppClick()}><img
      src='/img/layout/top/android.svg' alt=''/></Button>
  </div>)
  const mail =  (<div className={styles.mail}>
    <a href={`mailto:${CONTACTS.email}`}>{CONTACTS.email}</a>
  </div>)
  const footerTopText = (   <div className={styles.footerTopText}>
    {t('footer_text_1')}
  </div>)
  const logo = (currentRoute === '/' || currentPath === '/' ?
    <div className={styles.logo}><Image src={'/img/layout/logo.png'} height={36} width={97.55}/></div>
    :
    <Link href='/'>
      <a className={styles.logo}><Image src={'/img/layout/logo.png'} height={36} width={97.55}/></a>
    </Link>)
  const langSelect = ( <div className={styles.lang}><LangSelect styleType='footer'/></div>)
  return (
    <div className={styles.root} style={{
      paddingBottom: `${(appContext.isMobile ? 81 : 0) + (appContext.showBonus && appContext.bonusShowMode === BonusDepositShowMode.Spoiler ? 90 : 0)}px`
    }}>
      <div className={styles.wrapper}>
        {logo}
        <VisibleXs>
          <>

            <div className={styles.topMobile}>
              {footerTopText}
              <div className={styles.menuMobile}>
              {(showAllItems ? allItems : allItems.slice(0, 3)).map((item, index) =>
                <Link href={item.link} key={index} scroll>
                  <a className={styles.menuItem}>
                    {item.label}
                  </a>
                </Link>
              )}
              </div>
              <Button className={classNames(styles.menuMobileToggle, {[styles.expanded]: !showAllItems})}
                      onClick={() => showAllItems ? setShowAllItems(false) : setShowAllItems(true)} size='extraSmall'
                      background='dark700'><img src='/img/layout/footer/up.svg' alt=''/></Button>
              <SupportButton className={styles.support} background={appContext.isMobile ? 'dark700' : 'dark500'}/>
              {mail}
              {socialButtons}
              <div className={styles.mobileMenuBottom}>
                {apps}
                {langSelect}
              </div>
            </div>
          </>
        </VisibleXs>
        <HiddenXs>
        <div className={styles.top}>
          <div className={styles.left}>
            {footerTopText}
            {mail}
            <div className={styles.buttonsLeft}>
              <SupportButton className={styles.support} background={appContext.isMobile ? 'dark700' : 'dark500'}/>
              {langSelect}
            </div>
          </div>
          <div className={styles.list}>
            {options.map((option, index) =>
              <Link href={option.link} key={index}>
                <a className={styles.menuItem} target={option.blank ? '_blank' : null}>
                  {option.label}
                </a>
              </Link>
            )}
          </div>
          <div className={styles.list}>
            {items.map((option, index) =>
              <Link href={option.link} key={index}>
                <a className={styles.menuItem}>
                  {option.label}
                </a>
              </Link>
            )}
          </div>
          <div className={styles.socialsWrapper}>
            {socialButtons}
            {apps}
          </div>
        </div>
        </HiddenXs>
        <div className={styles.textWrapper}>
          <h1>{t('footer_main_text_title')}</h1>
          <div className={styles.text}>
            {textExpanded ? text :  <ClampLines
              id={'footer-text'}
              text={text}
              lines={appContext.isMobile ? 17 : 7}
              ellipsis="..."
              buttons={false}
              innerElement="div"
            />}
          </div>
          <div className={styles.buttonTextExpandWrapper}>
          <Button className={styles.buttonTextExpand} size='normal' background={appContext.isMobile ? 'dark600' : 'dark600'} onClick={() => setTextExpanded(i => !i)}>
            <ArrowSvg className={classNames(styles.arrow, {[styles.reversed]: textExpanded})} color={colors.dark100}/>
            {textExpanded ? t('footer_show_less') : t('footer_show_more')}</Button>
          </div>
        </div>

      </div>
      <div className={styles.sliders}>

        <div className={styles.sliderPayments}>
          {slidesTop.map((slide, index) => <Link href={slide.link ?? '#'} key={index}>
              <a className={styles.slide} target={slide.link ? '_blank' : null}>
                <img src={slide.image} alt=''/>
              </a>
            </Link>
          )}
        </div>
        <div className={styles.sliderProviders}>
          {slidesBottom.map((slide, index) =>
            <div className={styles.slide} key={index}>
              <img src={slide.image} alt=''/>
            </div>
          )}
        </div>
      </div>


      <div className={styles.bottom}>
        <div className={styles.bottomIcons}>
          <div className={styles.eighteen}>
            <img src='/img/layout/footer/eighteen.svg' alt=''/>
          </div>
          <a href={'https://gateway.pinata.cloud/ipfs/QmREPXquK2dmUBSNx3e9H32YTgNTXT5W17vZk4sJaQevvM'} target={'_blank'}
             className={styles.logoLicense} rel="noreferrer">
            <Image src='/img/licenses/richycuracaointeractivelicenlogo.png' alt='Richy License' width={120} height={120}
                   layout={'responsive'} objectFit='contain'/>
          </a>
        </div>
        <HiddenXs>
        <div className={styles.separator}></div>
        </HiddenXs>
        <div className={styles.bottomText}>
          © {format(new Date(), 'y')} {t('footer_text_2')}
        </div>

      </div>
      <div className={styles.copyrightWrapper}>
        <div className={styles.copyright}>
          © {format(new Date(), 'y')} {t('footer_copyright')}
        </div>
          <Button className={styles.buttonToTop} onClick={() => window.scrollTo(0, 0)} size='extraSmall' background={appContext.isMobile ? 'dark700' : 'dark500'}><img
            src='/img/layout/footer/up.svg' alt=''/></Button>
      </div>
    </div>
  )
}

