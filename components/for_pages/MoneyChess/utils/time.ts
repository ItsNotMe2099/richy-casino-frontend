import {differenceInSeconds} from 'date-fns'

export const getPercentFromDuration = (startedAt: string, expiredAt: string): number => {
  const totalSeconds = differenceInSeconds(new Date(expiredAt), new Date(startedAt))
  const passedSeconds = differenceInSeconds(new Date(), new Date(startedAt))
  return ((passedSeconds/totalSeconds)*100)
}
