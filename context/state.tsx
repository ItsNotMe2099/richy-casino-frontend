import {createContext, useContext, useEffect, useState} from 'react'
import { ModalType, ProfileModalType } from 'types/enums'
import ReactModal from 'react-modal'

interface IState {
  isMobile: boolean
  isDesktop: boolean
  modal: ModalType | ProfileModalType | null
  showModal: (type: ModalType | ProfileModalType) => void
  hideModal: () => void
  updateUserFromCookies: () => void
}

const defaultValue: IState = {
  isMobile: false,
  isDesktop: true,
  modal: null,
  showModal: (type) => null,
  hideModal: () => null,
  updateUserFromCookies: () => null
}

const AppContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
  isMobile: boolean
  token?: string
}

export function AppWrapper(props: Props) {
  const [modal, setModal] = useState<ModalType | ProfileModalType | null>(null)
  const [userDetails, setUserDetails] = useState<any>()
  const value: IState = {
    ...defaultValue,
   isMobile: props.isMobile,
   isDesktop: !props.isMobile,
   modal,
    showModal: (type) => {
      ReactModal.setAppElement('body')
      setModal(type)
    },
    hideModal: () => {
      setModal(null)
    },
  }

  useEffect(() => {
    if (props.token) {
      updateUserDetails()
    }
  }, [props.token])

  const updateUserDetails = async () => {
    const res = await request('/api/auth/info')
    if (res.err) {
      value.showSnackbar(res.err, SnackbarType.error)
      return false
    }
    setUserDetails(res.data)
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
