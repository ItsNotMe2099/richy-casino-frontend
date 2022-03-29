import styles from './index.module.scss'
import classNames from 'classnames'
import Link from 'next/link'
import ButtonDotsWithOverflow from 'components/ui/Button/ButtonDotsWithOverflow'

interface IOption{
  label: string
  link: string
}

interface Props {
  children?: React.ReactNode
  className?: string
  options: IOption[]
  currentRoute: string
  currentPath: string
}

export default function Overflow(props: Props) {

  const MenuItem = (prop: {item: IOption}) => {
    
    return(
      <Link href={prop.item.link}>
          <a
            className={classNames(styles.item, {
            [styles.itemActive]: props.currentRoute === prop.item.link || props.currentPath === prop.item.link,
            })}
            href={prop.item.link}
          >
            {prop.item.label}
          </a>
      </Link>
    )
  }

  const length = props.options.length 

  return (
    <>
      <div className={styles.list}>
            {props.options.map((item, index) => (
              <MenuItem item={item} key={index}/>
            ))
          }
          <div className={styles.transparent}></div>
          </div>
          <div className={styles.listMedium}>
            {props.options.slice(0, length - 1).map((item, index) => (
              <MenuItem item={item} key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 1, length).map((item, index) => (
            <MenuItem item={item} key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listSmall}>
            {props.options.slice(0, length - 2).map((item, index) => (
              <MenuItem item={item} key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 2, length).map((item, index) => (
            <MenuItem item={item} key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listExtraSmall}>
            {props.options.slice(0, length - 3).map((item, index) => (
              <MenuItem item={item} key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 3, length).map((item, index) => (
            <MenuItem item={item} key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listSuperSmall}>
            {props.options.slice(0, length - 4).map((item, index) => (
              <MenuItem item={item} key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 4, length).map((item, index) => (
            <MenuItem item={item} key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listTwoItems}>
            {props.options.slice(0, length - 5).map((item, index) => (
              <MenuItem item={item} key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 5, length).map((item, index) => (
            <MenuItem item={item} key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
    </>
  )
}

