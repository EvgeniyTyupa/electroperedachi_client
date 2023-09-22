import Link from 'next/link';
import { useRouter } from 'next/router';
import { cx } from '../../../../utils/classnames';
import classes from './CustomLink.module.css'

const CustomLink = (props) => {
    const { href, text, onClick, className } = props

    const router = useRouter()

    return (
        <Link
            href={href}
            onClick={onClick}
            className={cx(classes.link, router.pathname == href ? classes.active : "", className)}
        >
            {text}
        </Link>
    )
}

export default CustomLink