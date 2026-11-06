const customEventLandings = new Set([
    '/events/circus', '/events/cyberpunk', '/events/vampire-carnival',
    '/events/cyber-christmas', '/events/hozho', '/events/masquerade',
    '/events/vice-city', '/events/vice-city-2026', '/events/techno-fashion',
    '/events/need-for-speed'
])
export const isCustomEventLanding = pathname => customEventLandings.has(pathname)
