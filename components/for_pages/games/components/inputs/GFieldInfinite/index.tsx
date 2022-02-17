import styles from './index.module.scss'
import GField from 'components/for_pages/games/components/inputs/GField'
import cx from 'classnames'
import {useField, useFormikContext} from 'formik'
interface IButtonProps{
  value: string,
  onClick: (e) => void,
  active?: boolean
  disabled?: boolean
}
interface Props{
  name: string
  label: string
}
export default function GFieldInfinite(props:Props) {
  const { name, label, ...rest} = props
  const Button = ({value, onClick, active, disabled}: IButtonProps) => {
    return <div className={cx(styles.button,{
      [styles.disabled]: disabled,
      [styles.active]: active
    } )}
    onClick={() => onClick(value)}
    >{value}
    </div>
  }

  const Suffix = () => {
    const { setFieldValue, setFieldTouched } = useFormikContext()
    const [field, meta, helpers] = useField(props as any)
    const value = field.value
    const handleClick = (value) => {
      console.log('handleClick')
      switch (value){
        case '∞':
          helpers.setValue(value)
          break
      }
    }

    return <div className={styles.buttons}>
      <Button value={'∞'} onClick={handleClick} active={value === '∞'}/>
    </div>
  }
 return   <GField  name={name} label={label} suffix={<Suffix/>} inputClassName={styles.input} {...rest}/>
}

