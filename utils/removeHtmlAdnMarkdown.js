export const removeHtmlAndMarkdown = (inputString) => {
    const withoutHtml = inputString.replace(/<[^>]+>/g, '');

    const withoutMarkdownLinksAndImages = withoutHtml.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    const withoutMarkdownFormatting = withoutMarkdownLinksAndImages.replace(/(\*|_){1,2}(.+?)(\*|_){1,2}/g, '$2');

    return withoutMarkdownFormatting;
}