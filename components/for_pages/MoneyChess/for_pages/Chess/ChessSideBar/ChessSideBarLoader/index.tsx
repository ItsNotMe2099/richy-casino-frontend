import styles from 'components/for_pages/MoneyChess/for_pages/Chess/ChessSideBar/ChessSideBarLoader/index.module.scss'
import useInterval from 'use-interval'
import {useState} from 'react'
import classNames from 'classnames'

interface Props {

}

export default function ChessSideBarLoader(props: Props) {
  const [index, setIndex] = useState(0)
  useInterval(() => {
    if (index >= 2) {
      setIndex(0)
    }else{
      setIndex(i => i + 1)
    }
  }, 1000)
  return ( <div className={styles.root}>
    {[0, 1,2].map((i, key) => <div key={key} className={classNames(styles.circle, {[styles.active]: index === i})}/>)}
  </div>)
}
