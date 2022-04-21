interface Props {
  className: string
}

export default function StrokeSvg(props: Props) {
  return (
    <svg className={props.className} viewBox="0 0 82 175" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
      <path vectorEffect="non-scaling-stroke" d="M9.0478 4.78648C30.2753 1.55583 51.8716 1.57467 73.0934 4.84237C76.8772 5.425 79.4029 9.11694 78.6252 13.009L47.9256 166.645C46.3961 174.299 35.4492 174.29 33.9331 166.633L3.50177 12.9434C2.73086 9.05002 5.26299 5.3625 9.0478 4.78648Z" stroke="url(#paint0_linear_3423_413762)" strokeWidth="4.75555"/>
      <defs>
        <linearGradient id="paint0_linear_3423_413762" x1="24.3801" y1="14.3719" x2="110.726" y2="40.6016" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFB90"/>
          <stop offset="0.1415" stopColor="#FBEA78"/>
          <stop offset="0.2392" stopColor="#F8DC65"/>
          <stop offset="0.2703" stopColor="#E6C758"/>
          <stop offset="0.3368" stopColor="#C5A041"/>
          <stop offset="0.3979" stopColor="#AD8330"/>
          <stop offset="0.451" stopColor="#9E7226"/>
          <stop offset="0.4902" stopColor="#996C22"/>
          <stop offset="0.52" stopColor="#9D7126"/>
          <stop offset="0.5575" stopColor="#AA8131"/>
          <stop offset="0.5991" stopColor="#BE9B42"/>
          <stop offset="0.6434" stopColor="#DABE5B"/>
          <stop offset="0.6865" stopColor="#FBE878"/>
          <stop offset="0.7724" stopColor="#FFFFAA"/>
          <stop offset="0.8333" stopColor="#FBE878"/>
          <stop offset="1" stopColor="#A4631B"/>
        </linearGradient>
      </defs>
    </svg>
  )
}
