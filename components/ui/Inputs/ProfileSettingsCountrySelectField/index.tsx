import {IField, IOption} from 'types/interfaces'
import {ProfileSettingsSelectField} from 'components/ui/Inputs/ProfileSettingsSelectField'
import Validator from 'utils/validator'
import {useEffect, useState} from 'react'
import InfoRepository from 'data/repositories/InfoRepository'

export interface ICustomSelectViewOption extends IOption<string>{

}

interface Props extends IField{

}
export const ProfileSettingsCountrySelectField = (props: Props) => {

  const [countries, setCountries] = useState([])
  useEffect(() => {
     InfoRepository.getCountries().then(i => setCountries(i))
  }, [])
  return (
    <ProfileSettingsSelectField name='country_iso' options={countries.map(i => ({label: i.name}))}   label='Страна' validate={Validator.required}/>

  )
}
