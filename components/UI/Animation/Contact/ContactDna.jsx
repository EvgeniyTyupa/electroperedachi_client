import { useEffect } from "react"
import anime from "animejs"
import { useRef } from "react"
import { useState } from "react"
import ContactDna1 from "./ContactDna1"
import ContactDna2 from "./ContactDna2"
import ContactDna3 from "./ContactDna3"
import ContactDna4 from "./ContactDna4"

const ContactDna = (props) => {
    const ref1 = useRef(null)
    const ref2 = useRef(null)
    const ref3 = useRef(null)
    const ref4 = useRef(null)

    const [dna1, setDna1] = useState()
    const [dna2, setDna2] = useState()
    const [dna3, setDna3] = useState()
    const [dna4, setDna4] = useState()

    useEffect(() => {
        if (dna1) {
            dna1.forEach((el, index) => {
                anime({
                    targets: `#contact #line${index + 1}`,
                    d: [
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
                                dna4[index]
                            ]
                        },
                        {
                            value: [
                                dna4[index],
                                dna1[index]
                            ]
                        },
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
                el.setAttribute('id', `line${index + 1}`);
                newDna1.push(el.getAttribute('d'))
            })
            setDna1(newDna1)

            const newDna2 = []
            Array.from(ref2.current.children).forEach(el => {
                newDna2.push(el.getAttribute('d'))
            })
            setDna2(newDna2)

            const newDna3 = []
            Array.from(ref3.current.children).forEach(el => {
                newDna3.push(el.getAttribute('d'))
            })
            setDna3(newDna3)

            const newDna4 = []
            Array.from(ref4.current.children).forEach(el => {
                newDna4.push(el.getAttribute('d'))
            })
            setDna4(newDna4)
        }
    }, [ref1, ref1.current, ref2, ref2.current, ref3, ref3.current, ref4, ref4.current])

    return (
        <>
            <ContactDna1 dnaRef={ref1}/>
            <ContactDna2 dnaRef={ref2}/>
            <ContactDna3 dnaRef={ref3}/>
            <ContactDna4 dnaRef={ref4}/>
        </>
    )
}

export default ContactDna
