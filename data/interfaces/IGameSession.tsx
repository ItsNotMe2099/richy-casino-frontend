export enum GameSessionStrategy{
  Iframe = 'iframe',
  Detect = 'detect',
  Redirect = 'redirect'
}
export interface IGameSession {
  gameUrl?: string
  strategy: GameSessionStrategy
}
