export default function LegacyPassport() { return null }
export function getServerSideProps({ locale }) {
    return { redirect: { destination: locale === "en" ? "/en/account" : "/account", permanent: false } }
}
