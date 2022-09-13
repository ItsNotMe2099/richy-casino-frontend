import {createContext, useContext, useEffect, useRef, useState} from 'react'
import { BonusDepositShowMode, CookiesType, ModalType, ProfileModalType, SnackbarType } from 'types/enums'
import ReactModal from 'react-modal'
import UserRepository from 'data/repositories/UserRepository'
import Cookies from 'js-cookie'
import { ICurrency } from 'data/interfaces/ICurrency'
import InfoRepository from 'data/repositories/InfoRepository'
import IUser from 'data/interfaces/IUser'
import { IBonusBannerDetails, IModalProfileStackItem, SnackbarData } from 'types/interfaces'
import { CookiesLifeTime, Timers } from 'types/constants'
import PromoCodeRepository from 'data/repositories/PromoCodeRepository'
import UserUtils from 'utils/user'
import { IBanner } from 'data/interfaces/IBanner'
import BannerRepository from 'data/repositories/BannerRepository'
import { addHours } from 'date-fns'
import { runtimeConfig } from 'config/runtimeConfig'
import { IPaymentMethod } from 'data/interfaces/IPaymentMethod'
import { ICountry } from 'data/interfaces/ICountry'
import { useTranslation} from 'next-i18next'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  auth: boolean
  token: string
  initialLoaded: boolean
  modalArguments?: any
  countryByIp: ICountry,
  modal: ModalType | ProfileModalType | null
  lastProfileModal?: IModalProfileStackItem
  showModal: (type: ModalType | ProfileModalType, data?: any) => void
  showModalProfile: (type: ProfileModalType, data?: any, skipStack?: boolean) => void
  goBackModalProfile: () => void
  hideModal: () => void
  bottomSheet: ModalType | ProfileModalType | null
  showBottomSheet: (type: ModalType | ProfileModalType, data?: any) => void
  hideBottomSheet: () => void
  setToken: (token) => void
  logout: () => void
  updateUserFromCookies: () => void
  user: IUser,
  showBonus: boolean,
  bonusShowMode: BonusDepositShowMode | null
  setBonusShowMode: (show: BonusDepositShowMode) => void,
  bonusBannerDetails: IBonusBannerDetails | null
  fetchDefaultCurrency: () => Promise<ICurrency>,
  updateCurrencies: () => void
  updatePromoCodes: () => void
  currencies: ICurrency[]
  defaultCurrency: ICurrency | null
  paymentMethodsDeposit: IPaymentMethod[]
  paymentMethodsWithdraw: IPaymentMethod[]
  banners: IBanner[]
  snackbar: SnackbarData | null,
  showSnackbar: (text: string, type: SnackbarType) => void
  openSupport: () => void
}

const defaultValue: IState = {
  countryByIp: null,
  modalArguments: null,
  initialLoaded: false,
  isMobile: false,
  isDesktop: true,
  modal: null,
  bottomSheet: null,
  auth: false,
  user: null,
  lastProfileModal: null,
  token: null,
  banners: [],
  showModal: (type, data) => null,
  showModalProfile: (type, data, skipStack) => null,
  goBackModalProfile: () => null,
  hideModal: () => null,
  showBottomSheet: (type, data) => null,
  hideBottomSheet: () => null,
  setToken: (token) => null,
  logout: () => null,
  updateUserFromCookies: () => null,
  updateCurrencies: () => null,
  updatePromoCodes: () => null,
  fetchDefaultCurrency: async () => null,
  showBonus: false,
  bonusShowMode: null,
  setBonusShowMode: (show) => null,
  bonusBannerDetails: null,
  currencies: [],
  defaultCurrency: null,
  paymentMethodsDeposit: [],
  paymentMethodsWithdraw: [],
  snackbar: null,
  showSnackbar: (text, type) => null,
  openSupport: () => null,
}
const ModalsBottomSheet = [
  ProfileModalType.withdraw,
  ProfileModalType.wallet,
  ProfileModalType.exchange,
  ProfileModalType.buyCrypto,
  ModalType.login,
  ModalType.registration,
  ModalType.registrationPhone,
  ModalType.registrationSuccess,
  ModalType.passwordRecovery,
  ModalType.passwordReset,
  ModalType.faLogin,
  ModalType.fortune,
  ModalType.profileBurger,
  ModalType.bonus
]
const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
  initialUser?: IUser
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | ProfileModalType | null>(null)
  const [bottomSheet, setBottomSheet] = useState<ModalType | ProfileModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<ModalType | ProfileModalType | null>(null)
  const {t, i18n} = useTranslation()
  const langInitdRef = useRef(false)
  const [user, setUser] = useState<IUser | null>(props.initialUser)
  const [auth, setAuth] = useState<boolean>(!!props.initialUser)
  const [showBonus, setShowBonus] = useState<boolean>(false)
  const [bonusShowMode, setBonusShowMode] = useState<BonusDepositShowMode | null>(null)
  const [bonusBannerDetails, setBonusBannerDetails] = useState<IBonusBannerDetails>(null)
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const [defaultCurrency, setDefaultCurrency] = useState<ICurrency | null>(null)
  const [paymentMethodsDeposit, setPaymentMethodsDeposit] = useState<IPaymentMethod[]>([])
  const [paymentMethodsWithdraw, setPaymentMethodsWithdraw] = useState<IPaymentMethod[]>([])
  const [banners, setBanners] = useState<IBanner[]>([])
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [modalProfileStack, setModalProfileStack] = useState<IModalProfileStackItem[]>([])
  const [countryByIp, setCountryByIp] = useState<ICountry | null>(null)
  const [userLoaded, setUserLoaded] = useState<boolean>(false)
  const [infoLoaded, setInfoLoaded] = useState<boolean>(false)
  const value: IState = {
    ...defaultValue,
    isMobile: props.isMobile,
    isDesktop: !props.isMobile,
    auth,
    modal,
    bottomSheet,
    modalArguments,
    lastProfileModal: modalProfileStack.length > 0 ? modalProfileStack[modalProfileStack.length - 1] : null,
    currencies,
    user,
    snackbar,
    token: props.token,
    banners,
    defaultCurrency,
    paymentMethodsDeposit,
    paymentMethodsWithdraw,
    countryByIp,
    initialLoaded: userLoaded && infoLoaded,
    showModal: (type, props: any) => {

      console.log('ShowModal0', type)
      showModal(type, props)

      console.log('ShowModal', type)
    },
    showModalProfile: (type, args: any, skipStack?: boolean) => {
      showModal(type, args)

      if (modal && !(props.isMobile && ModalsBottomSheet.includes(type)) && Object.values(ProfileModalType).includes(modal as ProfileModalType) && !skipStack) {
        setModalProfileStack(stack => [...stack, {
          type: modal as ProfileModalType,
          args
        } as IModalProfileStackItem])
      }
    },
    goBackModalProfile: () => {
      if (modalProfileStack.length > 0) {
        const last = modalProfileStack[modalProfileStack.length - 1]
        setModalProfileStack([...modalProfileStack].slice(0, modalProfileStack.length - 1))
        showModal(last.type, last.args)
      } else {
        hideModal()
      }
    },
    hideModal: () => {
      console.log('HideModal', modal)
      hideModal()
    },
    showBottomSheet: (type, props: any) => {
      showBottomSheet(type, props)
    },
    hideBottomSheet: () => {
      hideBottomSheet()
    },
    setToken: (token: string) => {
      Cookies.set(CookiesType.accessToken, token, { expires: CookiesLifeTime.accessToken })
      setAuth(true)
    },
    logout: () => {
      Cookies.remove(CookiesType.accessToken)
      setAuth(false)
      setUser(null)
    },
    async updateUserFromCookies() {
      return updateUserDetails()
    },
    async updatePromoCodes() {
      return updatePromoCodes()
    },
    showBonus,
    bonusShowMode,
    bonusBannerDetails,
    setBonusShowMode(mode) {
      setBonusShowMode(mode)
      Cookies.set(CookiesType.bonusDepositShowMode, mode, { expires: CookiesLifeTime.bonusDepositShowMode })

    },

    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({ text, type })
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },
    fetchDefaultCurrency: async (): Promise<ICurrency> => {
      if (defaultCurrency) {
        return defaultCurrency
      }
      const res = await InfoRepository.getCurrencyByCountry()
      setDefaultCurrency(res)
      return res
    },
    updateCurrencies: () => {
      InfoRepository.getCurrencies().then(i => setCurrencies(i))
    },
    openSupport: () => {
      if((window as any).Tawk_API){
        (window as any).Tawk_API.maximize()
      }
    }

  }

  useEffect(() => {
    if (props.token) {
      setAuth(true)
    }

  }, [props.token])
  useEffect(() => {

    if (!Cookies.get(CookiesType.firstVisitAt)) {
      Cookies.set(CookiesType.firstVisitAt, (new Date()).toISOString(), { expires: CookiesLifeTime.firstVisitAt })
    }
    if (Cookies.get(CookiesType.bonusDepositShowMode)) {
      setBonusShowMode(Cookies.get(CookiesType.bonusDepositShowMode) as BonusDepositShowMode)
    }
  }, [])
  useEffect(() => {

    if(userLoaded || infoLoaded){
      document.getElementById('global-page-loader').style.opacity = '0'
      setTimeout(() => {
        document.getElementById('global-page-loader').style.display = 'none'
      }, 500)
    }
  }, [userLoaded, infoLoaded])
  useEffect(() => {
    console.log('ChangeLang', i18n.language)
    if(!langInitdRef.current){
      langInitdRef.current = true

      return
    }
   BannerRepository.fetchBanners().then(i => setBanners(i)).catch(() => { })
  }, [i18n.language])
  useEffect(() => {
    const promises = []
    if(props.token){
      promises.push(updateUserDetails().catch(() => {setAuth(false)}))
    }else{
      setUserLoaded(true)
    }
    promises.push(InfoRepository.getCurrencies().then(i => setCurrencies(i)).catch(() => { }))
    promises.push(InfoRepository.getCountryByIp().then(i => setCountryByIp(i)).catch(() => { }))
    promises.push(BannerRepository.fetchBanners().then(i => setBanners(i)).catch(() => { }))
    promises.push(updatePromoCodes().catch(() => { }))
    Promise.all(promises).then(i => setTimeout(( ) => setInfoLoaded(true), 400) )
    if (!auth) {
      return
    }
    // PaymentMethodRepository.fetchDeposit().then(i => setPaymentMethodsDeposit(i))
    // PaymentMethodRepository.fetchWithdraw().then(i => setPaymentMethodsWithdraw(i))
  }, [])
  const showModal = (type: ModalType | ProfileModalType, args?: any) => {

    if (props.isMobile && ModalsBottomSheet.includes(type)) {
      showBottomSheet(type, args)
      return
    }
    ReactModal.setAppElement('body')
    setModalArguments(args)
    setModal(type)

  }
  const hideModal = () => {
    if (bottomSheet) {
      hideBottomSheet()
      return
    }
    setModal(null)
    setModalProfileStack([])
  }
  const showBottomSheet = (type: ModalType | ProfileModalType, props?: any) => {
    ReactModal.setAppElement('body')
    setModalArguments(props)
    setBottomSheet(type)
  }
  const hideBottomSheet = () => {
    setBottomSheet(null)
  }
  const updateUserDetails = async () => {
    try {
      const res = await UserRepository.getUser()
      setUser(res)
    } catch (e) {

    }
    setUserLoaded(true)
  }
  const updatePromoCodes = async () => {
    try {
      const promoCodes = await PromoCodeRepository.fetchList()
      const isEnabled = UserUtils.isBonusEnabled(promoCodes)
      const details = UserUtils.getBonusBannerDetails(promoCodes)
      setBonusBannerDetails(details)
      setShowBonus(isEnabled)
      if (runtimeConfig.FAKE_BONUS) {
        setBonusBannerDetails({
          amount: 10,
          currency: 'USD',
          freeSpins: 10,
          freeBitcoin: 10,
          lotteryTickets: 10,
          wheelSpins: 10,
          validTill: addHours(new Date(), 1).toISOString()
        })
        setShowBonus(true)
      }

      if ((runtimeConfig.FAKE_BONUS || isEnabled) && !auth && !Cookies.get(CookiesType.bonusDepositShowMode) && !([ModalType.fortune, ModalType.registration] as ModalType[]).includes(modal as ModalType)) {
        setTimeout(() => {
          showModal(ModalType.bonus)
        }, Timers.showBonusesBanner)
      }
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}
