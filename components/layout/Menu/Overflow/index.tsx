import styles from './index.module.scss'
import ButtonDotsWithOverflow from 'components/ui/Button/ButtonDotsWithOverflow'
import MenuItem from 'components/layout/Menu/MenuItem'

interface IOption{
  label: string
  link: string
  onClick?: () => void
}

interface Props {
  children?: React.ReactNode
  className?: string
  options: IOption[]
  currentRoute: string
  currentPath: string
}

export default function Overflow(props: Props) {

  const length = props.options.length

  return (
    <>
      <div className={styles.list}>
            {props.options.map((item, index) => (
              <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
            ))
          }
          <div className={styles.transparent}></div>
          </div>
          <div className={styles.listMedium}>
            {props.options.slice(0, length - 1).map((item, index) => (
              <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 1, length).map((item, index) => (
            <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listSmall}>
            {props.options.slice(0, length - 2).map((item, index) => (
              <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 2, length).map((item, index) => (
            <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listExtraSmall}>
            {props.options.slice(0, length - 3).map((item, index) => (
              <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 3, length).map((item, index) => (
            <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listSuperSmall}>
            {props.options.slice(0, length - 4).map((item, index) => (
              <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 4, length).map((item, index) => (
            <MenuItem link={item.link} label={item.label} onClick={item.onClick} key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
          <div className={styles.listTwoItems}>
            {props.options.slice(0, length - 5).map((item, index) => (
              <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
            ))
          }
          <ButtonDotsWithOverflow>
          {props.options.slice(length - 5, length).map((item, index) => (
            <MenuItem link={item.link} label={item.label} onClick={item.onClick}  key={index}/>
          ))}
          </ButtonDotsWithOverflow>
          </div>
    </>
  )
}

