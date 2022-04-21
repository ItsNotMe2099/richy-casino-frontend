import {IField, IOption} from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import classNames from 'classnames'
import {useField} from 'formik'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'

export interface ICustomSelectViewOption extends IOption<string>{

}

interface Props extends IField{
  options: ICustomSelectViewOption[]
  placeholder?: string
  initial?: string
  currentItem?: ICustomSelectViewOption
}
interface PropsOption{
  option?: ICustomSelectViewOption
  isActive?: boolean
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
}


const Option = (props: PropsOption) => {
    return <div className={styles.option} onClick={props.onClick}>{props.option.label}</div>
}

const Placeholder = (props: PropsOption) => {
  return (
  <div className={styles.placeholder}>
      <div className={styles.label}>{props.option?.label}</div>
      <img className={classNames({[styles.reverse]: props.isActive})}
        src='/img/Select/arrow-big.svg' alt=''/>
  </div>
  )
}

export const ProfileSettingsSelectField = (props: Props) => {
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched
  return (
    <div>
  <div className={classNames(styles.root, {[styles.error]: hasError})}>
    <div className={styles.label}>{props.label}</div>
    <SelectField {...props} currentItemStyle={styles.current} className={styles.select}
      itemComponent={(option, active, onClick) => <Option key={option.value} isActive={active} option={option} onClick={onClick}/>}
      activeComponent={(option, isActive) => <Placeholder option={option} isActive={isActive}/>}
    />
  </div>
      <ErrorInput {...meta} className={styles.errorMessage}/>
    </div>
  )
}
