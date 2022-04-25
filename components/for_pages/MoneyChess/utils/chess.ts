export const getObjectFromChessGameTypeStr = (val: string) => {
  const parts = val.split(':')
  return {lifetime: parseInt(parts[0], 10), increaseTime: parseInt(parts[1], 10)}
}
export const pad = (string) => {
  return ('0' + string).slice(-2)
}
export const formatSeconds = (seconds: number, showMs = false) => {
  const date = new Date(seconds * 1000)
  const hh = date.getUTCHours()
  const mm = date.getUTCMinutes()
  const ss = pad(date.getUTCSeconds())
  const mss = date.getUTCMilliseconds()

  if (hh) {
    return `${pad(hh)}:${pad(mm)}:${pad(ss)}${showMs ? `.${mss}` : ''}`
  }
  return `${pad(mm)}:${pad(ss)}${showMs ? `.${mss}` : ''}`
}
