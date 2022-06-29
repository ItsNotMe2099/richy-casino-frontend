import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import {useTranslation} from 'next-i18next'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import { RemoveScroll } from 'react-remove-scroll'

interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
}

export default function GameIframe(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  return (
    <div className={classNames(styles.root, {[styles.mobile]: appContext.isMobile})}>
      <div className={styles.board}><RemoveScroll enabled={true} >
        <div className={styles.iframeWrapper}>
          {props.session && <iframe
            className={styles.iframe}
            src={props.session.gameUrl}

          />}
          {!props.session && <div className={styles.error}>{t('game_error_unavailable')}</div>}
        </div>
        </RemoveScroll>
      </div>

    </div>
  )
}
