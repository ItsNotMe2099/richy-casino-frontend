import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import IframeResizer from 'iframe-resizer-react'
import {useTranslation} from 'next-i18next'
interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
}

export default function GameIframeRichy(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.board}>
          {props.session && <IframeResizer
            log
            className={styles.iframe}
            heightCalculationMethod="bodyScroll"
            src={props.session.gameUrl}
            style={{ width: '1px', minWidth: '100%'}}
          />}
          {!props.session && <div className={styles.error}>{t('game_error_unavailable')}</div>}
        </div>

    </div>
  )
}
