import React, {createContext, useContext, useEffect, useRef, useState} from 'react'

import {PwaState} from 'types/enums'
import {getPlatform, platforms} from 'utils/platforms'

interface PwaInstallOptions {
  title: string
  description: string,
  logo: string
}

interface IState {
  state: PwaState
  supported: boolean,
  isInstalled: boolean,
  progress: number
  install: () => void
  abort: () => void
}


const defaultValue: IState = {
  state: PwaState.NotInstalled,
  supported: false,
  isInstalled: false,
  progress: 0,
  install: () => null,
  abort: () => null
}
const ReactPWAInstallContext = createContext<IState>(defaultValue)

export const usePwaContext = () => useContext(ReactPWAInstallContext)
interface BeforeInstallPromptEvent extends Event {
  prompt: () => void;
  userChoice: Promise<{outcome: string}>;
}
interface Props {
  children: React.ReactNode
  enableLogging?: boolean
}

export const ReactPWAInstallProvider = ({children, enableLogging}: Props) => {
  const platform = getPlatform()
  const awaitingPromiseRef = useRef<{resolve: any, reject: any}>(null)
  const deferredprompt = useRef<BeforeInstallPromptEvent>(null)
  const installIntervalRef = useRef(null)
  const isAborted = useRef<boolean>(null)
  const [dialogState, setDialogState] = useState(null)
  const [progress, setProgress] = useState<number>(0)
  const [supported, setSupported] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [state, setState] = useState<PwaState>(PwaState.NotInstalled)

  useEffect(() => {

    if (typeof window !== 'undefined') {
      window.addEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent)
      checkIsInstalled().then(i => setIsInstalled(i))
      setSupported(checkIsSupported())
      return function cleanup() {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPromptEvent)
      }


    }
  }, [])

  const logger = (message, data = null) => {
    if (enableLogging) {
      console.log(message, data)
    }
  }

  async function checkIsInstalled() {
    if (typeof window !== 'undefined') {
      if ((window.navigator as any).standalone === true || window.matchMedia('(display-mode: standalone)').matches) {
        logger('isInstalled: true. Already in standalone mode')
        return true
      }

    }
    logger('isInstalled: false.')
    return false
  }

  const checkIsSupported = () => {
    if (deferredprompt.current != null && platform === platforms.NATIVE) {
      logger('supported: true - native platform')
      return true
    }
    if (platform !== platforms.NATIVE && platform !== platforms.OTHER) {
      logger('supported: true - manual support')
      return true
    }
    logger('supported: false')
    return false
  }

  const handleBeforeInstallPromptEvent = async (event) => {
    event.preventDefault()
    deferredprompt.current = event
    logger('beforeinstallprompt event fired and captured')
    setIsInstalled(await checkIsInstalled())
    setSupported(checkIsSupported())
  }

  const openDialog = (options) => {
    setDialogState(options)
    return new Promise((resolve, reject) => {
      awaitingPromiseRef.current = {resolve, reject}
    })
  }

  const handleInstall = async () => {
    isAborted.current = null
    setState(PwaState.Downloading)
    logger('handleInstall called', deferredprompt.current)
    setDialogState(null)




    if (deferredprompt.current != null) {
      try {
        await deferredprompt.current.prompt()
        const choiceResult = await deferredprompt.current.userChoice
        if (choiceResult.outcome === 'accepted') {
          logger('PWA native installation succesful')
          setState(PwaState.Installed)
        } else {
          logger('User opted out by cancelling native installation')
          if (awaitingPromiseRef.current) {
            awaitingPromiseRef.current.reject()
          }
        }

      } catch (err) {
        if (awaitingPromiseRef.current) {
          awaitingPromiseRef.current.resolve()
        }
        logger('Error occurred in the installing process: ', err)
      }
    } else {
      if (awaitingPromiseRef.current) {
        awaitingPromiseRef.current.resolve()
      }
    }
  }
  const value: IState = {
    ...defaultValue,
    supported,
    isInstalled,
    progress,
    state,
    install: handleInstall,
    abort: () => {
      isAborted.current = true
      setProgress(0)
      setState(PwaState.NotInstalled)

    }
  }
  return (
    <>
      <ReactPWAInstallContext.Provider value={value}>
        {children}
      </ReactPWAInstallContext.Provider>


    </>
  )
}

export default ReactPWAInstallProvider
