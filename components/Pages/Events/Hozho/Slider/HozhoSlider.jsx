import React from "react"
import Slider from "react-slick"

const HozhoSlider = (props) => {
    const { children } = props

    const settings = {
        infinite: true, // Infinite looping of slides
        slidesToShow: 2.8, // Number of slides to show at a time
        slidesToScroll: 1, // Number of slides to scroll at a time
        autoplay: true, // Enable auto-swiping
        autoplaySpeed: 3000, // Time delay between auto-swipes (in milliseconds)
        dots: false, // Disable dots
        arrows: false, // Disable arrows
        responsive: [
            {
                breakpoint: 769, // For devices with width <= 768px
                settings: {
                    slidesToShow: 1.2, // Show fewer slides
                    slidesToScroll: 1, // Scroll one slide at a time
                    autoplaySpeed: 2000, // Adjust autoplay speed if necessary
                },
            },
        ],
    }

    return (    
        <Slider {...settings}>{children}</Slider>
    )
}

export default HozhoSlider
