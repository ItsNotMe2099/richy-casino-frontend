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
  onChange?: (value) => void
}
export default function GFieldChance(props:Props) {
  const { name, min, max, onChange, ...rest} = props
  const Button = ({value, onClick, disabled}: IButtonProps) => {
    return <div className={cx(styles.button,{
      [styles.disabled]: disabled,
    } )}
    onClick={() => onClick(value)}
    >{value}
    </div>
  }

  const Suffix = ({min, max, onChange}) => {
    const { setFieldValue, setFieldTouched } = useFormikContext()
    const [field, meta, helpers] = useField(props as any)
    const value = field.value

    const handleClick = (value) => {
      const _setValue = (val) => {
        helpers.setValue(val)
        onChange(val)
      }
      switch (value){
        case 'Min':
          _setValue( min)
          break
        case '-5':
          _setValue( field.value -5  <= min ? field.value : field.value - 5)
          break
        case '+5':
          _setValue((field.value + 5) > max ? field.value : field.value + 5)
          break
        case 'Max':
          _setValue(max)
          break
      }
    }
    return <div className={styles.buttons}>
      <div className={styles.percent}>%</div>
      <Button value={'Min'} onClick={handleClick}/>
      <Button value={'-5'} onClick={handleClick} />
      <Button value={'+5'} onClick={handleClick} />
      <Button value={'Max'} onClick={handleClick} />
    </div>
  }
 return   <GField  type={'number'} name={name} label={'Сумма'} suffix={<Suffix min={min} max={max} onChange={onChange}/>} inputClassName={styles.input} {...rest} onChange={onChange}/>
}

