import Link from 'next/link';
import { useRouter } from 'next/router';
import { cx } from '../../../../utils/classnames';
import classes from './CustomLink.module.css'

const CustomLink = (props) => {
    const { href, text } = props

    const router = useRouter()

    return (
        <Link
            href={href}
            className={cx(classes.link, router.pathname == href ? classes.active : "")}
        >
            {text}
        </Link>
    )
}

export default CustomLink