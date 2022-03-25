export const chain = async (times: number, ms: number, callback: (index: number) => void) => {
  let i = 0

  const next = async () => {
    return new Promise((resolve, reject) => {
      if (i < times) {
        setTimeout(async () =>  {
          callback(i)
          resolve(i)
          i++
          await next()

        }, ms)

      }
    })

  }

  next()
}
