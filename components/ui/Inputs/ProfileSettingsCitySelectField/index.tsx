import {IField, IOption} from 'types/interfaces'
import {ProfileSettingsSelectField} from 'components/ui/Inputs/ProfileSettingsSelectField'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import InfoRepository from 'data/repositories/InfoRepository'
import {useField} from 'formik'
export interface ICustomSelectViewOption extends IOption<string>{

}

interface Props extends IField{
  countryIso: string,
  searchPlaceholder?: string
}
export const ProfileSettingsCitySelectField = (props: Props) => {
  const {t, i18n} = useTranslation()
  const [data, setData] = useState<IOption<string>[]>([])
  const [field, meta, helpers] = useField(props)
  useEffect(() => {
    if(!props.countryIso){
      setData([])
      return
    }
    InfoRepository.getCities(props.countryIso).then((res) => {
      setData(res.map(i => ({label: i.name, value: i.id})))
      if(!res.find(i => i.id === field.value)){
        helpers.setValue(null)
      }
    })
  }, [props.countryIso])
  return (
    <ProfileSettingsSelectField search name='country_iso' {...props} disabled={props.disabled || data.length === 0}  options={data.length > 0 ? data : [{label: 'Нет городов', value: null}]}/>

  )
}
