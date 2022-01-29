import {createContext, useContext, useEffect, useState} from 'react'
import {CookiesType, ModalType, ProfileModalType} from 'types/enums'
import ReactModal from 'react-modal'
import UserRepository from 'data/repositories/UserRepository'
import Cookies from 'js-cookie'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  auth: boolean
  modalProps?: any
  modal: ModalType | ProfileModalType | null
  showModal: (type: ModalType | ProfileModalType, data?: any) => void
  hideModal: () => void
  setToken: (token) => void
  logout: () => void
  updateUserFromCookies: () => void

  showBonus: boolean,
  showBonusExpanded: boolean,
  setBonusExpanded: (show) => void,
}

const defaultValue: IState = {
  modalProps: null,
  isMobile: false,
  isDesktop: true,
  modal: null,
  auth: false,
  showModal: (type, data) => null,
  hideModal: () => null,
  setToken: (token) => null,
  logout: () => null,
  updateUserFromCookies: () => null,
  showBonus: false,
  showBonusExpanded: false,
  setBonusExpanded: (show) => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | ProfileModalType | null>(null)
  const [modalProps, setModalProps] = useState<ModalType | ProfileModalType | null>(null)
  const [userDetails, setUserDetails] = useState<any>()
  const [auth, setAuth] = useState<boolean>(true)
  const [showBonus, setShowBonus] = useState<boolean>(true)
  const [showBonusExpanded, setShowBonusExpanded] = useState<boolean>(true)
  const value: IState = {
    ...defaultValue,
    isMobile: props.isMobile,
    isDesktop: !props.isMobile,
    auth,
    modal,
    modalProps,

    showModal: (type, props: any) => {
      ReactModal.setAppElement('body')
      setModalProps(props)
      setModal(type)

    },
    hideModal: () => {
      setModal(null)
    },
    setToken: (token: string) => {
      Cookies.set(CookiesType.accessToken, token, {expires: 365})
      setAuth(true)
    },
    logout: () => {
      Cookies.remove(CookiesType.accessToken)
      setAuth(false)
      setUserDetails(null)
    },
    updateUserFromCookies() {
      updateUserDetails()
    },

    showBonus,
    showBonusExpanded,
    setBonusExpanded(show){
      setShowBonusExpanded(show)
    }
  }

  useEffect(() => {
    if (props.token) {
      setAuth(true)
      updateUserDetails()
    }
  }, [props.token])

  useEffect(() => {
    setTimeout(() => {
      setModal(ModalType.fortune)
    })
  }, [])
  const updateUserDetails = async () => {
    const res = await UserRepository.getUser()
    setUserDetails(res)
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
