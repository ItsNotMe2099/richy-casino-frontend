import React from 'react'

interface Props {
  className?: string
}

function AviatorSvg(props: Props) {
  return (
    <svg className={props.className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 15">
      <path fill="#E50539" d="M17.327 4.58l-2.23 9.041c.56 0 1.093-.202 1.598-.603.505-.4.827-.882.971-1.442l1.722-6.995h2.683l-.019.076h4.591l-2 7.79c-.003.016-.012.041-.026.083-.012.035-.02.065-.026.09l-.003.012c-.096.577.128.908.67.993l.02.003-.355 1.364h-.416c-.962 0-1.685-.208-2.171-.62-.487-.415-.672-.974-.553-1.678.01-.072.027-.143.05-.212l.011-.035 1.666-6.426h-1.792l-.98 4.001c-.318 1.321-1.054 2.472-2.21 3.453l-.041.034c-1.18.988-2.423 1.483-3.73 1.483h-2.68l2.209-9.04.285-1.371h2.756zm19.32 0l-1.968 8.118c-.004.027-.012.054-.022.08-.011.026-.02.054-.025.082-.075.478.143.73.655.758l-.336 1.374h-.936c-.927 0-1.557-.28-1.894-.841-.673.56-1.399.84-2.181.84h-.416c-.903 0-1.632-.25-2.188-.748-.558-.498-.773-1.13-.65-1.895.01-.09.03-.18.06-.266l1.109-4.592c.198-.83.708-1.524 1.532-2.078.823-.553 1.712-.831 2.668-.831h4.591zm10.872 0c.907 0 1.635.251 2.19.75.545.49.762 1.112.652 1.864l-.005.033-.043.264-1.134 4.59c-.197.807-.706 1.494-1.53 2.061-.811.556-1.692.84-2.649.85h-.447c-.918 0-1.66-.246-2.22-.737-.563-.494-.78-1.128-.655-1.907.01-.077.027-.154.049-.229l.011-.037 1.137-4.591c.197-.818.703-1.509 1.52-2.07.802-.55 1.687-.83 2.656-.84H47.519zM10.072 0c1.05 0 1.882.258 2.501.772.614.518.854 1.202.715 2.054-.005.03-.014.083-.035.166-.022.08-.03.132-.035.162L10.765 13c-.066.39.096.6.484.627l-.345 1.365H9.832c-.657 0-1.15-.162-1.472-.487-.327-.325-.44-.781-.344-1.365.011-.09.032-.178.061-.263l.867-3.457H6.5l-1.394 5.572H2.422l1.39-5.572H0c0-.975.775-1.768 1.742-1.768.652 0 1.481-.004 2.379-.005h.135L5.38 3.154c.236-.951.79-1.715 1.665-2.29S8.927 0 10.072 0zm32.27 2.082l-.604 2.353h1.155l-.34 1.338H41.42l-1.59 6.326c-.001.016-.01.04-.021.08-.014.04-.023.074-.027.101-.094.573.134.886.682.938l-.341 1.357h-.936c-.755 0-1.319-.197-1.694-.588-.372-.394-.503-.928-.392-1.606.008-.048.018-.095.031-.14.018-.068.03-.115.034-.142l1.59-6.326h-1.31l.34-1.338h1.307l.584-2.353h2.665zM55.45 4.31l-.208.866c.81-.577 1.774-.866 2.887-.866h.926l-.737 2.799h-1.505l.327-1.328c-.672.228-1.272.64-1.806 1.238-.533.595-.89 1.235-1.073 1.92l-1.435 5.593h-2.762L52.702 4.31h2.748zM33.645 5.954h-1.909c-.557 0-.922.343-1.096 1.025l-1.277 5.266c-.004.027-.013.069-.029.124l-.027.1c-.12.768.203 1.15.972 1.15.41 0 .8-.15 1.165-.45.365-.302.602-.665.709-1.087l1.492-6.128zm13.311.02c-.32 0-.61.141-.867.421-.25.272-.433.624-.546 1.055l-.01.04-1.114 4.592c-.007.038-.016.075-.027.112-.015.048-.025.085-.03.113-.06.383-.021.696.12.941.141.248.345.37.612.37.293 0 .574-.133.842-.4.262-.259.453-.625.573-1.097l.01-.04 1.114-4.59.036-.225c.067-.409.029-.726-.108-.953-.137-.226-.338-.338-.605-.338zM9.728 1.365c-.362 0-.693.132-.985.395-.291.264-.483.601-.575 1.01L6.927 7.646l-.005.03h2.44l.009-.03 1.241-4.879.031-.184c.056-.351 0-.645-.161-.873-.166-.233-.414-.347-.754-.347zM26.278 0c.388 0 .7.137.934.408.232.271.316.597.252.976-.063.38-.26.709-.582.987-.325.278-.683.417-1.074.417-.389 0-.7-.137-.931-.408-.234-.272-.319-.602-.25-.996.063-.379.257-.705.58-.976.325-.271.68-.408 1.07-.408z"/>
    </svg>

  )
}

export default AviatorSvg