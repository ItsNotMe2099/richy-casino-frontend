import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import {useTranslation} from 'next-i18next'

interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
}

export default function GameIframe(props: Props) {
  const {t} = useTranslation()
  return (
    <div className={styles.root}>
      <div className={styles.board}>
        <div className={styles.iframeWrapper}>
          {props.session && <iframe
            className={styles.iframe}
            src={props.session.gameUrl}

          />}
          {!props.session && <div className={styles.error}>{t('game_error_unavailable')}</div>}
        </div>
      </div>

    </div>
  )
}
