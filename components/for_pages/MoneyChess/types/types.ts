export interface ChessGameConfirmModalArguments {
  title: string,
  onConfirm: () => void
  onCancel: () => void
}

export interface ChessGameErrorModalArguments {
  error: any
  onCancel: () => void
}
