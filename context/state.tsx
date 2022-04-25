import {createContext, useContext, useEffect, useState} from 'react'
import {BonusDepositShowMode, CookiesType, ModalType, ProfileModalType, SnackbarType} from 'types/enums'
import ReactModal from 'react-modal'
import UserRepository from 'data/repositories/UserRepository'
import Cookies from 'js-cookie'
import {ICurrency} from 'data/interfaces/ICurrency'
import InfoRepository from 'data/repositories/InfoRepository'
import IUser from 'data/interfaces/IUser'
import {IBonusBannerDetails, IModalProfileStackItem, SnackbarData} from 'types/interfaces'
import {CookiesLifeTime, Timers} from 'types/constants'
import PromoCodeRepository from 'data/repositories/PromoCodeRepository'
import UserUtils from 'utils/user'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  auth: boolean
  modalArguments?: any
  modal: ModalType | ProfileModalType | null
  lastProfileModal?: IModalProfileStackItem
  showModal: (type: ModalType | ProfileModalType, data?: any) => void
  showModalProfile: (type: ProfileModalType, data?: any) => void
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
  bottomSheet: null,
  auth: false,
  user: null,
  lastProfileModal: null,
  showModal: (type, data) => null,
  showModalProfile: (type, data?: any) => null,
  goBackModalProfile: () => null,
  hideModal: () => null,
  showBottomSheet: (type, data) => null,
  hideBottomSheet: () => null,
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
const ModalsBottomSheet = [
  ProfileModalType.withdraw,
  ProfileModalType.wallet,
  ModalType.login,
  ModalType.registration,
  ModalType.registrationPhone,
  ModalType.registrationSuccess,
  ModalType.passwordRecovery,
  ModalType.passwordReset,
  ModalType.fortune,
  ModalType.profileBurger
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
  const [user, setUser] = useState<IUser | null>(props.initialUser)
  const [auth, setAuth] = useState<boolean>(!!props.initialUser)
  const [showBonus, setShowBonus] = useState<boolean>(false)
  const [bonusShowMode, setBonusShowMode] = useState<BonusDepositShowMode | null>(null)
  const [bonusBannerDetails, setBonusBannerDetails] = useState<IBonusBannerDetails>(null)
  const [currencies, setCurrencies] = useState<ICurrency[]>([])
  const [snackbar, setSnackbar] = useState<SnackbarData | null>(null)
  const [modalProfileStack, setModalProfileStack] = useState<IModalProfileStackItem[]>([])
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
    showModal: (type, props: any) => {
      showModal(type, props)

    },
    showModalProfile: (type, args: any) => {
      showModal(type, props)

      if (modal && !(props.isMobile && ModalsBottomSheet.includes(type)) && Object.values(ProfileModalType).includes(modal as ProfileModalType)) {
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
      hideModal()
    },
    showBottomSheet: (type, props: any) => {
      showBottomSheet(type, props)
    },
    hideBottomSheet: () => {
      hideBottomSheet()
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
  const showModal = (type: ModalType | ProfileModalType, args?: any) => {

    if (props.isMobile && ModalsBottomSheet.includes(type)) {
      console.log('ModalsBottomSheet.includes(type)', type)
      showBottomSheet(type, args)
      return
    }
    ReactModal.setAppElement('body')
    setModalArguments(args)
    setModal(type)

  }
  const hideModal = () => {
    console.log('hideModal', bottomSheet)
    if(bottomSheet){
      hideBottomSheet()
      return
    }
    setModal(null)
    setModalProfileStack([])
  }
  const showBottomSheet = (type: ModalType | ProfileModalType, props?: any) => {
    ReactModal.setAppElement('body')
    setModalArguments(props)
    console.log('SetBottomSheet', type)
    setBottomSheet(type)
  }
  const hideBottomSheet = () => {
    setBottomSheet(null)
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
