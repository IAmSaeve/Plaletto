function extractHexColors(text: string) {
    return text.match(/#(?:[0-9a-fA-F]{3}){1,2}/g) ?? [];
}

export { extractHexColors }