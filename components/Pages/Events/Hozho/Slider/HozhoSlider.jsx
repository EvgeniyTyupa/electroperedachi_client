import React, { useRef } from "react"
import Slider from "react-slick"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"

const NextArrow = ({ onClick }) => (
    <div className="hozho-arrow hozho-next" onClick={onClick}>
        <FaChevronRight size={24} />
    </div>
)
  
  // Кастомная стрелка «назад»
const PrevArrow = ({ onClick }) => (
    <div className="hozho-arrow hozho-prev" onClick={onClick}>
        <FaChevronLeft size={24} />
    </div>
)

const HozhoSlider = (props) => {
    const { children, arrows } = props

    const sliderRef = useRef(null)

    const settings = {
        infinite: true,
        slidesToShow: 2.8,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        arrows: arrows,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 1.2,
                    slidesToScroll: 1,
                    autoplaySpeed: 2000,
                },
            },
        ],
    }

    const handleEmbedClick = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPause()
        }
    }
    
    // Clone each child to inject onClick (only for embeds)
    const slides = React.Children.map(children, (child) => {
        // you can do more sophisticated detection, e.g. child.type === YourEmbedComponent
        return (
            <div onClick={handleEmbedClick}>
                {child}
            </div>
        )
    })
    
    return (
        <Slider ref={sliderRef} {...settings}>
            {slides}
        </Slider>
    )
}

export default HozhoSlider
