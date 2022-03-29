import {FieldConfig, useField, useFormikContext} from 'formik'
import styles from './index.module.scss'
import cx from 'classnames'
import ErrorInput from 'components/ui/Inputs/components/ErrorInput'
import InputRange from 'react-input-range'
import { v4 as uuid } from 'uuid'
import {IField} from 'types/interfaces'

interface Props extends IField{
  label?: string
  disabled?: boolean
  className?: string
  progressBarClassName?: string
  maxValue: number
  minValue: number
  state: 'higher' | 'lower',

}

export const GDiceProgressBar = (props: Props & FieldConfig) => {
  const { className, minValue, maxValue, progressBarClassName, state} = props
  const [field, meta] = useField(props)
  const {value} = field
  const { setFieldValue, setFieldTouched } = useFormikContext()
  const hasError = !!meta.error && meta.touched
  const handleChange = (value) => {
    if(props.disabled){
      return
    }
    if(props.onChange){
      props.onChange(value)
    }
    setFieldValue(props.name, value)
  }
  const progressBarStepNums = () => {
    const nums: number[] = [0]
    const progressBarStep = 100 / 4

    for(let i = 0; i < 100; i++) {
      if(i > nums[nums.length - 1] && i === nums.length * progressBarStep) {
        nums.push(i)
      }
    }

    nums.push(props.maxValue)

    return nums
  }

  return (
    <div className={cx(styles.root, className, {[styles.hasError]: !!meta.error && meta.touched})}>

        <div className={styles.progressContainer}>
        <div className={cx(styles.progressBar, progressBarClassName, {
          [styles.up]: state === 'higher',
          [styles.down]: state === 'lower',
        })}>
          <div className={styles.progressBorders}>
            <div className={styles.shadow}>
              <div className={styles.shadow}>
                <div className={styles.shadow}></div>
              </div>
            </div>
          </div>
      <InputRange
        maxValue={maxValue}
        minValue={minValue}
        value={value || 0}
        onChange={value => handleChange(Number(value))}
      />
        </div>
        </div>
        <div className={styles.xAxis}>
          {progressBarStepNums().map(s => <div key={uuid()} className={styles.step}>{s}</div>)}
        </div>

      <ErrorInput {...meta}/>
    </div>
  )
}
GDiceProgressBar.defaultProps = {
}
