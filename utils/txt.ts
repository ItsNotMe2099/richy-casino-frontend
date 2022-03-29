export const saveDownloadedData = (fileName, data) => {
  if(~navigator.userAgent.indexOf('MSIE') || ~navigator.appVersion.indexOf('Trident/')) { /* IE9-11 */
    // @ts-ignore
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
    // @ts-ignore
    (navigator as any).msSaveBlob(blob, fileName)
  } else {
    const link = document.createElement('a')
    link.setAttribute('target', '_blank')
    if(Blob !== undefined) {
      const blob = new Blob([data], { type: 'text/plain' })
      link.setAttribute('href', URL.createObjectURL(blob))
    } else {
      link.setAttribute('href', 'data:text/plain,' + encodeURIComponent(data))
    }

    ~window.navigator.userAgent.indexOf('Edge')
    && (fileName = fileName.replace(/[&\/\\#,+$~%.'':*?<>{}]/g, '_')) /* Edge */

    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
