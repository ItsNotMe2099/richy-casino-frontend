import styles from './index.module.scss'
import GField from 'components/for_pages/games/components/inputs/GField'
import cx from 'classnames'
import {useField, useFormikContext} from 'formik'
interface IButtonProps{
  value: string,
  onClick: (e) => void,
  disabled?: boolean
}
interface Props{
  name: string,
  label?: string
  min: number,
  max: number
  className?: string
}
export default function GFieldChance(props:Props) {
  const { name, min, max, ...rest} = props
  const Button = ({value, onClick, disabled}: IButtonProps) => {
    return <div className={cx(styles.button,{
      [styles.disabled]: disabled,
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
      switch (value){
        case 'Min':
          setFieldValue(name, min)
          break
        case '-5':
          setFieldValue(name, value <= 5 ? value : value - 5)
          break
        case '+5':
          setFieldValue(name, (value + 5) > max ? value : value + 5)
          break
        case 'Max':
          setFieldValue(name, max)
          break
      }
    }
    console.log('Value11', value)
    return <div className={styles.buttons}>
      <div className={styles.percent}>%</div>
      <Button value={'Min'} onClick={handleClick}/>
      <Button value={'-5'} onClick={handleClick} />
      <Button value={'+5'} onClick={handleClick} />
      <Button value={'Max'} onClick={handleClick} />
    </div>
  }
 return   <GField  name={name} label={'Сумма'} suffix={<Suffix/>} inputClassName={styles.input} {...rest}/>
}

