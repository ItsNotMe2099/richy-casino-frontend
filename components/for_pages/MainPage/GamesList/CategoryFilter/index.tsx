import {useEffect, useState} from 'react'

import {IGameCategory} from 'data/interfaces/IGameCategory'
import GameListRepository from 'data/repositories/GameListRepository'
import DropdownMenu from 'components/for_pages/MainPage/GamesList/DropdownMenu'
import styles from './index.module.scss'
import GameCategoryCard from 'components/for_pages/Common/GameCategoryCard'
import {useTranslation} from 'next-i18next'


interface Props {
 categoryId: number
  onChange: (categoryId: number) => void
}

export default function CategoryFilter(props: Props){
  const {t} = useTranslation()
  const [categories, setCategories] = useState<IGameCategory[]>([])
  const [activeToggle, setActiveToggle] = useState<boolean>(false)
  const [category, setCategory] = useState<IGameCategory | null>(null)
  useEffect(() => {
    GameListRepository.fetchCategories().then(i => setCategories(i.data ?? []))
  }, [])
  const handleClick = (category: IGameCategory) => {
    setCategory(category)
    props.onChange(category?.id)
    setActiveToggle(i => !i)
  }

  return (
    <DropdownMenu activeToggle={activeToggle} placeholder={category ? category.name : t('main_game_list_filter_category')} icon={'/img/DropdownMenu/arrows.svg'}>
      <div className={styles.root}>
      {categories.map(i => <GameCategoryCard key={i.id} item={i}/>)}
      </div>
    </DropdownMenu>

  )
}
