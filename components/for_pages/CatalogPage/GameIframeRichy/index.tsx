import styles from './index.module.scss'
import {IGame} from 'data/interfaces/IGame'
import {IGameSession} from 'data/interfaces/IGameSession'
import {useTranslation} from 'next-i18next'
import { useAppContext } from 'context/state'
import classNames from 'classnames'
import GameIFrameHeader from './GameIFrameHeader'
interface Item extends IGame{
  link?: string
}
interface Props {
  session: IGameSession
  game: IGame
}

export default function GameIframeRichy(props: Props) {
  const appContext = useAppContext()
  const {t} = useTranslation()

  return (
    <div className={classNames(styles.root, {[styles.mobile]: appContext.isMobile})}>
     {!appContext.isMobile && <GameIFrameHeader  title={props.game.name} icon={props.game.imageIconSmallUrl ?? props.game.imageIconPreviewUrl}/>}
      <div className={styles.board}>
        <iframe
          src={props.session.gameUrl}
          className={styles.iframe}
          style={{ width: '100%', minWidth: '100%'}}
        />
          {/*props.session && (appContext.isMobile ?
            <iframe
           src={props.session.gameUrl}
           className={styles.iframe}
           style={{ width: '100%', minWidth: '100%'}}
          />: <IframeResizer
            log
            autoResize={!appContext.isMobile}
            className={styles.iframe}
            heightCalculationMethod="bodyScroll"
            src={props.session.gameUrl}
            style={{ width: '1px', minWidth: '100%'}}
          />)*/}
          {!props.session && <div className={styles.error}>{t('game_error_unavailable')}</div>}
        </div>

    </div>
  )
}
