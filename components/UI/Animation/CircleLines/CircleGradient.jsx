import { useEffect } from "react"
import anime from "animejs"
import { useRef } from "react"
import { useState } from "react"
import CircleGradient1 from "./CircleGradient1"
import CircleGradient2 from "./CircleGradient2"
import CircleGradient3 from "./CircleGradient3"

const CircleGradient = (props) => {
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)

    const [dna1, setDna1] = useState()
    const [dna2, setDna2] = useState()
    const [dna3, setDna3] = useState()

    useEffect(() => {
        if (dna1) {
            dna1.forEach((el, index) => {
                anime({
                    targets: `#circle #line${index + 1}`,
                    stroke: [
                        {
                            value: [
                                dna1[index],
                                dna2[index]
                            ]
                        },
                        {
                            value: [
                                dna2[index],
                                dna3[index]
                            ]
                        },
                        {
                            value: [
                                dna3[index],
                                dna1[index]
                            ]
                        }
                    ],
                    easing: 'linear',
                    direction: "alternate",
                    duration: 20000,
                    loop: true
                })
            })
            
        }
        
    }, [dna1])

    useEffect(() => {
        if(ref1, ref1.current && ref2, ref2.current) {
            const newDna1 = []
            Array.from(ref1.current.children).forEach((el, index) => {
                if (index !== ref1.current.children.length - 1) {
                    el.setAttribute('id', `line${index + 1}`);
                    newDna1.push(el.getAttribute('stroke'))
                }
            })
            setDna1(newDna1)

            const newDna2 = []
            Array.from(ref2.current.children).forEach((el, index) => {
                if (index !== ref2.current.children.length - 1) {
                    newDna2.push(el.getAttribute('stroke'))
                }
            })
            setDna2(newDna2)

            const newDna3 = []
            Array.from(ref3.current.children).forEach((el, index) => {
                if (index !== ref3.current.children.length - 1) {
                    newDna3.push(el.getAttribute('stroke'))
                }
            })
            setDna3(newDna3)
        }
    }, [ref1, ref1.current, ref2, ref2.current, ref3, ref3.current])

    return (
        <>
            <CircleGradient1 dnaRef={ref1}/>
            <CircleGradient2 dnaRef={ref2}/>
            <CircleGradient3 dnaRef={ref3}/>
        </>
    )
}

export default CircleGradient
