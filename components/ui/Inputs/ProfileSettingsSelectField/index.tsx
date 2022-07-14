import { IField, IOption } from 'types/interfaces'
import styles from './index.module.scss'
import { SelectField } from 'components/ui/Inputs/SelectField'
import classNames from 'classnames'
import { useField } from 'formik'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import { ReactElement } from 'react'

export interface ICustomSelectViewOption extends IOption<string> {

}

interface Props extends IField {
  options: ICustomSelectViewOption[]
  placeholder?: string
  initial?: string
  currentItem?: ICustomSelectViewOption
  renderIcon?: (option: ICustomSelectViewOption) => ReactElement | null
}
interface PropsOption {
  option?: ICustomSelectViewOption
  isActive?: boolean
  onClick?: () => void
  currentItem?: ICustomSelectViewOption
  icon?: ReactElement | null
}


const Option = (props: PropsOption) => {
  return <div className={styles.option} onClick={props.onClick}>
    {props.icon && <div className={styles.icon}>{props.icon}</div>}
    <div className={styles.optionLabel}>{props.option.label}</div>
  </div>
}

const Placeholder = (props: PropsOption) => {
  return (
    <div className={styles.placeholder}>
      <div className={styles.placeholderWrapper}>
        {props.icon && <div className={styles.icon}>{props.icon}</div>}
        <div className={styles.label}>{props.option?.label}</div>
      </div>
      <img className={classNames({ [styles.arrow]: true, [styles.reversed]: props.isActive })}
        src='/img/Select/arrow-big.svg' alt='' />
    </div>
  )
}

export const ProfileSettingsSelectField = (props: Props) => {
  const [field, meta] = useField(props)
  const hasError = !!meta.error && meta.touched
  console.log('hasError', props.name, meta.error)
  return (
    <div>
      <div className={classNames(styles.root, { [styles.error]: hasError })}>
        <div className={styles.label}>{props.label}</div>
        <SelectField {...props} currentItemStyle={styles.current} className={styles.select}
          itemComponent={(option, active, onClick) => <Option key={option.value} icon={props.renderIcon ? props.renderIcon(option) : null} isActive={active} option={option} onClick={onClick} />}
          activeComponent={(option, isActive) => <Placeholder option={option} icon={props.renderIcon ? props.renderIcon(option) : null} isActive={isActive} />}
        />
      </div>
      <ErrorInput {...meta} className={styles.errorMessage} />
    </div>
  )
}
