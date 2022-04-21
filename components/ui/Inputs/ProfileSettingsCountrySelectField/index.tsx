import {IField, IOption} from 'types/interfaces'
import {ProfileSettingsSelectField} from 'components/ui/Inputs/ProfileSettingsSelectField'
import {useEffect, useMemo} from 'react'
import {useTranslation} from 'next-i18next'
const countries = require('i18n-iso-countries')
countries.registerLocale(require('i18n-iso-countries/langs/en.json'))
countries.registerLocale(require('i18n-iso-countries/langs/ru.json'))
export interface ICustomSelectViewOption extends IOption<string>{

}

interface Props extends IField{

}
export const ProfileSettingsCountrySelectField = (props: Props) => {
  const {t, i18n} = useTranslation()
  const data = useMemo(() => {
    const names = countries.getNames(i18n.language)
    return Object.keys(names).map(key =>({label: names[key], value: key})).sort((a, b) => {
      if(a.label < b.label) { return -1 }
      if(a.label > b.label) { return 1 }
      return 0
    })
  }, [i18n.language])
  console.log('Data11', data)
  useEffect(() => {
//     InfoRepository.getCountries().then(i => setCountries(i))
  }, [])
  return (
    <ProfileSettingsSelectField {...props} name='country_iso' options={data}   label='Страна' />

  )
}
