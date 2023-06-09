import { useEffect } from "react"
import anime from "animejs"
import { useRouter } from "next/router"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import classes from "./PeaksFooter.module.css"

const PeaksFooter = (props) => {
    const router = useRouter()

    const { width } = useWindowDimensions()

    useEffect(() => {
        // blob 1
        anime({
            targets: "#polyline #blob1",
            d: [
                {
                    value: [
                        "M0 85L175 9L349 117L524 13L698 53L873 62L1047 109L1222 43L1396 62L1571 50L1745 22L1920 119L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 119L175 4L349 102L524 12L698 107L873 64L1047 35L1222 84L1396 59L1571 26L1745 71L1920 39L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 119L175 4L349 102L524 12L698 107L873 64L1047 35L1222 84L1396 59L1571 26L1745 71L1920 39L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 2L175 110L349 36L524 12L698 94L873 117L1047 46L1222 56L1396 34L1571 112L1745 25L1920 69L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 2L175 110L349 36L524 12L698 94L873 117L1047 46L1222 56L1396 34L1571 112L1745 25L1920 69L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 2L175 52L349 40L524 11L698 31L873 115L1047 99L1222 24L1396 87L1571 55L1745 51L1920 106L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 2L175 52L349 40L524 11L698 31L873 115L1047 99L1222 24L1396 87L1571 55L1745 51L1920 106L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 85L175 9L349 117L524 13L698 53L873 62L1047 109L1222 43L1396 62L1571 50L1745 22L1920 119L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                }
            ],
            easing: "easeOutQuad",
            direction: "alternate",
            duration: 10000,
            loop: true
        })

        // blob 2
        anime({
            targets: "#polyline #blob2",
            d: [
                {
                    value: [
                        "M0 138L175 159L349 109L524 114L698 84L873 67L1047 162L1222 104L1396 90L1571 89L1745 82L1920 121L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 153L175 155L349 141L524 177L698 167L873 173L1047 73L1222 133L1396 144L1571 59L1745 151L1920 73L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 153L175 155L349 141L524 177L698 167L873 173L1047 73L1222 133L1396 144L1571 59L1745 151L1920 73L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 140L175 78L349 72L524 92L698 147L873 106L1047 135L1222 71L1396 91L1571 118L1745 73L1920 124L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 140L175 78L349 72L524 92L698 147L873 106L1047 135L1222 71L1396 91L1571 118L1745 73L1920 124L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 173L175 178L349 105L524 94L698 73L873 90L1047 176L1222 112L1396 104L1571 88L1745 171L1920 72L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 173L175 178L349 105L524 94L698 73L873 90L1047 176L1222 112L1396 104L1571 88L1745 171L1920 72L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 138L175 159L349 109L524 114L698 84L873 67L1047 162L1222 104L1396 90L1571 89L1745 82L1920 121L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                }
            ],
            easing: "easeOutQuad",
            direction: "alternate",
            duration: 10000,
            loop: true
        })

        // blob 3
        anime({
            targets: "#polyline #blob3",
            d: [
                {
                    value: [
                        "M0 188L175 127L349 126L524 195L698 198L873 123L1047 125L1222 129L1396 164L1571 235L1745 195L1920 136L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 164L175 202L349 162L524 131L698 211L873 217L1047 238L1222 196L1396 239L1571 128L1745 175L1920 178L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 164L175 202L349 162L524 131L698 211L873 217L1047 238L1222 196L1396 239L1571 128L1745 175L1920 178L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 181L175 169L349 203L524 133L698 203L873 237L1047 125L1222 139L1396 176L1571 125L1745 206L1920 174L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 181L175 169L349 203L524 133L698 203L873 237L1047 125L1222 139L1396 176L1571 125L1745 206L1920 174L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 213L175 209L349 195L524 135L698 153L873 208L1047 158L1222 202L1396 227L1571 156L1745 231L1920 178L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 213L175 209L349 195L524 135L698 153L873 208L1047 158L1222 202L1396 227L1571 156L1745 231L1920 178L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 188L175 127L349 126L524 195L698 198L873 123L1047 125L1222 129L1396 164L1571 235L1745 195L1920 136L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                }
            ],
            easing: "easeOutQuad",
            direction: "alternate",
            duration: 10000,
            loop: true
        })

        // blob 4
        anime({
            targets: "#polyline #blob4",
            d: [
                {
                    value: [
                        "M0 207L175 199L349 221L524 200L698 231L873 208L1047 299L1222 292L1396 195L1571 292L1745 250L1920 279L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 264L175 223L349 229L524 245L698 215L873 244L1047 286L1222 185L1396 284L1571 200L1745 264L1920 277L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                    ]
                },
                {
                    value: [
                        "M0 264L175 223L349 229L524 245L698 215L873 244L1047 286L1222 185L1396 284L1571 200L1745 264L1920 277L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 203L175 266L349 243L524 268L698 273L873 261L1047 261L1222 234L1396 258L1571 229L1745 221L1920 250L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 203L175 266L349 243L524 268L698 273L873 261L1047 261L1222 234L1396 258L1571 229L1745 221L1920 250L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 219L175 276L349 261L524 277L698 287L873 263L1047 243L1222 286L1396 215L1571 298L1745 226L1920 234L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                },
                {
                    value: [
                        "M0 219L175 276L349 261L524 277L698 287L873 263L1047 243L1222 286L1396 215L1571 298L1745 226L1920 234L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z",
                        "M0 207L175 199L349 221L524 200L698 231L873 208L1047 299L1222 292L1396 195L1571 292L1745 250L1920 279L1920 301L1745 301L1571 301L1396 301L1222 301L1047 301L873 301L698 301L524 301L349 301L175 301L0 301Z"
                    ]
                }
            ],
            easing: "easeOutQuad",
            direction: "alternate",
            duration: 10000,
            loop: true
        })
    }, [])

    return (
        <svg
            width={1920}
            height={width > 1024 ? 300 : ((width <= 1024 && width > 568) ? 200 : 300)}
            xmlns="http://www.w3.org/2000/svg"
            id="polyline"
            className={classes.main}
            {...props}
        >
            <path
                d="M0 85 175 9l174 108L524 13l174 40 175 9 174 47 175-66 174 19 175-12 174-28 175 97v182H0Z"
                fill={router.pathname === "/404" ? "#FF5500" : "#3920d3"}
                id="blob1"
            />
            <path
                d="m0 138 175 21 174-50 175 5 174-30 175-17 174 95 175-58 174-14 175-1 174-7 175 39v180H0Z"
                fill={router.pathname === "/404" ? "#CD4B10" : "#4330c7"}
                id="blob2"
            />
            <path
                d="m0 188 175-61 174-1 175 69 174 3 175-75 174 2 175 4 174 35 175 71 174-40 175-59v165H0Z"
                fill={router.pathname === "/404" ? "#9E4017" : "#4c3bba"}
                id="blob3"
            />
            <path
                d="m0 207 175-8 174 22 175-21 174 31 175-23 174 91 175-7 174-97 175 97 174-42 175 29v22H0Z"
                fill={router.pathname === "/404" ? "#71341A" : "#5445ad"}
                id="blob4"
            />
        </svg>
    )
}

export default PeaksFooter
