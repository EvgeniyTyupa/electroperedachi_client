import { AiOutlineInstagram, AiFillYoutube } from 'react-icons/ai'
import { FaSoundcloud, FaTelegramPlane, FaFacebookF } from 'react-icons/fa'

const useSocialLinks = () => {
    const links = [
        { icon: <FaFacebookF/>, url: "https://www.facebook.com/electroperedachi" },
        { icon: <AiOutlineInstagram/>, url: "https://www.instagram.com/electroperedachi/" },
        { icon: <FaSoundcloud/>, url: "https://soundcloud.com/electroperedachi" },
        { icon: <AiFillYoutube/>, url: "https://www.youtube.com/electroperedachi" },
        { icon: <FaTelegramPlane/>, url: "https://t.me/electroperedachi_team" },
    ]

    return links
}

export default useSocialLinks