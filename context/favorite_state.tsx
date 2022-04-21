import { createContext, useContext, useEffect, useRef, useState } from 'react'
import {FavoriteEntityType, SnackbarType} from 'types/enums'
import { debounce } from 'debounce'

import { useAppContext } from 'context/state'
import {FavoritesStoreType} from 'types/interfaces'
import GameFavoriteRepository from 'data/repositories/GameFavoriteRepository'

const tmpList: number[] = []

const initStore = {
  games: [],
}

interface IState {
  store: FavoritesStoreType
  addRecord(id: number): void
  like(id: number): void
  unlike(id: number): void
}

const defaultValue: IState = {
  store: {...initStore},
  addRecord() {},
  like() {},
  unlike() {},
}

const FavoriteContext = createContext<IState>(defaultValue)

interface Props {
  children: React.ReactNode
}

export function FavoriteWrapper(props: Props) {
  const appContext = useAppContext()
  const [store, setStore] = useState<FavoritesStoreType>({...initStore})
  const isLogged = appContext.auth
  const isLoggedRef = useRef<boolean>(isLogged)
  const storeRef = useRef<FavoritesStoreType>(store)

  useEffect(() => {
    storeRef.current = store
  }, [store])

  useEffect(() => {
    if (!isLoggedRef.current && isLogged) {
      debouncedSave()
    }
    if (isLoggedRef.current && !isLogged) {
      setStore({...initStore})
    }
    isLoggedRef.current = isLogged
  }, [isLogged])

  const debouncedSave = debounce(async () => {
    if (isLoggedRef.current && tmpList.length > 0) {
      const likes = await GameFavoriteRepository.fetchStatus()
      tmpList.length = 0
      if (likes) {
        setStore(join(store, {games: likes}))
      }
    }
  }, 500)
  const value: IState = {
    ...defaultValue,
    store,
    addRecord(id: number) {
      tmpList.push(id)
      debouncedSave()
    },
    async like(id: number) {
      setStore(join(storeRef.current, {
        ...initStore,
        games: [id],
      }))
      try {
        await GameFavoriteRepository.create(id)
      } catch (err) {
          appContext.showSnackbar(err, SnackbarType.error)

      }
    },
    async unlike(id: number) {
      setStore({
        ...storeRef.current,
        games: storeRef.current.games.filter(item => item != id)
      })
      try {
        await GameFavoriteRepository.delete(id)
      } catch (err) {
        appContext.showSnackbar(err, SnackbarType.error)
      }
    },
  }

  return (
    <FavoriteContext.Provider value={value}>
      {props.children}
    </FavoriteContext.Provider>
  )
}

export function useFavoriteContext() {
  return useContext(FavoriteContext)
}

function join(a: FavoritesStoreType, b: FavoritesStoreType): FavoritesStoreType{
  const result: FavoritesStoreType = {...initStore}
  for (let type in FavoriteEntityType) {
    const listA = a[type as FavoriteEntityType] ?? []
    const listB = b[type as FavoriteEntityType] ?? []
    result[type as FavoriteEntityType] = Array.from(new Set([...listA, ...listB]))
  }
  return result
}
