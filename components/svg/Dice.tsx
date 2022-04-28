import React from 'react'

interface Props {
  color?: string
  className?: string
}

function Dice(props: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.9955 5.34518L13.3392 12.8607L13.3395 12.8608C13.2796 13.5473 12.6745 14.0552 11.9881 13.9952L11.9878 13.9952L4.60629 13.3479L4.60632 13.3475C3.92008 13.2874 3.41246 12.6823 3.4724 11.996L3.52079 11.438L9.55487 10.9092L9.55482 10.9086C10.6985 10.8083 11.5446 9.79991 11.4447 8.65597L11.024 3.83221L12.8613 3.99324L12.8613 3.99359C13.5475 4.05373 14.0551 4.65878 13.9952 5.34515L13.9955 5.34518ZM9.87068 1.14041L10.5198 8.65382C10.5791 9.33978 10.0716 9.94411 9.38577 10.0042L2.00564 10.651C1.31926 10.7112 0.714091 10.2035 0.653945 9.51697L0.653807 9.51547L0.00470476 2.00206C-0.0545586 1.31609 0.452934 0.711761 1.13872 0.651656L8.51885 0.00483863C9.20522 -0.0553174 9.81039 0.45242 9.87054 1.1389L9.87068 1.14041ZM2.65787 3.86693C3.11496 3.82687 3.45309 3.42319 3.4131 2.96529C3.37311 2.50739 2.97015 2.16866 2.51306 2.20872C2.05596 2.24878 1.71783 2.65246 1.75782 3.11036C1.79781 3.56826 2.20077 3.90699 2.65787 3.86693ZM5.33985 6.14814C5.79694 6.10808 6.13506 5.7044 6.09507 5.2465C6.05508 4.7886 5.65211 4.44988 5.19502 4.48994C4.73793 4.53 4.3998 4.93368 4.43979 5.39158C4.47978 5.84948 4.88275 6.18821 5.33985 6.14814ZM8.02181 8.42936C8.4789 8.3893 8.81704 7.98562 8.77705 7.52772C8.73706 7.06982 8.33409 6.73109 7.877 6.77115C7.4199 6.81121 7.08176 7.21489 7.12176 7.67279C7.16175 8.13069 7.56471 8.46942 8.02181 8.42936Z"/>
    </svg>
  )
}

export default Dice