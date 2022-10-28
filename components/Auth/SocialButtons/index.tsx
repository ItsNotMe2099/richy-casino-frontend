import styles from './index.module.scss'
import {useEffect, useState} from 'react'
import {useTranslation} from 'next-i18next'
import Link from 'next/link'
import {runtimeConfig} from 'config/runtimeConfig'
import SocialServiceRepository from 'data/repositories/SocialServiceRepository'
import {ISocialService} from 'data/interfaces/ISocialService'
import Google from 'components/svg/Google'
import FacebookL from 'components/svg/FacebookL'
import OK from 'components/svg/OK'
import Yandex from 'components/svg/Yandex'
import VK from 'components/svg/VK'
import MailRu from 'components/svg/MailRu'
import Steam from 'components/svg/Steam'
import Instagram from 'components/svg/Instagram'
import Telegram from 'components/svg/Telegram'
import AuthRepository from 'data/repositories/AuthRepository'
import {useAppContext} from 'context/state'
import {ProfileModalType} from 'types/enums'

interface Props{
  currency?: string
}
const SocialItem = ({link, icon}) => <Link href={link || '#'}>
  <a className={styles.btn}>
    {icon}
  </a>
</Link>

export default function SocialButtons(props: Props) {
  const [services, setServices] = useState<ISocialService[]>([])
  const appContext = useAppContext()
  useEffect( () => {
    SocialServiceRepository.fetchServices().then(i => setServices(i ?? []))
  }, [])
  const host = runtimeConfig.HOST
  const getIcon = (icon: string) => {
    const basePath = '/img/Auth/'
    switch (icon){
      case 'google':
        return <Google/>
      case 'facebook':
        return <FacebookL/>
      case 'twitter':
        return `${basePath}/twitter.svg`
      case 'ok':
        return <OK/>
      case 'yandex':
        return <Yandex/>
      case 'vkontakte':
        return <VK/>
      case 'mail':
        return <MailRu/>
      case 'steam':
        return <Steam/>
      case 'instragram':
        return <Instagram/>
      case 'telegram':
        return <Telegram/>
    }
  }
  const socials = services.filter(i => i.id !== 'telegram').map(i => ({icon: getIcon(i.id), link: `${i.url}${props.currency ? `&currency_iso=${props.currency}` : ''}`})).filter(i => i.icon)


  const {t} = useTranslation('common')
  const handleTelegram = () => {

    (window as any).Telegram.Login.auth(
      { bot_id: '2110156771', request_access: true },
      async (data) => {
        if (!data) {
          // authorization failed
          return
        }
       const res = await  AuthRepository.telegramLogin({...data, currency_iso: props.currency})
        if(res.token){
          appContext.setToken(res.token)
          await appContext.updateUserFromCookies()
          appContext.hideModal()
          appContext.showModal(ProfileModalType.wallet)
        }

      }
    )
  }

  return (
    <div className={styles.root}>
      {socials.map((item, index) =>
        <SocialItem {...item} key={index}/>
      )}

      <div className={styles.btn} onClick={handleTelegram}>
        <Telegram/>
      </div>

    </div>
  )
}
