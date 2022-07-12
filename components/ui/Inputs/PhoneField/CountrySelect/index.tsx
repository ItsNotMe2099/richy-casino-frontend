import { FieldConfig } from 'formik'
import styles from './index.module.scss'
import classNames from 'classnames'
import { useState, useEffect, useMemo, useRef } from 'react'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { useTranslation } from 'next-i18next'
import { listenForOutsideClicks } from 'components/hooks/useDetectOutsideClick'
import flags from 'country-flag-icons/react/3x2'
interface IOption {
  value: string
  label: string
  divider: boolean
}

interface Props {
  value: string
  options: IOption[]
  onChange: (value: string) => void
}
const FlagComponent = ({
  country,
  countryName,

}) => {
  if (flags && flags[country]) {
    return flags[country]({ title: '' })
  }
  return null

}

export default function CountrySelect(props: Props & FieldConfig) {
  const { t, i18n } = useTranslation()
  const dropdownRef = useRef(null)

  const currentOption = useMemo<IOption>(() => props.options.find(i => i.value === props.value), [props.value])
  const [listening, setListening] = useState(false)
  const [isActive, setIsActive] = useState(false)
  useEffect(listenForOutsideClicks(
    listening,
    setListening,
    dropdownRef,
    setIsActive,
  ))



  const handleClick = (e) => {
    setIsActive(!isActive)
  }
  const handleChange = (item: IOption) => {
    props.onChange(item.value)
  }

  return (
    <div ref={dropdownRef} className={classNames(styles.root)} onClick={handleClick}>
      <div className={styles.dropDownTrigger}>
        <div className={styles.icon}>
          <FlagComponent countryName={currentOption?.label} country={props.value}></FlagComponent>
          </div>

        <img className={classNames({ [styles.reverse]: isActive })}
          src='/img/Select/arrow.svg' alt='' />
      </div>
      <nav className={classNames(styles.dropDown, { [styles.dropDownActive]: isActive })}>
        {/*style !== 'footer' && <div className={styles.triangle}></div>*/}
        <div className={styles.options}>
          <Scrollbars style={{ height: 200}}
            renderTrackVertical={props => <div {...props} className={styles.track} />}
            renderView={props => <div {...props} className={styles.view} />}>
            {props.options.map((item, index) =>
              <div className={styles.option} onClick={() => handleChange(item)} key={index}>
                    <div className={styles.icon}>
          <FlagComponent countryName={item.label} country={item.value}></FlagComponent>
          </div>{item.label}
              </div>
            )}
          </Scrollbars>
        </div>
      </nav>
    </div>)
}
