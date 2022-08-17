import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import {useTranslation} from 'next-i18next'
import classNames from 'classnames'
import { useAppContext } from 'context/state'
import GameIFrameHeader from 'components/for_pages/CatalogPage/GameIframeRichy/GameIFrameHeader'

interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
  error?: string
  game?: IGame
  showHeader?: boolean
}

export default function GameIframe(props: Props) {
  const {t} = useTranslation()
  const appContext = useAppContext()
  return (
    <div className={classNames(styles.root, {[styles.mobile]: appContext.isMobile})}>
      {props.showHeader && <GameIFrameHeader  title={props.game.name} icon={props.game.imageIconSmallUrl ?? props.game.imageIconPreviewUrl}/>}

      <div className={styles.board}>
        <div className={styles.iframeWrapper}>
          {props.session && <iframe
            className={styles.iframe}
            src={props.session.gameUrl}

          />}
          {!props.session && <div className={styles.error}>{props.error ?? t('game_error_unavailable')}</div>}
        </div>
      </div>

    </div>
  )
}
