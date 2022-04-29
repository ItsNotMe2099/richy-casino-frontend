import {IField, IOption} from 'types/interfaces'
import {ProfileSettingsSelectField} from 'components/ui/Inputs/ProfileSettingsSelectField'
import {useEffect, useState} from 'react'
import {useField} from 'formik'
import InfoRepository from 'data/repositories/InfoRepository'
const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ru.json'))
export interface ICustomSelectViewOption extends IOption<string>{

}

interface Props extends IField{

}
export const ProfileSettingsCountrySelectField = (props: Props) => {
  const [data, setData] = useState<IOption<string>[]>([])
  const [field, meta, helpers] = useField(props)
  useEffect(() => {

    InfoRepository.getCountries().then((res) => {
      setData(res.map(i => ({label: i.name, value: i.iso})))
      if(!res.find(i => i.iso === field.value)){
        helpers.setValue(null)
      }
    })
  }, [])
  return (
    <ProfileSettingsSelectField {...props} options={data} />

  )
}
