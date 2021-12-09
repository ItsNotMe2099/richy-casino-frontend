import styles from './index.module.scss'
import Link from 'next/link'

interface IItem {
  image: string
  label: string
  link: string
}

interface Props {
  item: IItem
}

export default function Slide(props: Props) {

  return (
    <Link href={props.item.link}>
    <a className={styles.root} style={{backgroundImage: `url(${props.item.image})`}}>
      <div className={styles.label}>
        {props.item.label}
      </div>
    </a>
  </Link>
  )
}
