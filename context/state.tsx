import {createContext, useContext, useEffect, useState} from 'react'
import {BonusDepositShowMode, CookiesType, ModalType, ProfileModalType, SnackbarType} from 'types/enums'
import ReactModal from 'react-modal'
import UserRepository from 'data/repositories/UserRepository'
import Cookies from 'js-cookie'
import {ICurrency} from 'data/interfaces/ICurrency'
import InfoRepository from 'data/repositories/InfoRepository'
import IUser from 'data/interfaces/IUser'
import {IBonusBannerDetails, SnackbarData} from 'types/interfaces'
import {CookiesLifeTime, Timers} from 'types/constants'
import PromoCodeRepository from 'data/repositories/PromoCodeRepository'
import UserUtils from 'utils/user'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  auth: boolean
  modalArguments?: any
  modal: ModalType | ProfileModalType | null
  showModal: (type: ModalType | ProfileModalType, data?: any) => void
  hideModal: () => void
  setToken: (token) => void
  logout: () => void
  updateUserFromCookies: () => void
  user: IUser,
  showBonus: boolean,
  bonusShowMode: BonusDepositShowMode | null
  setBonusShowMode: (show: BonusDepositShowMode) => void,
  bonusBannerDetails: IBonusBannerDetails | null
  updatePromoCodes: () => void
  currencies: ICurrency[]
  snackbar: SnackbarData | null,
  showSnackbar: (text: string, type: SnackbarType) => void
}

const defaultValue: IState = {
  modalArguments: null,
  isMobile: false,
  isDesktop: true,
  modal: null,
  auth: false,
  user: null,
  showModal: (type, data) => null,
  hideModal: () => null,
  setToken: (token) => null,
  logout: () => null,
  updateUserFromCookies: () => null,
  updatePromoCodes: () => null,
  showBonus: false,
  bonusShowMode: null,
  setBonusShowMode: (show) => null,
  bonusBannerDetails: null,
  currencies: [],
  snackbar: null,
  showSnackbar: (text, type) => null,
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
  initialUser?: IUser
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | ProfileModalType | null>(null)
  const [modalArguments, setModalArguments] = useState<ModalType | ProfileModalType | null>(null)
  const [user, setUser] = useState<IUser | null>(props.initialUser)
  const [auth, setAuth] = useState<boolean>(!!props.initialUser)
  const [showBonus, setShowBonus] = useState<boolean>(false)
  const [bonusShowMode, setBonusShowMode] = useState<BonusDepositShowMode | null>(null)
  const [bonusBannerDetails, setBonusBannerDetails] = useState<IBonusBannerDetails>(null)
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const value: IState = {
    ...defaultValue,
    isMobile: props.isMobile,
    isDesktop: !props.isMobile,
    auth,
    modal,
    modalArguments,
    currencies,
    user,
    snackbar,
    showModal: (type, props: any) => {
      showModal(type, props)

    },
    hideModal: () => {
      setModal(null)
    },
    setToken: (token: string) => {
      Cookies.set(CookiesType.accessToken, token, {expires: CookiesLifeTime.accessToken})
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
      console.log('setBonusShowMode', mode)
      setBonusShowMode(mode)
      Cookies.set(CookiesType.bonusDepositShowMode, mode, {expires: CookiesLifeTime.bonusDepositShowMode})

    },

    showSnackbar: (text, type: SnackbarType) => {
      setSnackbar({text, type})
      setTimeout(() => {
        setSnackbar(null)
      }, 2000)
    },


  }

  useEffect(() => {
    if (props.token) {
      setAuth(true)
      updateUserDetails()
    }

  }, [props.token])
  useEffect(() => {
    updatePromoCodes()
    if (!Cookies.get(CookiesType.firstVisitAt)) {
      Cookies.set(CookiesType.firstVisitAt, (new Date()).toISOString(), {expires: CookiesLifeTime.firstVisitAt})
    }
    if (Cookies.get(CookiesType.bonusDepositShowMode)) {
      setBonusShowMode(Cookies.get(CookiesType.bonusDepositShowMode) as BonusDepositShowMode)
    }
  }, [])
  useEffect(() => {
    InfoRepository.getCurrencies().then(i => setCurrencies(i))
  }, [])
  const showModal = (type: ModalType | ProfileModalType, props?: any) => {
    ReactModal.setAppElement('body')
    setModalArguments(props)
    setModal(type)
  }
  const updateUserDetails = async () => {
    const res = await UserRepository.getUser()
    setUser(res)
  }
  const updatePromoCodes = async () => {
    try {
      const promoCodes = await PromoCodeRepository.fetchList()
      const isEnabled = UserUtils.isBonusEnabled(promoCodes)
      const details = UserUtils.getBonusBannerDetails(promoCodes)
      setBonusBannerDetails(details)
      setShowBonus(isEnabled)
      if (isEnabled && !auth && !Cookies.get(CookiesType.bonusDepositShowMode)) {
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
