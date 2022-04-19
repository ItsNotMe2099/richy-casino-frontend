import { useEffect, useState } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import ProfileModal from 'components/ui/ProfileModal'
import { useAppContext } from 'context/state'
import { ProfileModalType } from 'types/enums'
import WalletCryptoEth from 'components/svg/WalletCryptoEth'
import WalletCryptoBtc from 'components/svg/WalletCryptoBtc'
import WalletCryptoTeth from 'components/svg/WalletCryptoTeth'
import WalletCrypto13 from 'components/svg/WalletCrypto13'
import WalletVisa from 'components/svg/WalletVisa'
import WithdrawForm from './Form'
import {useTranslation} from 'next-i18next'

interface Props {
  isOpen?: boolean
}

interface MethodProps {
  icon: string
  iconLabel?: string
  label: string
  bonus?: boolean
  iso?: string
  onClick?: () => void
  blue?: boolean
  currency?: boolean
  mobile?: boolean
}

interface OptionsProps {
  method?: string
  array: MethodProps[]
}

interface QrCodeProps {
  iso: string
  walletNumber: string
}

interface CryptoIconsProps {
  mainColor: string
  iconColor: string
  lastMainColor: string
  lastIconMainColor: string
  style?: 'three' | 'two'
}

export default function Withdraw(props: Props) {
  const {t} = useTranslation()
  const CryptoIcons = ({mainColor, iconColor, lastIconMainColor, lastMainColor, style}: CryptoIconsProps) => {

    const classes = {
      [styles.three]: style === 'three',
      [styles.two]: style === 'two',
    }
    return (
      <div className={classNames(styles.iconsGroup, classes)}>
        <WalletCryptoEth mainColor={mainColor} iconColor={iconColor}/>
        <WalletCryptoBtc mainColor={mainColor} iconColor={iconColor}/>
        <WalletCryptoTeth mainColor={mainColor} iconColor={iconColor}/>
        <WalletCrypto13 mainColor={lastMainColor} iconColor={lastIconMainColor}/>
      </div>
    )
  }

  const methods = [
    {iconLabel: 'crypto', label: t('withdraw_type_crypto'), bonus: true},
    {iconLabel: 'visa', label: t('wwithdraw_type_card')},
    {icon: '/img/Wallet/paypal.svg', label: 'PayPal'},
    {icon: '/img/Wallet/yoo.svg', label: 'YooMoney'},
    {icon: '/img/Wallet/web.svg', label: 'WebMoney'},
    {icon: '/img/Wallet/skrill.svg', label: 'Skrill'},
    {icon: '/img/Wallet/pia.svg', label: 'Piastrix'},
    {icon: '/img/Wallet/neteller.svg', label: 'Neteller'},
    {icon: '/img/Wallet/qiwi.svg', label: 'Qiwi'},
  ]

  const crypto = [
    {icon: '/img/Wallet/crypto/bitcoin.svg', label: 'Bitcoin', iso: 'btc'},
    {icon: '/img/Wallet/crypto/tether.svg', label: 'Tether', iso: 'th'},
    {icon: '/img/Wallet/crypto/eth.svg', label: 'Ethereum', iso: 'eth'},
    {icon: '/img/Wallet/crypto/tron.svg', label: 'Tron', iso: 'tr'},
    {icon: '/img/Wallet/crypto/usdc.svg', label: 'USD Coin', iso: 'USD'},
    {icon: '/img/Wallet/crypto/monero.svg', label: 'Monero', iso: 'mo'},
    {icon: '/img/Wallet/crypto/doge.svg', label: 'Doge', iso: 'dg'},
    {icon: '/img/Wallet/crypto/bitcoin-cash.svg', label: 'Bitcoin Cash', iso: 'btcc'},
    {icon: '/img/Wallet/crypto/litecoin.svg', label: 'Litecoin', iso: 'ltc'},
  ]

  const bank = [
    {icon: '/img/Wallet/bank/visa.svg', label: 'Visa'},
    {icon: '/img/Wallet/bank/master-card.svg', label: 'Master Card'},
    {icon: '/img/Wallet/bank/mir.svg', label: 'МИР'},
  ]

  const [method, setMethod] = useState('')
  const [currency, setCurrency] = useState('')
  const [iso, setIso] = useState('')

  const handleCurrencyAndIso = (item: MethodProps) => {
    setCurrency(item.label)
    if(item.iso){
      setIso(item.iso)
    }
  }

  const handleChange = () => {
    setStep(1)
    setMethod('')
  }

  // temporary for submit imitation from WalletForm
  const [isSubmit, setIsSubmit] = useState(false)

  const Method = ({icon, iconLabel, label, iso, bonus, onClick, blue, mobile}: MethodProps) => {
    const {t} = useTranslation()
    return (
      <div className={classNames(styles.method, {[styles.blue]: blue}, {[styles.iso]: (iso || mobile)})} onClick={onClick}>
        {bonus &&
          <div className={styles.bonus}>
            {t('withdraw_bonus')}
          </div>
        }
        <div className={classNames(styles.icon, {[styles.isoIcon]: iso})}>
          {iconLabel === 'crypto' && <CryptoIcons
          mainColor={blue ? '#628CFF' : '#373945'}
          iconColor={blue ? '#fff' : '#cacaca'}
          lastIconMainColor={blue ? '#A7D5FF': '#959595'}
          lastMainColor={blue ? '#628CFF' : '#373845'}
          />}
          {iconLabel === 'visa' &&
          <WalletVisa
           className={styles.visaHover}
           color1={blue ? '#fff' : '#FAA61A'}
           color2={blue ? '#fff' :'#FF5F00'}
           color3={blue ? '#fff' :'#EB001B'}
           color4={blue ? '#EDEDED' :'#F79E1B'}/>}
          {!iconLabel && <img src={icon} alt=''/>}
        </div>
        <div className={classNames(styles.label, {[styles.isoLabel]: iso})}>
          <VisibleXs><>{iso ? iso : !mobile && label}</></VisibleXs>
          <HiddenXs>
            <>{label}</>
          </HiddenXs>
        </div>
      </div>
    )
  }

  const Options = ({method, array}: OptionsProps) => {
    return (
    <div className={styles.options}>
            {step === 2 &&
            (array.length && !currency) &&
              <div className={classNames(styles.methods, {[styles.nextStep]: step > 1})}>
                {array && array.map((item, index) =>
                  <Method icon={item.icon} iconLabel={item.iconLabel} label={item.label} key={index} onClick={() => handleCurrencyAndIso(item)}/>
                )}
              </div>
          }
    </div>
    )
  }

  const MobileMethod = ({icon, label, iconLabel}: MethodProps) => {
    return (
      <div className={classNames(styles.mobileMethod, {[styles.withCurrency]: currency})}>
        <div className={styles.iconMobile}>
          {iconLabel === 'crypto' && <CryptoIcons
          mainColor={'#628CFF'}
          iconColor={'#fff'}
          lastIconMainColor={'#A7D5FF'}
          lastMainColor={'#628CFF'}
          style={currency ? 'two' : 'three'}
          />}
          {iconLabel === 'visa' && <WalletVisa className={styles.visa} color1={'#fff'} color2={'#fff'} color3={'#fff'} color4={'#EDEDED'}/>}
          {!iconLabel && <img src={icon} alt=''/>}
        </div>
        <div className={styles.middle}>
          <div className={styles.fill}>{t('withdraw_type_title')}</div>
          <div className={classNames(styles.label, styles.labelMobile)}>{label}</div>
        </div>
        {!currency && <div className={styles.change} onClick={handleChange}>{t('withdraw_type_change')}</div>}
      </div>
    )
  }

  const Choice = ({array}: OptionsProps) => {
    return(
    <div className={styles.choice}>
        {methods.map((item, index) =>
          method === item.label &&
          <>
          <HiddenXs>
            <Method blue icon={item.icon} label={item.label} key={index} bonus={item.bonus} iconLabel={item.iconLabel}/>
          </HiddenXs>
          <VisibleXs>
            <MobileMethod icon={item.icon} label={item.label} key={index} iconLabel={item.iconLabel}/>
          </VisibleXs>
          </>
        )}
        {array.map((item, index) =>
          currency === item.label && <Method blue icon={item.icon} label={item.label} key={index} iso={item.iso} mobile iconLabel={item.iconLabel}/>
        )}
      </div>
    )
  }

  const [step, setStep] = useState(1)

  const context = useAppContext()
  const handleClose = () => {
    setStep(1)
    setCurrency('')
    setMethod('')
    setIsSubmit(false)
    context.hideModal()
  }
  const commonSettings = {
    onRequestClose: handleClose,
  }

  useEffect(() => {
    if(method){
      setStep(2)
    }
    if(currency){
      setStep(3)
    }
  }, [currency, method])

  const user = {id: '6171361', balance: '$275.16', userName: 'Alex', name: 'Ерохин Иван Иванович', dateOfBirth: '15.12.1998',
  country: 185, currency: 121, phone: '8 (800) 800 88 88', email: 'pochta@mail.ru', password: 'qwerty123'
}

const handleBack = () => {
  if(step === 2){
    setStep(1)
    setMethod('')
  }
  if(step === 3){
    setStep(2)
    setCurrency('')
    if(isSubmit){
      setIsSubmit(false)
    }
  }
}

  return (
    <ProfileModal size='small'
          key={18}
          isOpen={context.modal === ProfileModalType.withdraw} {...commonSettings} title={t('withdraw_title')} user={user} wallet noBorder
          isBack={step > 1 ? true : false}
          step={step}
          setStep={() => step === 2  ? handleBack() : step === 3 ? handleBack() : null}
          style='withdraw'
          faFooter
          >
    <div className={styles.root}>
      {!method &&
      <>
      <WithdrawForm onSubmit={() => null} step={1}/>
      <div className={styles.choose}>
        {t('withdraw_type_choose')}
      </div>
      </>
      }
      {method &&
        <Choice array={method === t('withdraw_type_crypto') ? crypto : bank}/>
      }
      {!method && !isSubmit &&
      <div className={styles.methods}>
        {methods.map((item, index) =>
          <Method iconLabel={item.iconLabel} icon={item.icon} label={item.label} key={index} bonus={item.bonus} onClick={() => setMethod(item.label)}/>
        )}
      </div>}
      {method && !isSubmit &&
        <>
        <Options array={method === t('withdraw_type_crypto') ? crypto : method === t('withdraw_type_card') && bank} method={method}/>
        {currency &&
          <WithdrawForm onSubmit={() => null} step={3}/>
        }
        </>
      }
    </div>
    </ProfileModal>
  )
}
