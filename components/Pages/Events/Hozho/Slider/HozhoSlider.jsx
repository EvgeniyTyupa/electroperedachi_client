import React from "react"
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
    const { children, length } = props

    const settings = {
        infinite: true,
        slidesToShow: length >= 3 ? 2.8 : 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
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

    return (    
        <Slider {...settings}>{children}</Slider>
    )
}

export default HozhoSlider
