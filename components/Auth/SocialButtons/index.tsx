import styles from './index.module.scss'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import Link from 'next/link'
import HiddenXs from 'components/ui/HiddenXS'
import VisibleXs from 'components/ui/VisibleXS'
import {runtimeConfig} from 'config/runtimeConfig'



const SocialItem = ({link, image}) => <Link href={link || '#'}>
  <a>
    <img src={image} alt=''/>
  </a>
</Link>

export default function SocialButtons() {

  const host = runtimeConfig.HOST
  const socials = [
    {image: '/img/Auth/G+.svg', link: `${host}/api/user/social/login?authclient=google`},
    {image: '/img/Auth/ok.svg', link: `${host}/api/auth/register/google`},
    {image: '/img/Auth/vk.svg', link:  `${host}/api/user/social/login?authclient=vkontakte`},
    {image: '/img/Auth/ya.svg', link:  `${host}/api/auth/register/yandex`},
    {image: '/img/Auth/telegram.svg', link: '${host}/api/auth/register/telegram'},
    {image: '/img/Auth/mailRu.svg', link: `${host}/api/auth/register/mailru`},
    {image: '/img/Auth/steam.svg', link: `${host}/api/auth/register/steam`},
  ]


  const {t} = useTranslation('common')

  const [promoCode, setPromoCode] = useState(false)

  return (
    <>
      <HiddenXs>
        <div className={styles.socials}>

          {socials.map((item, index) =>
            <SocialItem {...item} key={index}/>
          )}
        </div>
      </HiddenXs>
      <VisibleXs>
        <>
          <div className={styles.socials}>
            {socials.slice(0, 4).map((item, index) =>
              <SocialItem {...item} key={index}/>
            )}
          </div>
          <div className={styles.socials}>
            {socials.slice(4, socials.length).map((item, index) =>
              <SocialItem {...item} key={index}/>
            )}
          </div>
        </>
      </VisibleXs>


    </>
  )
}
