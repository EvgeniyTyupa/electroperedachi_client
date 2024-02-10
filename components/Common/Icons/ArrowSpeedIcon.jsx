import * as React from "react"
const ArrowSpeedIcon = (props) => (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={48}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      d="M10.94 13.06a1.5 1.5 0 0 0 2.12 0l9.547-9.545a1.5 1.5 0 1 0-2.122-2.122L12 9.88 3.515 1.393a1.5 1.5 0 0 0-2.122 2.122l9.546 9.546ZM10.5 10v2h3v-2h-3Z"
    >
      <animate
        attributeName="opacity"
        begin="0s;2s"
        dur="1s"
        repeatCount="indefinite"
        values="0;1;0.5;0.5;0"
      />
    </path>
    <path
      fill="#fff"
      d="M10.94 30.06a1.5 1.5 0 0 0 2.12 0l9.547-9.545a1.5 1.5 0 1 0-2.122-2.122L12 26.88l-8.485-8.486a1.5 1.5 0 1 0-2.122 2.122l9.546 9.546ZM10.5 27v2h3v-2h-3Z"
    >
      <animate
        attributeName="opacity"
        begin="1s;2s"
        dur="1s"
        repeatCount="indefinite"
        values="0;0;1;0.5;0"
      />
    </path>
    <path
      fill="#fff"
      d="M10.94 47.06a1.5 1.5 0 0 0 2.12 0l9.547-9.545a1.5 1.5 0 1 0-2.122-2.122L12 43.88l-8.485-8.486a1.5 1.5 0 1 0-2.122 2.122l9.546 9.546ZM10.5 44v2h3v-2h-3Z"
    >
      <animate
        attributeName="opacity"
        begin="1.5s;2s"
        dur="1s"
        repeatCount="indefinite"
        values="0;0;0;1;0"
      />
    </path>
  </svg>
)
export default ArrowSpeedIcon
