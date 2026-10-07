import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import keys from './copyKeys.json'
export function useNfsCopy() {
    const intl = useIntl()
    return useCallback(source => {
        if (typeof source !== 'string') return source
        const value = source.trim().replace(/\s+/g, ' ')
        const id = keys[value]
        return id ? intl.formatMessage({ id }) : source
    }, [intl])
}
