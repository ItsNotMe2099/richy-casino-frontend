import {CONTACTS} from 'types/constants'
import styles from './index.module.scss'
import Button from 'components/ui/Button'
import Link from 'next/link'
import Facebook from 'components/svg/Facebook'
import classNames from 'classnames'
import Youtube from 'components/svg/Youtube'
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
    {image: '/img/layout/footer/sliders/top/astropayrichy.png'},
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
    <Button className={classNames(styles.socialButton, styles.instagram)} href={CONTACTS.instagram} size='extraSmall' background='dark500'>
      <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.4491 0H13.3409C16.3473 0 18.79 2.4427 18.79 5.4491V13.3409C18.79 14.7861 18.2159 16.1721 17.194 17.194C16.1721 18.2159 14.7861 18.79 13.3409 18.79H5.4491C2.4427 18.79 0 16.3473 0 13.3409V5.4491C0 4.00391 0.5741 2.61791 1.596 1.596C2.61791 0.5741 4.00391 0 5.4491 0M5.2612 1.879C4.36418 1.879 3.50391 2.23534 2.86962 2.86962C2.23534 3.50391 1.879 4.36418 1.879 5.2612V13.5288C1.879 15.3984 3.3916 16.911 5.2612 16.911H13.5288C14.4258 16.911 15.2861 16.5547 15.9204 15.9204C16.5547 15.2861 16.911 14.4258 16.911 13.5288V5.2612C16.911 3.3916 15.3984 1.879 13.5288 1.879H5.2612ZM14.3274 3.28825C14.6388 3.28825 14.9375 3.41198 15.1578 3.63222C15.378 3.85245 15.5018 4.15116 15.5018 4.46263C15.5018 4.77409 15.378 5.0728 15.1578 5.29303C14.9375 5.51327 14.6388 5.637 14.3274 5.637C14.0159 5.637 13.7172 5.51327 13.497 5.29303C13.2767 5.0728 13.153 4.77409 13.153 4.46263C13.153 4.15116 13.2767 3.85245 13.497 3.63222C13.7172 3.41198 14.0159 3.28825 14.3274 3.28825ZM9.395 4.6975C10.6409 4.6975 11.8357 5.19241 12.7166 6.07337C13.5976 6.95432 14.0925 8.14915 14.0925 9.395C14.0925 10.6409 13.5976 11.8357 12.7166 12.7166C11.8357 13.5976 10.6409 14.0925 9.395 14.0925C8.14915 14.0925 6.95432 13.5976 6.07337 12.7166C5.19241 11.8357 4.6975 10.6409 4.6975 9.395C4.6975 8.14915 5.19241 6.95432 6.07337 6.07337C6.95432 5.19241 8.14915 4.6975 9.395 4.6975M9.395 6.5765C8.64749 6.5765 7.93059 6.87345 7.40202 7.40202C6.87345 7.93059 6.5765 8.64749 6.5765 9.395C6.5765 10.1425 6.87345 10.8594 7.40202 11.388C7.93059 11.9166 8.64749 12.2135 9.395 12.2135C10.1425 12.2135 10.8594 11.9166 11.388 11.388C11.9166 10.8594 12.2135 10.1425 12.2135 9.395C12.2135 8.64749 11.9166 7.93059 11.388 7.40202C10.8594 6.87345 10.1425 6.5765 9.395 6.5765Z"/>
      </svg>
    </Button>
    <Button className={classNames(styles.socialButton, styles.telegram)} href={CONTACTS.telegram} size='extraSmall' background='dark500'>
      <svg width="17" height="15" viewBox="0 0 17 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M15.3582 0.942605L1.32193 6.35523C0.364011 6.73998 0.369553 7.27435 1.14618 7.51265L4.74984 8.63681L13.0877 3.37619C13.4819 3.13631 13.8421 3.26535 13.5461 3.52819L6.79076 9.62481H6.78918L6.79076 9.6256L6.54218 13.3401C6.90634 13.3401 7.06705 13.1731 7.2713 12.9759L9.02168 11.2739L12.6626 13.9631C13.3339 14.3329 13.816 14.1429 13.9831 13.3417L16.3731 2.07785C16.6177 1.09698 15.9986 0.652855 15.3582 0.942605Z" />
      </svg>

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
             className={classNames(styles.logoLicense, styles.curacao)} rel="noreferrer">
            <Image src='/img/licenses/richycuracaointeractivelicenlogo.png' alt='Richy License' width={120} height={120}
                   layout={'responsive'} objectFit='contain'/>
          </a>
          <a href={'https://www.responsiblegambling.org'} target={'_blank'}
             className={classNames(styles.logoLicense, styles.rgcrichy)} rel="noreferrer">
            <img src='/img/licenses/rgcrichy.svg' alt='responsiblegambling'/>
          </a>
          <a href={'https://www.begambleaware.org'} target={'_blank'}
             className={classNames(styles.logoLicense, styles.begambleawarerichy)} rel="noreferrer">
            <img src='/img/licenses/begambleawarerichy.svg' alt='begambleaware'/>
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

