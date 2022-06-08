import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import Link from 'next/link'
import {runtimeConfig} from 'config/runtimeConfig'
import SocialServiceRepository from 'data/repositories/SocialServiceRepository'
import {ISocialService} from 'data/interfaces/ISocialService'

interface Props{
  currency?: string
}
const SocialItem = ({link, icon}) => <Link href={link || '#'}>
  <a className={styles.btn}>
    <img src={icon} alt=''/>
  </a>
</Link>

export default function SocialButtons(props: Props) {
  const [services, setServices] = useState<ISocialService[]>([])
  useEffect(() => {
    SocialServiceRepository.fetchServices().then(i => setServices(i ?? []))
  }, [])
  const host = runtimeConfig.HOST
  const getIcon = (icon: string) => {
    const basePath = '/img/Auth/'
    switch (icon){
      case 'google':
        return `${basePath}/google.svg`
      case 'facebook':
        return `${basePath}/facebook.svg`
      case 'twitter':
        return `${basePath}/twitter.svg`
      case 'ok':
        return `${basePath}/google.svg`
      case 'yandex':
        return `${basePath}/yandex.svg`
      case 'vkontakte':
        return `${basePath}/vk.svg`
      case 'mail':
        return `${basePath}/mailRu.svg`
      case 'steam':
        return `${basePath}/steam.svg`
      case 'instragram':
        return `${basePath}/instragram.svg`
    }
  }
  const socials = services.map(i => ({icon: getIcon(i.id), link: `${i.url}${props.currency ? `&currency=${props.currency}` : ''}`})).filter(i => i.icon)


  const {t} = useTranslation('common')


  return (
    <div className={styles.root}>
      {socials.map((item, index) =>
        <SocialItem {...item} key={index}/>
      )}
    </div>
  )
}
