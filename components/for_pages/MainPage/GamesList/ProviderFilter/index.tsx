import {useEffect, useState} from 'react'

import {IGameProvider} from 'data/interfaces/IGameProvider'
import GameListRepository from 'data/repositories/GameListRepository'
import DropdownMenu from 'components/for_pages/MainPage/GamesList/DropdownMenu'
import styles from './index.module.scss'
import ProviderCard from 'components/for_pages/Common/ProviderCard'


interface Props {
 providerId: number
  onChange: (categoryId: number) => void
}

export default function ProviderFilter(props: Props){
  const [providers, setProviders] = useState<IGameProvider[]>([])
  const [activeToggle, setActiveToggle] = useState<boolean>(false)
  const [provider, setProvider] = useState<IGameProvider | null>(null)
  useEffect(() => {
    GameListRepository.fetchProviders().then(i => setProviders(i.data ?? []))
  }, [])
  const handleClick = (provider: IGameProvider) => {
    setProvider(provider)
    props.onChange(provider?.id)
    setActiveToggle(i => !i)
  }

  return (
    <DropdownMenu activeToggle={activeToggle} placeholder={provider ? provider.name : 'Провайдер'} icon={'/img/DropdownMenu/pacman.svg'}>
      <div className={styles.root}>
        <div className={styles.wrapper}>
      {providers.map(i => <ProviderCard key={i.id} item={i} onClick={() => handleClick(i)}/>)}
        </div>
      </div>
    </DropdownMenu>

  )
}
