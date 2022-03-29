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
}
export default function GFieldBetAmount(props:Props) {
  const { name, ...rest} = props
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
      switch (value){
        case '∞':
          helpers.setValue(value)
          break
        case '10':
          helpers.setValue(value)
          break
        case '100':
          helpers.setValue(value)
          break
      }
    }
    return <div className={styles.buttons}>
      <Button value={'∞'} onClick={handleClick} active={value === '∞'}/>
      <Button value={'10'} onClick={handleClick} active={value === '10'}/>
      <Button value={'100'} onClick={handleClick} active={value === '100'}/>
    </div>
  }
 return   <GField  name={name} label={'Сумма'} suffix={<Suffix/>} inputClassName={styles.input} {...rest}/>
}

