import styles from './index.module.scss'
import Button from 'components/ui/Button'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import {useTranslation} from 'next-i18next'
import Image from 'next/image'
import { ModalType } from 'types/enums'
import { useRouter } from 'next/router'
import { Routes } from 'types/routes'

interface Props {
  poker?: boolean
}

export default function GameCard(props: Props) {
  const {t} = useTranslation()
  const router = useRouter()
  const context = useAppContext()
  const isMobile = context.isMobile
  const handleClick = () => {
    if(!context.auth){
        context.showModal(ModalType.registration)
    }else{
      if(props.poker){
        router.push(Routes.poker)
      }else{
        router.push(Routes.chess)
      }
    }
  }
  const getShadow = (shadowColor) => {
    switch (shadowColor){
      case 'blue':
        if(context.isDesktop) {
          return'/img/shadows/light-blue-chess.png'
        }
        else{
          return'/img/shadows/light-blue-gamecard-mobile.png'
        }
      case 'red':
        if(context.isDesktop){
          return '/img/shadows/light-red-poker.png'
        }
        else{
          return'/img/shadows/light-blue-gamecard-mobile.png'
        }
    }
  }

  return (
      <div className={classNames(styles.root, {[styles.chess]: !props.poker})} onClick={handleClick}>
        <div className={styles.bg}>
          <Image src={props.poker ? '/img/GameCard/poker.svg' : '/img/GameCard/chess.svg'} width={584} height={253}/>
        </div>
        <div className={styles.image}>
          <div className={styles.shadow}><Image src={getShadow(props.poker ? 'red' : 'blue')} width={isMobile ? 70 : 134} height={isMobile ? 70 : 134}/></div>
          <Image src={props.poker ? '/img/GameCard/poker-small.png' : '/img/GameCard/chess-small.svg'} width={isMobile ? 40 : 82} height={isMobile ? 40 : 82}/>
        </div>
        <div className={styles.text}>
          <div className={styles.label}>
            {props.poker ? t('main_game_card_poker_title') : t('main_game_card_chess_title')}
          </div>
          <div className={styles.desc}>
            {props.poker ? t('main_game_card_desc') : t('main_game_card_desc')}

            {t('main_game_card_desc')}
          </div>
        </div>
        <div className={styles.btn}><Button href='#' size='play' background='blueGradient500'>{t('main_game_card_button')}</Button></div>
        <div className={styles.btnMobile}><Button href='#'><img src='/img/GameCard/arrow.svg' alt=''/></Button></div>
      </div>
  )
}
