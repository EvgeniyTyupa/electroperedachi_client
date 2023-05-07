export function isValidYoutubeLink(link) {
    const youtubeRegex = /^https?:\/\/(www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]{11}$/
    return youtubeRegex.test(link)
}