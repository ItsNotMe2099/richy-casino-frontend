import styles from './index.module.scss'
import classNames from 'classnames'
import {useEffect, useRef} from 'react'
import {useAppContext} from 'context/state'
import { ModalType} from 'types/enums'
import {useFavoriteContext} from 'context/favorite_state'

interface Props {
  id: number
  className?: string
  inActiveClassName?: string
  big?: boolean
  onChange?: (state: boolean) => void
}

export default function FavoriteBtn(props: Props) {
  const ref = useRef<HTMLButtonElement>()
  const appContext = useAppContext()
  const favoriteContext = useFavoriteContext()
  const active = favoriteContext.store.games.includes(props.id)
  const activeRef = useRef<boolean>(active)
  const isLogged = appContext.auth
  const isLoggedRef = useRef<boolean>(isLogged)

  useEffect(() => {
    isLoggedRef.current = isLogged
  }, [isLogged])

  useEffect(() => {
    favoriteContext.addRecord(props.id)
  }, [])

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    const prevent = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
    }
    const handleClick = async (e: MouseEvent | TouchEvent) => {
      prevent(e)
      if (!isLoggedRef.current) {
        appContext.showModal(ModalType.login)

        return
      }

      if (activeRef.current) {
        await favoriteContext.unlike(props.id)
        if(props.onChange){
          props.onChange(false)
        }
      } else {
        await favoriteContext.like(props.id)
        if(props.onChange){
          props.onChange(true)
        }
      }
    }
    if (ref.current) {
      ref.current?.addEventListener('mousedown', prevent)
      ref.current?.addEventListener('click', handleClick)
      ref.current?.addEventListener('touchend', handleClick)
      return () => {
        ref.current?.removeEventListener('mousedown', prevent)
        ref.current?.removeEventListener('click', handleClick)
        ref.current?.removeEventListener('touchend', handleClick)
      }
    }
  }, [ref.current])

  return (
    <button
      ref={ref as any}
      className={classNames({
        [styles.root]: true,
        [props.inActiveClassName]: !active
      }, props.className)}
    >
      <img src="/img/GamesList/star-stroke.svg" alt="" className={classNames({
        [styles.inactiveImage]: true,
        [styles.inactiveImageInvisible]: active,
      })} />
      <img src="/img/GamesList/star-fill.svg" alt="" className={classNames({
        [styles.activeImage]: true,
        [styles.activeImageVisible]: active,
      })} />
    </button>
  )
}

